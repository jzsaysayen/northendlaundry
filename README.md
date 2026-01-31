# 🧺 NorthEnd Laundry Management System

NorthEnd Laundry is a **full-stack laundry management system** designed to support real-world laundry shop operations. It provides role-based access for admins and staff, customer order tracking, analytics dashboards, and an automated alerting system to help owners monitor business performance.

This project is **capstone-ready** and demonstrates practical system design, backend logic, and data-driven decision support.

---

## ✨ Features

### 👤 Authentication & Roles

* Secure authentication using **Convex Auth**
* Role-based access control (Admin / Staff)
* Server-side authorization for protected actions

### 🧾 Laundry Management

* Create, update, and manage **laundry jobs**
* Laundry lifecycle tracking (Pending, In Progress, Completed, Paid)
* Pricing, payment status, and pickup scheduling per laundry job
* Unique tracking IDs assigned to each laundry job

### 📦 Customer Laundry Tracking

* Public laundry tracking page using a Tracking ID
* Real-time laundry status updates
* No customer login required

### 📊 Admin & Staff Dashboard

* Centralized dashboard for daily laundry operations
* View and manage all active and completed laundry jobs
* Staff-controlled laundry status updates
* Operational visibility for admins and shop owners

### 📈 Analytics & Reporting

* Visual analytics for laundry operations and performance
* Laundry volume, revenue, and turnaround time insights
* Data-driven reporting to support business decisions
* Charts and visualizations powered by **Recharts**

### 🚨 System Alerts & Notifications

* Automated system alerts based on operational and financial metrics
* Revenue drop detection and performance monitoring
* High unpaid laundry rate alerts
* Overdue laundry job detection
* Slow turnaround time alerts
* No-activity or low-volume warnings
* Severity-based alerts (info, warning, critical)
* Automatic alert resolution when conditions normalize
* Alert expiration and cleanup to prevent stale alerts
* Email notifications delivered via **Nodemailer (Gmail SMTP)**

---

## 🛠 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Recharts** (Analytics & data visualization)
* **lucide-react** (Icons)

### Backend

* **Convex** (Database, queries, and mutations)
* **Convex Auth** (Authentication & session handling)
* Type-safe backend functions
* Automated background tasks via internal mutations

### Email Service

* Nodemailer with Gmail SMTP
* Used for customer and system notifications

### Deployment

* **Vercel** (Frontend hosting)
* **Convex Cloud** (Backend services)

---

## 📁 Project Structure

```
northendlaundry/
├── app/                # Next.js routes and pages
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── convex/             # Convex backend (schema, queries, mutations)
├── public/             # Static assets
├── .env.example        # Environment variable template
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/jzsaysayen/northendlaundry.git
cd northendlaundry
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
CONVEX_DEPLOYMENT=your-convex-deployment-id

# Convex Auth
CONVEX_SITE_URL=http://localhost:3000

# Nodemailer (Gmail SMTP)
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your-app-password
```

> ⚠️ Never commit `.env.local` to version control.

### 4️⃣ Run the development server

```bash
npm run dev
```

Access the app at:

```
http://localhost:3000
```

---

## 🌐 Deployment Notes

### Vercel

* Set `NEXT_PUBLIC_APP_URL` in Vercel environment variables
* Example:

```
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

* Redeploy after updating variables

### Convex

* Ensure your Convex deployment is active
* Run Convex locally if needed:

```bash
npx convex dev
```

---

## 🔐 Security Considerations

* Authentication handled by **Convex Auth**
* Role checks enforced on the backend
* No plaintext passwords stored or exposed
* Gmail App Passwords used for email delivery
* Environment-based configuration for production safety

---

## 📈 Future Improvements

* SMS or push notifications
* Advanced filtering and pagination
* Admin activity logs
* Configurable alert thresholds
* Improved mobile responsiveness

---

## 🎓 Academic & Portfolio Use

This project demonstrates:

* Modern Next.js application architecture
* Backend-as-a-Service integration (Convex)
* Role-based access control
* Business analytics and alerting logic
* Real-world operational workflows

Suitable for:

* Capstone projects
* Portfolio demonstrations
* Full-stack system design showcases

---

## 👤 Author

**CAPSTONE PROJECT**
GitHub: [https://github.com/jzsaysayen](https://github.com/jzsaysayen)

---

## 📄 License

For educational and demonstration purposes only.
