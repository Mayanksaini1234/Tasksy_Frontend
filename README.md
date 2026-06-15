# Tasksy 

A full-stack **Task Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application enables users to securely manage their daily tasks with authentication, password recovery, and a clean user experience.

## 🔗 Live Demo

- **Frontend:** https://mern-to-do-mu.vercel.app/
- **Backend API:** https://todoapppractice.onrender.com
- **Frontend GitHub Repository:** https://github.com/Mayanksaini1234/MERN_TO_DO
- **Backend GitHub Repository:** https://github.com/Mayanksaini1234/Tasksy_Backend

---

## 📖 Overview

This project is a production-ready task management application developed following the **MVC (Model-View-Controller)** architecture. It provides secure authentication, task management features, and modern security practices to ensure a reliable user experience.

Users can:

- Create, update, and delete tasks
- Mark tasks as completed
- Manage their personal task list
- Authenticate using Email/Password or Google OAuth
- Reset forgotten passwords securely
- Access a responsive and intuitive interface

---

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based Authentication
- Google OAuth Login
- Protected Routes
- Secure User Sessions

### 📝 Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Mark Tasks as Completed
- User-Specific Task Storage

### 🔒 Security Features

- Express Validator for Input Validation
- API Rate Limiting
- Password Hashing
- Secure Reset Password Workflow
- Token-Based Password Recovery
- Protected Backend Endpoints

### ⚡ Frontend Features

- React Context API for Global State Management
- Responsive UI
- Real-Time User Feedback
- Smooth Navigation Experience

### 🚀 Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Fully integrated production deployment

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Context API
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Tokens)
- Google OAuth

### Security

- Express Validator
- bcrypt.js
- Rate Limiting

### Deployment

- Vercel
- Render

---

## 📂 Project Structure

```bash
TASKSY/

├── Client/
    ├── src/
    ├── public/
    └── ...
    └── README.md

├── Server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── ...
    └── README.md 

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mayanksaini1234/Tasksy_Backend

cd MERN_TO_DO
```

### 2️⃣ Setup Backend

```bash
cd Server

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

Start Backend:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
git clone https://github.com/Mayanksaini1234/Tasksy_Frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

| Variable | Description |
|-----------|-------------|
| PORT | Backend Port |
| MONGO_URI | MongoDB Connection String |
| JWT_SECRET | JWT Secret Key |
| CLIENT_URL | Frontend URL |
| GOOGLE_CLIENT_ID | Google OAuth Client ID |
| GOOGLE_CLIENT_SECRET | Google OAuth Secret |
| EMAIL_USER | Email Service User |
| EMAIL_PASS | Email Service Password |

---

## 📡 API Highlights

### Authentication

- Register User
- Login User
- Google OAuth Login
- Forgot Password
- Reset Password

### Tasks

- Create Task
- Get User Tasks
- Update Task
- Delete Task
- Toggle Task Status

---

## 🏗️ Architecture

The application follows the **MVC (Model-View-Controller)** architecture:

```text
Client (React)
      │
      ▼
Express Routes
      │
      ▼
Controllers
      │
      ▼
Models (MongoDB)
```

This separation ensures:

- Better code maintainability
- Scalability
- Cleaner project structure
- Easier debugging and testing

---

## 🌟 Key Learning Outcomes

- Building scalable MERN applications
- Implementing JWT Authentication
- Integrating Google OAuth
- Designing secure password reset workflows
- Applying API security best practices
- Managing global state using Context API
- Deploying full-stack applications to production

---

## 👨‍💻 Author

**Mayank Saini**

- GitHub: https://github.com/Mayanksaini1234
- LinkedIn: https://www.linkedin.com/in/mayank-saini-b91906202

---

## ⭐ Support

If you found this project helpful, consider giving it a **Star ⭐** on GitHub. It helps others discover the project and motivates further improvements. 🚀   