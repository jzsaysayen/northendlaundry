# 🧺 NorthEnd Laundry Management System

NorthEnd Laundry is a **full‑stack web application** designed to help laundry shops manage daily operations efficiently. It provides role‑based access for **Admins** and **Staff**, real‑time order tracking for customers, and a secure backend powered by Convex.

This project is built as a **capstone‑ready system**, focusing on clean architecture, modern tooling, and practical real‑world workflows.

---

## ✨ Features

### 👤 Authentication & Roles

* Secure authentication
* Role‑based access control (Admin / Staff)
* Restricted admin‑only operations

### 🧾 Laundry Order Management

* Create and manage laundry orders
* Track order status (Pending, In-Progress, Finished, Paid)
* Generate unique tracking IDs for customers

### 📊 Admin Dashboard & Analytics

* Visual analytics dashboard for owners and administrators
* Charts showing laundry volume, order statuses, and operational flow
* Data-driven insights to monitor daily and overall performance

---

## 🛠 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Recharts** (Data visualization & analytics)
* **lucide-react** (Icons)

### Backend

* **Convex** (Database + Server Functions)
* **Convex Auth** (Authentication & session management)
* **Type-safe queries and mutations**
* **Nodemailer** (Email notifications via Gmail SMTP)

### Email Service

* Gmail SMTP via Nodemailer
* Used for order notifications and status updates

### Deployment

* **Vercel** (Frontend)
* **Convex Cloud** (Backend)

---

## 📁 Project Structure

```
northendlaundry/
├── app/                # Next.js routes & pages
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities & helpers
├── convex/             # Convex backend (DB schema, queries, mutations)
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

### 3️⃣ Set up environment variables

Create a `.env.local` file based on `.env.example`:

````env
NEXT_PUBLIC_APP_URL=http://localhost:3000
CONVEX_DEPLOYMENT=your-convex-deployment-id

# Convex Auth
CONVEX_SITE_URL=http://localhost:3000

# Nodemailer (Gmail)
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your-app-password
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
CONVEX_DEPLOYMENT=your-convex-deployment-id
````

> ⚠️ Do not commit `.env.local` to version control.

### 4️⃣ Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🌐 Deployment Notes

### Vercel

* Set `NEXT_PUBLIC_APP_URL` in **Vercel → Project Settings → Environment Variables**
* Example:

  ```
  NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
  ```
* Redeploy after adding environment variables

### Convex

* Ensure your Convex deployment is active
* Run Convex locally if needed:

```bash
npx convex dev
```

---

## 🔐 Security Notes

* Authentication handled via **Convex Auth**
* Role-based access checks enforced server-side
* No plaintext passwords exposed in the UI
* Gmail credentials use **App Passwords**, not personal passwords
* Environment variables are required for production safety

---

## 📈 Future Improvements

* Advanced pagination and filtering
* Activity logs for admin actions
* Email & SMS notifications
* Analytics dashboard
* Better mobile optimization

---

## 🎓 Academic / Portfolio Use

This project is suitable for:

* Capstone projects
* Portfolio demonstrations
* Full‑stack system design showcases

It demonstrates:

* Modern Next.js architecture
* Backend‑as‑a‑Service usage (Convex)
* Role‑based system design
* Clean separation of concerns

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 👤 Author

**CAPSTONE PROJECT**

GitHub: [https://github.com/jzsaysayen](https://github.com/jzsaysayen)
