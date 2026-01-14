import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect based on role
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.role === 'admin') navigate('/admin/dashboard');
      else if (userInfo.role === 'faculty') navigate('/faculty/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-vh-100 flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 flex overflow-hidden border border-gray-100 min-h-[600px]">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-16 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="h-12 w-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-8">
              <MessageSquare className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">
              Empowering <br /> Academic Excellence <br /> Through Feedback.
            </h1>
            <p className="text-blue-100 mt-6 text-lg leading-relaxed opacity-80">
              Join thousands of students and faculty in shaping the future of education through transparent communication.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-blue-600 bg-blue-400 flex items-center justify-center text-white text-xs font-bold">
                  U{i}
                </div>
              ))}
              <div className="h-10 w-10 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center text-blue-600 text-xs font-bold">
                +2k
              </div>
            </div>
            <p className="text-blue-100 text-sm font-medium">Trusted by institutions worldwide.</p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-700 rounded-full opacity-30"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900">Sign In</h2>
            <p className="text-gray-500 mt-2 font-medium">Enter your credentials to access your portal.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 shadow-sm"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98]"
            >
              Log In
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-black hover:underline">
                Register as Student
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
