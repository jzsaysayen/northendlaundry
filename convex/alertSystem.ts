import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Helper function to create an alert
async function createAlertHelper(
  ctx: any,
  args: {
    alertType: string;
    severity: "info" | "warning" | "critical";
    title: string;
    message: string;
    expiresAt?: number;
  }
) {
  const now = Date.now();

  // Check if similar alert exists (within last 24 hours)
  const existingAlerts = await ctx.db
    .query("systemAlerts")
    .filter((q: any) =>
      q.and(
        q.eq(q.field("alertType"), args.alertType),
        q.gt(q.field("createdAt"), now - 86400000)
      )
    )
    .collect();

  // Don't create duplicate alerts
  if (existingAlerts.length > 0) {
    return existingAlerts[0]._id;
  }

  return await ctx.db.insert("systemAlerts", {
    alertType: args.alertType,
    severity: args.severity,
    title: args.title,
    message: args.message,
    isRead: false,
    createdAt: now,
    expiresAt: args.expiresAt || now + 7 * 86400000, // Default: expire in 7 days
  });
}

// Generate alerts based on business metrics
export const generateAlerts = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 86400000;
    const sevenDaysAgo = now - 7 * 86400000;

    // Fetch recent orders
    const recentOrders = await ctx.db
      .query("laundryOrders")
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .collect();

    const last30Days = recentOrders.filter((o) => o.createdAt >= thirtyDaysAgo);
    const previous30Days = recentOrders.filter(
      (o) => o.createdAt >= thirtyDaysAgo * 2 && o.createdAt < thirtyDaysAgo
    );

    // Alert 1: Revenue Drop
    const currentRevenue = last30Days.reduce((sum, o) => sum + (o.pricing?.totalPrice || 0), 0);
    const previousRevenue = previous30Days.reduce((sum, o) => sum + (o.pricing?.totalPrice || 0), 0);

    if (previousRevenue > 0) {
      const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
      if (revenueChange < -20) {
        await createAlertHelper(ctx, {
          alertType: "revenue_drop",
          severity: "critical",
          title: "Revenue Drop Detected",
          message: `Revenue has decreased by ${Math.abs(Math.round(revenueChange))}% compared to the previous period.`,
        });
      }
    }

    // Alert 2: High Unpaid Orders
    const unpaidOrders = last30Days.filter((o) => o.paymentStatus === "unpaid");
    const unpaidRate = last30Days.length > 0 ? (unpaidOrders.length / last30Days.length) * 100 : 0;

    if (unpaidRate > 30) {
      await createAlertHelper(ctx, {
        alertType: "high_unpaid",
        severity: "warning",
        title: "High Unpaid Orders",
        message: `${Math.round(unpaidRate)}% of orders are unpaid. Total unpaid value: ₱${unpaidOrders.reduce((sum, o) => sum + (o.pricing?.totalPrice || 0), 0).toLocaleString()}`,
      });
    }

    // Alert 3: No New Customers
    const last7Days = recentOrders.filter((o) => o.createdAt >= sevenDaysAgo);
    const customerIds = new Set(last7Days.map((o) => o.customerId));

    if (customerIds.size === 0 && last7Days.length === 0) {
      await createAlertHelper(ctx, {
        alertType: "no_new_customers",
        severity: "warning",
        title: "No Orders This Week",
        message: "No new orders have been placed in the last 7 days.",
      });
    }

    // Alert 4: Slow Turnaround Time
    const completedLast30 = last30Days.filter((o) => o.completedAt);
    if (completedLast30.length > 0) {
      const avgTurnaround =
        completedLast30.reduce((sum, o) => {
          return sum + (o.completedAt! - o.createdAt) / 3600000;
        }, 0) / completedLast30.length;

      if (avgTurnaround > 72) {
        // More than 3 days
        await createAlertHelper(ctx, {
          alertType: "slow_turnaround",
          severity: "warning",
          title: "Slow Turnaround Time",
          message: `Average completion time is ${Math.round(avgTurnaround)} hours. Consider improving efficiency.`,
        });
      }
    }

    // Alert 5: Overdue Orders
    const overdueOrders = recentOrders.filter((o) => {
      if (!o.expectedPickupDate || o.status === "completed" || o.status === "cancelled") {
        return false;
      }
      return o.expectedPickupDate < now;
    });

    if (overdueOrders.length > 0) {
      await createAlertHelper(ctx, {
        alertType: "overdue_orders",
        severity: "critical",
        title: "Overdue Orders",
        message: `${overdueOrders.length} order(s) are past their expected pickup date.`,
      });
    }

    return { success: true, message: "Alerts generated successfully" };
  },
});

// Create a new alert (public mutation for manual creation)
export const createAlert = mutation({
  args: {
    alertType: v.string(),
    severity: v.union(v.literal("info"), v.literal("warning"), v.literal("critical")),
    title: v.string(),
    message: v.string(),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await createAlertHelper(ctx, args);
  },
});

// Mark alert as read
export const markAlertAsRead = mutation({
  args: {
    alertId: v.id("systemAlerts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.alertId, {
      isRead: true,
    });
  },
});

// Delete old alerts (cleanup)
export const cleanupExpiredAlerts = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    
    const expiredAlerts = await ctx.db
      .query("systemAlerts")
      .filter((q) =>
        q.and(
          q.neq(q.field("expiresAt"), undefined),
          q.lt(q.field("expiresAt"), now)
        )
      )
      .collect();

    for (const alert of expiredAlerts) {
      await ctx.db.delete(alert._id);
    }

    return { deleted: expiredAlerts.length };
  },
});