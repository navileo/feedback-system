import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Star, Filter, Calendar } from 'lucide-react';

const AllFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data } = await API.get('/admin/feedback');
      setFeedback(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFeedback = filterRating === 'all' 
    ? feedback 
    : feedback.filter(f => f.rating === parseInt(filterRating));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">All Student Feedback</h3>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-500" />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeedback.map((f) => (
          <div key={f._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{f.faculty?.name}</h4>
                <p className="text-sm text-gray-500">{f.faculty?.department}</p>
              </div>
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                <Star className="text-yellow-500 fill-current" size={16} />
                <span className="ml-1 font-bold text-yellow-700">{f.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 italic">"{f.comments}"</p>
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="flex items-center text-xs text-gray-400">
                <Calendar size={14} className="mr-1" />
                {new Date(f.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                By: {f.student?.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFeedback;
