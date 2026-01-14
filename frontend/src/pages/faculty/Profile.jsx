import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, BookOpen, Lock, Save, CheckCircle, Camera, Loader2 } from 'lucide-react';

const Profile = () => {
  const { updateUserInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    facultyId: '',
    department: '',
    contact: '',
    profilePicture: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/faculty/profile');
        setFormData({
          ...formData,
          name: data.name,
          email: data.email,
          facultyId: data.facultyId || '',
          department: data.department || '',
          contact: data.contact || '',
          profilePicture: data.profilePicture || ''
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      setUploading(true);
      const { data } = await API.post('/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData({ ...formData, profilePicture: data.url });
      setUploading(false);
    } catch (err) {
      setError('Failed to upload image');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
        delete updateData.confirmPassword;
      }
      const { data } = await API.put('/faculty/profile', updateData);
      
      // Update local storage and context
      updateUserInfo({
        name: data.name,
        email: data.email,
        profilePicture: data.profilePicture
      });

      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Faculty Profile</h1>
        <p className="text-gray-500 mt-2 font-medium">Update your personal and professional details.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-gray-100">
        <div className="lg:flex">
          {/* Left Panel - Visual */}
          <div className="lg:w-1/3 bg-blue-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative group cursor-pointer">
                <div className="h-32 w-32 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center mb-6 shadow-xl overflow-hidden border-2 border-white/30 transition-all group-hover:border-white">
                  {formData.profilePicture ? (
                    <img 
                      src={`http://localhost:5000${formData.profilePicture}`} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={64} className="text-white" />
                  )}
                  
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="text-white animate-spin" size={32} />
                    </div>
                  )}
                </div>
                
                <label className="absolute bottom-2 right-2 p-2 bg-white text-blue-600 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform active:scale-95">
                  <Camera size={18} />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-black mb-2 tracking-tight">{formData.name}</h3>
                <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] opacity-80">{formData.facultyId}</p>
              </div>
            </div>
            
            <div className="relative z-10 mt-10 p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-3 opacity-60">Authentication Role</p>
              <div className="flex items-center text-xs font-black text-white uppercase tracking-widest">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-3 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                Faculty Member
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-700 rounded-full opacity-30"></div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:w-2/3 p-10 lg:p-14">
            {success && (
              <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl animate-fade-in">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <p className="text-green-800 font-bold">Profile updated successfully!</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <p className="text-red-800 font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 shadow-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 shadow-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Department</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-bold text-gray-500 shadow-sm"
                      value={formData.department}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 shadow-sm"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-lg font-black text-gray-900 mb-6">Security Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 shadow-sm"
                        placeholder="Leave blank to keep current"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 shadow-sm"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center group"
              >
                <Save size={22} className="mr-3" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
