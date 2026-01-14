# 🌟 Online Feedback Management System

A visionary, responsive, and robust platform designed to bridge the gap between students and faculty through transparent and constructive feedback. Built with a modern tech stack to ensure scalability, security, and a seamless user experience.

---

## 🎯 Project Vision
To create a digital ecosystem where academic feedback is streamlined, analyzed, and utilized for continuous improvement. Our system empowers Administrators with full control, Faculty with actionable insights, and Students with a voice.

---

## 🛠️ Technologies & Tools

### **Frontend (The User Experience)**
- **React.js (v18+)**: For building a dynamic and responsive UI.
- **Tailwind CSS**: For modern, utility-first styling and mobile-first design.
- **Lucide React**: For beautiful, consistent iconography.
- **React Router Dom**: For seamless, role-based client-side navigation.
- **Axios**: For efficient API communication.

### **Backend (The Engine)**
- **Node.js**: The runtime environment.
- **Express.js**: For building a robust RESTful API.
- **JWT (JSON Web Tokens)**: For secure, stateless authentication.
- **Bcrypt.js**: For industry-standard password hashing.
- **Multer**: For secure and efficient image/file uploads.
- **Dotenv**: For secure environment variable management.

### **Database (The Memory)**
- **MongoDB**: A NoSQL database for flexible and scalable data storage.
- **Mongoose**: For elegant object modeling and schema validation.

---

## 👥 Role-Based Features

### **👑 Administrator**
- **Secure Authentication**: Dedicated admin login.
- **Faculty Management**: Full CRUD for faculty members with profile picture visibility.
- **Student Management**: Full CRUD for student records with profile picture visibility.
- **Feedback Oversight**: Monitor all feedback submitted across the system.
- **Data Analytics**: Real-time statistics on total users, average ratings, and recent feedback.

### **👨‍🏫 Faculty**
- **Personal Dashboard**: View real-time analytics, average ratings, and student testimonials.
- **Feedback Feed**: Read specific comments and ratings from students.
- **Profile Management**: Update personal details, contact info, and upload/update profile pictures.

### **🎓 Student**
- **Secure Registration**: Sign-up with password confirmation and contact details.
- **Feedback Submission**: Intuitive forms with star ratings and detailed comments.
- **Complete Profile**: Access personal info and manage profile pictures.

---

## 🆕 What's New? (Latest Updates)

### **📸 Profile Picture System**
- **Upload & Edit**: Users can now upload, update, and remove their profile pictures.
- **Visual Identity**: Profile pictures are displayed on dashboards, sidebars, and admin management tables.
- **Backend Integration**: Powered by Multer for secure file storage and management.

### **🎨 Enhanced UI & Accessibility**
- **High-Readability Inputs**: Global update to all text boxes and text areas ensuring a clean white background with dark text for maximum readability.
- **Responsive Focus**: Improved focus states with brand-consistent colors (Blue/Green).
- **Clean Dashboards**: Removed unnecessary "Download Report" options for a more focused user experience.

### **🔐 Robust Registration & Profiles**
- **Advanced Validation**: Added password confirmation and contact number fields to the student registration flow.
- **Profile Persistence**: Updates to profiles now reflect instantly across the application without requiring a re-login.

---

## 🚀 Step-by-Step Installation Guide

### **Step 1: Clone the Repository**
```bash
git clone <repository-url>
cd feedback
```

### **Step 2: Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (Create a `.env` file):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/feedback_system
   JWT_SECRET=your_super_secret_key
   ```
4. Seed the Admin account:
   ```bash
   node seed.js
   ```

### **Step 3: Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
feedback/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Business logic for each role
│   ├── middleware/     # Auth and Role-based access control
│   ├── models/         # Mongoose schemas (User, Feedback)
│   ├── routes/         # API endpoints (auth, admin, feedback, uploads)
│   ├── utils/          # Helper utilities (Multer config)
│   ├── uploads/        # Static folder for profile pictures
│   ├── .env            # Secret configurations
│   ├── index.js        # Entry point
│   └── seed.js         # Admin initialization script
├── frontend/
│   ├── src/
│   │   ├── api/        # Axios interceptors
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global Auth State
│   │   ├── layouts/    # Dashboard sidebars and headers
│   │   ├── pages/      # Role-specific screens
│   │   └── App.jsx     # Routing logic
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 🔑 Default Credentials (Admin)
- **Email**: `admin@feedback.com`
- **Password**: `adminpassword123`

---

## 🛡️ Security Implementation
- **Password Hashing**: All passwords are encrypted using salt rounds before storage.
- **Route Protection**: Middleware ensures only authorized roles can access specific APIs.
- **Token Verification**: Every request to protected routes requires a valid JWT.

---

## 📱 Responsiveness
The system is designed with a **Mobile-First Approach**. Whether you are an admin on a desktop or a student on a smartphone, the experience remains consistent and user-friendly.

---

*Built with ❤️ for a better academic experience.*
