import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Users, UserPlus, MessageSquare, UserCircle } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Faculty Management', path: '/admin/faculty', icon: <Users size={20} /> },
    { name: 'Student Management', path: '/admin/students', icon: <UserPlus size={20} /> },
    { name: 'All Feedback', path: '/admin/feedback', icon: <MessageSquare size={20} /> },
  ];

  const facultyLinks = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Feedback', path: '/faculty/feedback', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/faculty/profile', icon: <UserCircle size={20} /> },
  ];

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Submit Feedback', path: '/student/submit-feedback', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/student/profile', icon: <UserCircle size={20} /> },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'faculty' ? facultyLinks : studentLinks;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Feedback Hub</h1>
          <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">{user?.role} Portal</p>
        </div>
        
        <nav className="flex-1 mt-8 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-3 transition-all duration-200 rounded-xl group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className={`p-2 rounded-lg transition-colors mr-3 ${
                  isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-blue-100'
                }`}>
                  {React.cloneElement(link.icon, { size: 22 })}
                </span>
                <span className="font-semibold">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl group"
          >
            <span className="p-2 group-hover:bg-red-100 rounded-lg transition-colors mr-3">
              <LogOut size={22} />
            </span>
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-800">Welcome back, {user?.name}</h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-tight">{user?.name}</p>
              <p className="text-xs font-medium text-gray-500 uppercase">{user?.role}</p>
            </div>
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200 ring-4 ring-blue-50 overflow-hidden">
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                user?.name?.charAt(0)
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
