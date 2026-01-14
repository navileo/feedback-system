import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyManagement from './pages/admin/FacultyManagement';
import StudentManagement from './pages/admin/StudentManagement';
import AllFeedback from './pages/admin/AllFeedback';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyProfile from './pages/faculty/Profile';

// Student Pages
import SubmitFeedback from './pages/student/SubmitFeedback';
import StudentProfile from './pages/student/Profile';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/faculty" element={<PrivateRoute role="admin"><FacultyManagement /></PrivateRoute>} />
          <Route path="/admin/students" element={<PrivateRoute role="admin"><StudentManagement /></PrivateRoute>} />
          <Route path="/admin/feedback" element={<PrivateRoute role="admin"><AllFeedback /></PrivateRoute>} />
          
          {/* Faculty Routes */}
          <Route path="/faculty/dashboard" element={<PrivateRoute role="faculty"><FacultyDashboard /></PrivateRoute>} />
          <Route path="/faculty/feedback" element={<PrivateRoute role="faculty"><FacultyDashboard /></PrivateRoute>} />
          <Route path="/faculty/profile" element={<PrivateRoute role="faculty"><FacultyProfile /></PrivateRoute>} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<PrivateRoute role="student"><SubmitFeedback /></PrivateRoute>} />
          <Route path="/student/submit-feedback" element={<PrivateRoute role="student"><SubmitFeedback /></PrivateRoute>} />
          <Route path="/student/profile" element={<PrivateRoute role="student"><StudentProfile /></PrivateRoute>} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
