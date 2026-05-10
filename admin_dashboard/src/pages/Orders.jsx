import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconButton, 
  Chip, 
  CircularProgress,
  Tooltip,
  Badge
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  HiOutlineTrash, 
  HiOutlineCheckCircle, 
  HiOutlineRefresh,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineShoppingBag,
  HiOutlineArrowRight,
  HiOutlineCalendar,
  HiOutlineSearch
} from 'react-icons/hi';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const getOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, { orderStatus: status });
      getOrders();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this order forever?")) {
      try {
        await deleteOrder(id);
        getOrders();
      } catch (error) {
        alert("Failed to delete order");
      }
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || o.phone.includes(searchTerm);
    if (!matchesSearch) return false;
    
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return o.orderStatus === 'Placed' || o.orderStatus === 'Processing';
    if (activeTab === 'Delivered') return o.orderStatus === 'Delivered';
    return true;
  });

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20">
        <div>
           <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Network Logistics</div>
           <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
             Orders <span className="text-blue-600">Matrix</span>
           </h2>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Real-time transactional stream</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
           {/* Search Bar */}
           <div className="relative flex-1 md:w-80">
              <input 
                 type="text" 
                 placeholder="Search orders..." 
                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           </div>

           {/* Tabs */}
           <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              {['All', 'Pending', 'Delivered'].map((tab) => (
                <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeTab === tab 
                       ? 'bg-white text-blue-600 shadow-sm' 
                       : 'text-slate-400 hover:text-slate-600'
                   }`}
                >
                   {tab}
                </button>
              ))}
           </div>

           <button 
               onClick={getOrders}
               className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all group"
           >
               <HiOutlineRefresh className={`group-hover:rotate-180 transition-transform duration-700 ${loading ? 'animate-spin' : ''}`} size={20} />
           </button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
           <CircularProgress size={60} thickness={5} className="!text-blue-600 mb-6" />
           <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Syncing Matrix...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredOrders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 hover:border-blue-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.02)] transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-8">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      <HiOutlineShoppingBag />
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <Chip 
                        label={order.orderStatus} 
                        size="small"
                        className={`!font-black !text-[8px] !uppercase !tracking-[0.2em] !px-3 ${
                           order.orderStatus === 'Delivered' ? '!bg-green-50 !text-green-600' : '!bg-blue-50 !text-blue-600'
                        }`}
                      />
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">#ORD-{order._id.slice(-6)}</span>
                   </div>
                </div>

                <div className="flex-1">
                   <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{order.customerName}</h3>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                      <HiOutlinePhone className="text-blue-400" />
                      {order.phone}
                   </div>

                   <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 mb-10 group-hover:bg-blue-50/20 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</span>
                         <span className="text-sm font-black text-slate-900">{order.product.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                         <span className="text-xl font-black text-blue-600">₹{order.totalAmount}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-3">
                      <Tooltip title="View Detailed Invoice">
                        <Link to={`/orders/${order._id}`}>
                          <IconButton className="!bg-slate-900 !text-white hover:!scale-110 transition-all">
                             <HiOutlineEye size={18} />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Mark as Delivered">
                         <IconButton 
                            onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                            className="!bg-green-50 !text-green-600 hover:!bg-green-600 hover:!text-white transition-all"
                         >
                            <HiOutlineCheckCircle size={18} />
                         </IconButton>
                      </Tooltip>
                      <Tooltip title="Discard Transaction">
                         <IconButton 
                            onClick={() => handleDelete(order._id)}
                            className="!bg-red-50 !text-red-600 hover:!bg-red-600 hover:!text-white transition-all"
                         >
                            <HiOutlineTrash size={18} />
                         </IconButton>
                      </Tooltip>
                   </div>
                   <div className="text-right">
                      <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 justify-end">
                         <HiOutlineCalendar />
                         {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-[9px] font-bold text-slate-400 mt-0.5">{order.paymentStatus} via {order.paymentMethod}</div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-40">
           <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center text-6xl mx-auto mb-10 shadow-inner grayscale opacity-50">📦</div>
           <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Matrix Empty</h3>
           <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
