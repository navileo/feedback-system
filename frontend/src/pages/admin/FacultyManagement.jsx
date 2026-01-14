import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    facultyId: '',
    department: '',
    contact: ''
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const { data } = await API.get('/admin/faculty');
      setFaculty(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentFaculty) {
        await API.put(`/admin/faculty/${currentFaculty._id}`, formData);
      } else {
        await API.post('/admin/faculty', formData);
      }
      setShowModal(false);
      setCurrentFaculty(null);
      setFormData({ name: '', email: '', password: '', facultyId: '', department: '', contact: '' });
      fetchFaculty();
    } catch (err) {
      console.error('Error saving faculty:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error saving faculty';
      alert(errorMessage);
    }
  };

  const handleEdit = (f) => {
    setCurrentFaculty(f);
    setFormData({
      name: f.name,
      email: f.email,
      facultyId: f.facultyId,
      department: f.department,
      contact: f.contact,
      password: ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty?')) {
      try {
        await API.delete(`/admin/faculty/${id}`);
        fetchFaculty();
      } catch (err) {
        alert('Error deleting faculty');
      }
    }
  };

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.facultyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Faculty Management</h3>
        <button
          onClick={() => { setCurrentFaculty(null); setFormData({ name: '', email: '', password: '', facultyId: '', department: '', contact: '' }); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Faculty</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-8 py-5">Faculty ID</th>
                <th className="px-8 py-5">Faculty</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Department</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFaculty.map((f) => (
                <tr key={f._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-bold">
                      {f.facultyId}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        {f.profilePicture ? (
                          <img 
                            className="h-10 w-10 rounded-full object-cover border border-gray-100" 
                            src={f.profilePicture} 
                            alt="" 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {f.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-gray-900">{f.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-600 font-medium">{f.email}</td>
                  <td className="px-8 py-5">
                    <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {f.department}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(f)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(f._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h4 className="text-xl font-bold mb-6">{currentFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Faculty ID</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.facultyId}
                    onChange={(e) => setFormData({...formData, facultyId: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {!currentFaculty && (
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;
