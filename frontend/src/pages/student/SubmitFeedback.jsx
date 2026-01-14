import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Star, Send } from 'lucide-react';

const SubmitFeedback = () => {
  const [faculty, setFaculty] = useState([]);
  const [formData, setFormData] = useState({
    facultyId: '',
    rating: 5,
    comments: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data } = await API.get('/feedback/faculty');
        setFaculty(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaculty();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/feedback', formData);
      setSuccess(true);
      setFormData({ facultyId: '', rating: 5, comments: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Share Your Experience</h1>
        <p className="text-gray-500 max-w-lg mx-auto font-medium">Your feedback helps us maintain high standards of teaching and student satisfaction.</p>
      </div>
      
      {success && (
        <div className="bg-green-600 text-white p-6 rounded-[2rem] shadow-xl shadow-green-100 flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="text-white fill-current" size={20} />
            </div>
            <p className="font-black">Feedback submitted successfully! Thank you for your contribution.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-gray-100">
        <div className="lg:flex">
          {/* Left Panel - Info */}
          <div className="lg:w-1/3 bg-blue-600 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-4">Guidelines</h3>
              <ul className="space-y-4 text-blue-100 text-sm font-medium">
                <li className="flex items-start italic opacity-80">
                  <span className="mr-2">•</span>
                  Be constructive and honest in your comments.
                </li>
                <li className="flex items-start italic opacity-80">
                  <span className="mr-2">•</span>
                  Focus on teaching methodology and course content.
                </li>
                <li className="flex items-start italic opacity-80">
                  <span className="mr-2">•</span>
                  Your identity is kept confidential from faculty.
                </li>
              </ul>
            </div>
            <div className="mt-10 p-6 bg-white/10 rounded-3xl border border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Did you know?</p>
              <p className="text-sm font-medium">95% of faculty members use this feedback to improve their next semester's curriculum.</p>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:w-2/3 p-10 lg:p-14">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Select Faculty Member</label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 shadow-sm appearance-none"
                    value={formData.facultyId}
                    onChange={(e) => setFormData({...formData, facultyId: e.target.value})}
                  >
                    <option value="">Choose from the list...</option>
                    {faculty.map((f) => (
                      <option key={f._id} value={f._id}>{f.name} — {f.department}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Star size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Overall Rating</label>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, rating: num})}
                      className={`flex-1 min-w-[60px] flex flex-col items-center py-4 rounded-2xl border-2 transition-all duration-200 ${
                        formData.rating === num 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                        : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200'
                      }`}
                    >
                      <Star className={formData.rating >= num ? "fill-current" : ""} size={24} />
                      <span className="text-xs font-black mt-2 uppercase tracking-tighter">Level {num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Detailed Comments</label>
                <textarea
                  required
                  rows="5"
                  className="w-full px-6 py-5 bg-white border border-gray-200 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 shadow-sm resize-none"
                  placeholder="Tell us about your learning experience, what went well, and what could be improved..."
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center group"
              >
                <span>Post Feedback</span>
                <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;
