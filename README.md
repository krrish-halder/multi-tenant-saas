# Multi-Tenant SaaS Backend (Node.js + MongoDB)

A production-grade multi-tenant SaaS backend built using Node.js, Express, and MongoDB.
This project is designed to simulate real-world SaaS architecture with strong focus on
authentication, authorization, tenant isolation, and scalable backend design.

---

## 🚀 Features

- User authentication (JWT-based)
- Email verification using Mailtrap
- Soft deletes for users
- Multi-tenant architecture (Organization-based)
- Tenant switching for users
- Role & permission based access control (RBAC)
- Custom roles per tenant
- Subscription-based feature limits (mocked)
- Projects and tasks scoped per tenant
- Clean and consistent API response structure
- Laravel-inspired folder structure
- Secure and scalable backend design

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)
- Joi (request validation)
- Nodemailer (Mailtrap for emails)
- dotenv (environment variables)

---

## 📁 Project Structure

```
src/
├── app.js
├── server.js
├── config/
│   ├── database.js
│   └── mail.js
├── models/
├── controllers/
├── routes/
├── middlewares/
├── services/
├── validators/
├── utils/
```
---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

APP_NAME=MultiTenantSaaS
APP_PORT=3000
APP_ENV=local

MONGO_URI=mongodb://127.0.0.1:27017/multi_tenant_saas

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_user
MAIL_PASS=your_mailtrap_password

FRONTEND_URL=http://localhost:3000

---

## ▶️ Running the Project

1. Install dependencies
   npm install

2. Start development server
   npm run dev

3. Server will run at
   localhost

---

## 🔐 Authentication Flow

1. User registers
2. Verification email is sent
3. User verifies email
4. User logs in and receives JWT
5. JWT is used for authenticated APIs

---

## 🎯 Purpose of This Project

This project is built for learning and demonstrating:
- Real-world SaaS backend architecture
- Multi-tenant system design
- Secure authentication & authorization
s- Clean, maintainable Node.js codebase

---

## 📌 Future Enhancements

- Tenant management APIs
- Role & permission management
- Subscription enforcement
- Audit logs
- Rate limiting per tenant
- Redis caching
- Background jobs

---

## 🧠 Author
**[Krrish Halder](https://krrishhalder.netlify.app)**


Built as a learning-focused backend project to master Node.js, MongoDB,
and SaaS system design.
