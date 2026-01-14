import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Contact, Mail, BookOpen, Lock } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(formData);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-vh-100 flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-green-100/50 flex overflow-hidden border border-gray-100 min-h-[700px]">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 bg-green-600 p-16 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="h-12 w-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-8">
              <UserPlus className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">
              Join the <br /> Community of <br /> Excellence.
            </h1>
            <p className="text-green-100 mt-6 text-lg leading-relaxed opacity-80">
              Create your student account today and start making an impact with your feedback.
            </p>
          </div>
          
          <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
            <p className="text-white text-sm font-bold italic">
              "My feedback actually helped improve our laboratory equipment. It feels great to be heard!"
            </p>
            <p className="text-green-200 text-xs font-bold mt-4 uppercase tracking-widest">— Alex Johnson, CS Student</p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-green-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-48 h-48 bg-green-700 rounded-full opacity-30"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">Student Registration</h2>
            <p className="text-gray-500 mt-2 font-medium">Create your profile to get started.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Student ID</label>
                <div className="relative">
                  <Contact className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm"
                    placeholder="STU12345"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm"
                  placeholder="john@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Department</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm appearance-none"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Contact Number</label>
                <div className="relative">
                  <Contact className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm"
                    placeholder="+1 (555) 000-0000"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-wide ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm text-gray-900 shadow-sm"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-[0.98] mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 font-black hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
