import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, customerName, orderId, weight, pricing } = body;

    if (!to || !customerName || !orderId || !pricing) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              background-color: #1e293b; 
              color: white; 
              padding: 30px 20px; 
              text-align: center; 
              border-radius: 8px 8px 0 0; 
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content { 
              background-color: #f8f9fa; 
              padding: 30px; 
              border-radius: 0 0 8px 8px; 
            }
            .status-badge {
              display: inline-block;
              background-color: #a855f7;
              color: white;
              padding: 10px 20px;
              border-radius: 20px;
              font-weight: bold;
              margin: 20px 0;
              font-size: 16px;
            }
            .order-info {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #a855f7;
            }
            .order-info h3 {
              margin-top: 0;
              color: #1e293b;
            }
            .weight-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            .weight-table td {
              padding: 8px;
              border-bottom: 1px solid #e2e8f0;
            }
            .weight-table td:first-child {
              color: #64748b;
            }
            .weight-table td:last-child {
              text-align: right;
              font-weight: 500;
            }
            .total-section {
              background-color: #f1f5f9;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 20px;
              font-weight: bold;
              color: #1e293b;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background-color: #a855f7;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: 600;
              text-align: center;
            }
            .button:hover {
              background-color: #9333ea;
            }
            .footer {
              text-align: center;
              color: #64748b;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
            }
            .highlight {
              background-color: #fef3c7;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #f59e0b;
              margin: 20px 0;
            }
            .highlight strong {
              color: #92400e;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧺 NorthEnd Laundry</h1>
            </div>
            <div class="content">
              <h2>Great News, ${customerName}! 🎉</h2>
              <p>Your laundry is clean, fresh, and ready for pickup!</p>
              
              <div class="status-badge">
                ✅ READY FOR PICKUP
              </div>
              
              <div class="order-info">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                
                ${weight ? `
                <table class="weight-table">
                  <tbody>
                    ${weight.clothes > 0 ? `
                    <tr>
                      <td>Clothes</td>
                      <td>${weight.clothes} kg</td>
                      <td>₱${pricing.clothesPrice?.toFixed(2) || '0.00'}</td>
                    </tr>
                    ` : ''}
                    ${weight.blanketsLight > 0 ? `
                    <tr>
                      <td>Light Blankets</td>
                      <td>${weight.blanketsLight} kg</td>
                      <td>₱${pricing.blanketsLightPrice?.toFixed(2) || '0.00'}</td>
                    </tr>
                    ` : ''}
                    ${weight.blanketsThick > 0 ? `
                    <tr>
                      <td>Thick Blankets</td>
                      <td>${weight.blanketsThick} kg</td>
                      <td>₱${pricing.blanketsThickPrice?.toFixed(2) || '0.00'}</td>
                    </tr>
                    ` : ''}
                  </tbody>
                </table>
                ` : ''}
              </div>
              
              <div class="total-section">
                <div class="total-row">
                  <span>Total Amount:</span>
                  <span>₱${pricing.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div class="highlight">
                <strong>📍 Please come pick up your laundry at your earliest convenience!</strong>
                <p style="margin: 10px 0 0 0;">Our store hours are [Your Store Hours Here]</p>
              </div>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/track?id=${orderId}" class="button">
                  Track Your Order
                </a>
              </center>
              
              <div class="footer">
                <p>Thank you for choosing NorthEnd Laundry!</p>
                <p>If you have any questions, please don't hesitate to contact us.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email
    const result = await sendEmail({
      to,
      subject: `Your Laundry is Ready for Pickup! - Order ${orderId}`,
      html,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error sending ready email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}