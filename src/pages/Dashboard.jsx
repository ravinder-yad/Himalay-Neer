import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FiUser, FiPackage, FiLogOut, FiShoppingBag, FiMenu, FiHome, FiGrid, FiTrendingUp, FiCreditCard, FiCamera, FiLock, FiCheck } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { logout, reset, updateProfile, updatePassword } from '../store/authSlice';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTabState] = useState(localStorage.getItem('activeDashboardTab') || 'dashboard');

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    localStorage.setItem('activeDashboardTab', tab);
  };

  // Profile Form States
  const [profileFile, setProfileFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  // Password Form States
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [passwordStatus, setPasswordStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchMyOrders = async () => {
        try {
          const res = await api.get('/orders/myorders');
          if (res.data.success) {
            setOrders(res.data.data);
          }
          setLoadingOrders(false);
        } catch (error) {
          console.error(error);
          setLoadingOrders(false);
        }
      };
      fetchMyOrders();
    }
  }, [user, navigate]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileFile) return;
    
    setUploadingProfile(true);
    const formData = new FormData();
    formData.append('profileImage', profileFile);
    
    await dispatch(updateProfile(formData));
    setUploadingProfile(false);
    setProfileFile(null);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ loading: true, success: false, error: '' });
    
    try {
      await dispatch(updatePassword(passwords)).unwrap();
      setPasswordStatus({ loading: false, success: true, error: '' });
      setPasswords({ currentPassword: '', newPassword: '' });
      setTimeout(() => setPasswordStatus(prev => ({ ...prev, success: false })), 3000);
    } catch (err) {
      setPasswordStatus({ loading: false, success: false, error: err || 'Failed to update password' });
    }
  };

  const totalSpent = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalOrdersCount = orders.length;

  const monthlyData = [
    { name: 'Jan', amount: 0 }, { name: 'Feb', amount: 0 }, { name: 'Mar', amount: 0 },
    { name: 'Apr', amount: 0 }, { name: 'May', amount: 0 }, { name: 'Jun', amount: 0 },
  ]; 

  if (!user) return null;

  const profileImageUrl = user.profileImage ? `http://localhost:5000${user.profileImage}` : null;

  return (
    <div className="flex h-screen bg-[#f4f7fe] font-sans overflow-hidden">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 w-72 bg-white shadow-[10px_0_40px_rgba(0,0,0,0.04)] flex flex-col transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-24 flex items-center justify-center border-b border-slate-100">
          <Link to="/" className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
               H
             </div>
             <span className="text-2xl font-black text-slate-800 tracking-tight">Himalayneer</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8 px-5">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-3">Menu</p>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
            >
              <FiGrid className={`mr-4 text-xl ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-400'}`} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
            >
              <FiPackage className={`mr-4 text-xl ${activeTab === 'orders' ? 'text-white' : 'text-slate-400'}`} /> Order History
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
            >
              <FiUser className={`mr-4 text-xl ${activeTab === 'profile' ? 'text-white' : 'text-slate-400'}`} /> Profile Settings
            </button>
          </nav>

          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-3 mt-10">Others</p>
          <nav className="space-y-2">
            <Link to="/" className="w-full flex items-center px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-2xl font-bold transition-colors">
              <FiHome className="mr-4 text-xl text-slate-400" /> Back to Home
            </Link>
          </nav>
        </div>

        <div className="p-5 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center justify-center w-full px-4 py-3.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl font-bold transition-all group border border-transparent hover:border-red-100">
            <FiLogOut className="mr-3 text-xl group-hover:scale-110 transition-transform" /> Logout Account
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 z-30 sticky top-0 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden mr-4 p-2 bg-white rounded-xl shadow-sm text-slate-600 hover:text-blue-600 focus:outline-none">
              <FiMenu size={24} />
            </button>
            <div>
              <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                Pages / {activeTab}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight capitalize">
                {activeTab}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center bg-white p-2 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="text-right hidden sm:block mr-4 pl-4">
              <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">{user.email}</p>
            </div>
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Profile" className="w-12 h-12 rounded-full object-cover shadow-lg shadow-blue-500/20 border-2 border-white" />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg shadow-blue-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-8 pb-20">
            
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-50 flex items-center space-x-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30 relative z-10">
                      <FiPackage />
                    </div>
                    <div className="relative z-10">
                      <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Orders</p>
                      <p className="text-4xl font-black text-slate-800 tracking-tight">{totalOrdersCount}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-50 flex items-center space-x-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30 relative z-10">
                      <FiCreditCard />
                    </div>
                    <div className="relative z-10">
                      <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Amount Spent</p>
                      <p className="text-3xl font-black text-slate-800 tracking-tight">₹{totalSpent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden mt-8">
                  <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-800 flex items-center">
                       <FiTrendingUp className="mr-3 text-blue-500" /> Spending Overview
                    </h2>
                  </div>
                  <div className="p-6 h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val}`} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                          formatter={(value) => [`₹${value}`, 'Spent']}
                        />
                        <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden min-h-[500px]">
                <div className="p-8 border-b border-slate-50">
                  <h2 className="text-xl font-black text-slate-800">
                    Order History
                  </h2>
                </div>
                <div className="p-0 sm:p-4">
                  {loadingOrders ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50">
                            <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Order ID</th>
                            <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                            <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 hidden sm:table-cell">Product</th>
                            <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Total</th>
                            <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="py-4 px-6 border-b border-slate-50">
                                <span className="font-bold text-blue-600">{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                              </td>
                              <td className="py-4 px-6 border-b border-slate-50">
                                <span className="font-bold text-slate-700">{new Date(order.createdAt).toLocaleDateString()}</span>
                              </td>
                              <td className="py-4 px-6 border-b border-slate-50 hidden sm:table-cell">
                                <span className="text-slate-500 text-sm">{order.product?.quantity || 1}x {order.product?.name || 'Water'}</span>
                              </td>
                              <td className="py-4 px-6 border-b border-slate-50">
                                <span className="font-black text-slate-800">₹{order.totalAmount}</span>
                              </td>
                              <td className="py-4 px-6 border-b border-slate-50 text-right">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-wider">
                                  {order.orderStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <FiShoppingBag className="text-5xl text-blue-200" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">No orders found</h3>
                      <p className="text-slate-500 mt-3 max-w-sm text-sm leading-relaxed">You haven't made any purchases yet. Explore our premium Himalayan water products.</p>
                      <Link to="/products" className="mt-8 px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-700 transition-colors shadow-xl shadow-blue-600/20 hover:-translate-y-1">
                        Explore Products
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden">
                  <div className="p-8 border-b border-slate-50">
                    <h2 className="text-xl font-black text-slate-800">
                      Profile Settings
                    </h2>
                  </div>
                  <div className="p-8">
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative group cursor-pointer">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
                            {previewImage || profileImageUrl ? (
                              <img src={previewImage || profileImageUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-blue-50 flex items-center justify-center text-3xl font-black text-blue-600">
                                {user.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                            <FiCamera className="text-white text-xl" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                          </label>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Profile Picture</p>
                          <p className="text-xs text-slate-500 mt-1">JPG, PNG or WEBP. Max 2MB.</p>
                          {profileFile && (
                            <button type="submit" disabled={uploadingProfile} className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                              {uploadingProfile ? 'Uploading...' : 'Save Picture'}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-50">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Full Name</label>
                        <div className="px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">
                          {user.name}
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Email Address</label>
                        <div className="px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">
                          {user.email}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden">
                  <div className="p-8 border-b border-slate-50">
                    <h2 className="text-xl font-black text-slate-800 flex items-center">
                      <FiLock className="mr-3" /> Security
                    </h2>
                  </div>
                  <div className="p-8">
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      
                      {passwordStatus.error && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                          {passwordStatus.error}
                        </div>
                      )}
                      
                      {passwordStatus.success && (
                        <div className="p-4 bg-green-50 text-green-600 text-sm font-bold rounded-xl border border-green-100 flex items-center">
                          <FiCheck className="mr-2 text-lg" /> Password updated successfully!
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Current Password</label>
                        <input 
                          type="password" 
                          required
                          value={passwords.currentPassword}
                          onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                          className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium text-slate-800 outline-none transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">New Password</label>
                        <input 
                          type="password" 
                          required
                          value={passwords.newPassword}
                          onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                          className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium text-slate-800 outline-none transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={passwordStatus.loading}
                        className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20"
                      >
                        {passwordStatus.loading ? 'Updating...' : 'Update Password'}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
