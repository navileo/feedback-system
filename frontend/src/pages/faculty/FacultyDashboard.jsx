import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Star, MessageSquare } from 'lucide-react';

const FacultyDashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data } = await API.get('/faculty/feedback');
        setFeedback(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedback();
  }, []);

  const averageRating = feedback.length > 0 
    ? (feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Faculty Analytics</h1>
          <p className="text-gray-500 mt-2 font-medium">Analyze your performance and read student feedback.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-gray-700">Real-time Insights</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Total Feedback</p>
              <p className="text-5xl font-black text-gray-900">{feedback.length}</p>
              <p className="text-sm font-bold text-gray-400 mt-4 italic">Updated just now</p>
            </div>
            <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <MessageSquare size={36} />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 bg-blue-50 h-32 w-32 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-2">Average Rating</p>
              <p className="text-5xl font-black text-gray-900">{averageRating}<span className="text-2xl text-gray-300">/5.0</span></p>
              <div className="flex mt-4 space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-200"} />
                ))}
              </div>
            </div>
            <div className="h-20 w-20 bg-yellow-50 text-yellow-500 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Star size={36} />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 bg-yellow-50 h-32 w-32 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-2xl font-black text-gray-900">Student Testimonials</h3>
        </div>
        <div className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {feedback.length > 0 ? (
              feedback.map((f) => (
                <div key={f._id} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < f.rating ? "text-yellow-400 fill-current" : "text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-gray-100">
                      {new Date(f.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed italic text-lg">"{f.comments}"</p>
                  <div className="mt-6 h-1 w-12 bg-blue-100 group-hover:w-24 transition-all duration-500 rounded-full"></div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">No feedback entries found yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
