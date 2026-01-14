import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Users, MessageSquare, Star } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    facultyCount: 0,
    studentCount: 0,
    feedbackCount: 0,
    avgRating: 0
  });
  const [recentFeedback, setRecentFeedback] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [faculty, students, feedback] = await Promise.all([
          API.get('/admin/faculty'),
          API.get('/admin/students'),
          API.get('/admin/feedback')
        ]);
        
        const feedbackData = feedback.data;
        const totalRating = feedbackData.reduce((acc, curr) => acc + curr.rating, 0);
        const avg = feedbackData.length > 0 ? totalRating / feedbackData.length : 0;

        setStats({
          facultyCount: faculty.data.length,
          studentCount: students.data.length,
          feedbackCount: feedbackData.length,
          avgRating: avg
        });
        setRecentFeedback(feedbackData.slice(0, 5));
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Monitor your system performance and feedback activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={28} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Faculty</h3>
          <p className="text-4xl font-black text-gray-900 mt-2">{stats.facultyCount}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <Users size={28} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+5%</span>
          </div>
          <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Students</h3>
          <p className="text-4xl font-black text-gray-900 mt-2">{stats.studentCount}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <MessageSquare size={28} />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">New</span>
          </div>
          <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Total Feedback</h3>
          <p className="text-4xl font-black text-gray-900 mt-2">{stats.feedbackCount}</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
              <Star size={28} />
            </div>
            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">High</span>
          </div>
          <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Avg Rating</h3>
          <p className="text-4xl font-black text-gray-900 mt-2">
            {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '0.0'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Recent Feedback</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentFeedback.length > 0 ? (
              recentFeedback.map((f) => (
                <div key={f._id} className="flex items-start p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                  <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 font-bold text-lg mr-5 shrink-0 border border-gray-100">
                    {f.facultyId?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{f.facultyId?.name}</h4>
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{f.facultyId?.department}</p>
                      </div>
                      <div className="flex items-center bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-50">
                        <Star className="text-yellow-400 mr-1 fill-current" size={14} />
                        <span className="font-bold text-gray-900">{f.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed italic">"{f.comment}"</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-widest">
                      {new Date(f.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">No feedback received yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-8">System Status</h3>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-700 font-bold">API Server</span>
              </div>
              <span className="text-xs font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-700 font-bold">Database</span>
              </div>
              <span className="text-xs font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-700 font-bold">Auth Service</span>
              </div>
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Running</span>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-600 rounded-2xl text-white relative overflow-hidden shadow-lg shadow-blue-200">
            <div className="relative z-10">
              <h4 className="font-bold text-lg">System Update</h4>
              <p className="text-blue-100 text-xs mt-2 leading-relaxed opacity-90">Your system is running the latest version of Feedback Hub Pro. Enjoy the new features!</p>
              <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide hover:bg-blue-50 transition-colors">Learn More</button>
            </div>
            <div className="absolute -right-8 -bottom-8 bg-blue-500/20 h-32 w-32 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
