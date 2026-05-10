import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CircularProgress, 
  Avatar, 
  Paper,
  Tooltip,
  IconButton,
  Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineArrowLeft, 
  HiOutlinePhone, 
  HiOutlineMail, 
  HiOutlineLocationMarker,
  HiOutlineShoppingBag,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineExternalLink,
  HiOutlineDatabase
} from 'react-icons/hi';
import { fetchOrdersByPhone } from '../services/api';

const CustomerDetails = () => {
  const { phone } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const data = await fetchOrdersByPhone(phone);
        setOrders(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCustomerData();
  }, [phone]);

  const stats = {
    totalSpent: orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
    totalOrders: orders.length,
    avgOrder: orders.length > 0 ? (orders.reduce((acc, curr) => acc + curr.totalAmount, 0) / orders.length).toFixed(0) : 0,
    lastActive: orders.length > 0 ? new Date(orders[0].createdAt).toLocaleDateString() : 'N/A'
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center p-40">
      <CircularProgress className="!text-blue-600" />
    </div>
  );

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-16">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px]"
          >
            <HiOutlineArrowLeft size={20} />
            Back to Directory
          </button>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Profile Verified</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Column: Profile Insight */}
          <div className="lg:col-span-1 space-y-10">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-full h-32 bg-blue-50/50 -z-0" />
                <Avatar className="!w-24 !h-24 !bg-blue-600 !text-2xl !font-black !rounded-[2.5rem] !mb-6 shadow-xl relative z-10 border-4 border-white">
                   {orders[0]?.customerName.charAt(0) || 'C'}
                </Avatar>
                <div className="relative z-10">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{orders[0]?.customerName || 'Anonymous'}</h3>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-8">Client Since {new Date(orders[orders.length-1]?.createdAt).getFullYear() || '2026'}</div>
                   
                   <div className="space-y-4 w-full">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <HiOutlinePhone className="text-blue-600" />
                         <span className="text-xs font-black text-slate-700">{phone}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <HiOutlineLocationMarker className="text-blue-600" />
                         <span className="text-xs font-black text-slate-700 truncate">{orders[0]?.city || 'Local Area'}</span>
                      </div>
                   </div>
                </div>
             </motion.div>

             <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/20">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Financial Overview</h4>
                <div className="space-y-8">
                   <div>
                      <div className="text-[9px] font-black text-slate-600 uppercase mb-1">Lifetime Value</div>
                      <div className="text-3xl font-black text-blue-400">₹{stats.totalSpent}</div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-800">
                      <div>
                         <div className="text-[8px] font-black text-slate-600 uppercase mb-1">Orders</div>
                         <div className="text-xl font-black text-white">{stats.totalOrders}</div>
                      </div>
                      <div>
                         <div className="text-[8px] font-black text-slate-600 uppercase mb-1">Avg Vol.</div>
                         <div className="text-xl font-black text-white">₹{stats.avgOrder}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Transactional Intelligence */}
          <div className="lg:col-span-3 space-y-12">
             <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Transaction <span className="text-blue-600">Timeline</span></h3>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Historical data audit</p>
                </div>
                <div className="flex gap-3">
                   <button className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:bg-white transition-all">Export JSON</button>
                </div>
             </div>

             <div className="space-y-6">
                <AnimatePresence>
                   {orders.map((order, i) => (
                     <motion.div 
                        key={order._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-blue-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.01)] transition-all flex items-center justify-between group"
                     >
                        <div className="flex items-center gap-8">
                           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl group-hover:bg-blue-50 transition-colors">
                              <HiOutlineShoppingBag />
                           </div>
                           <div>
                              <div className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{order.product.name}</div>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <HiOutlineCalendar /> {new Date(order.createdAt).toLocaleDateString()}
                                 </span>
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <HiOutlineDatabase /> ORD-{order._id.slice(-6).toUpperCase()}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-12">
                           <div className="text-right">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transaction</div>
                              <div className="text-xl font-black text-slate-900">₹{order.totalAmount}</div>
                           </div>
                           <div className="flex flex-col items-end gap-2">
                              <Chip 
                                 label={order.orderStatus} 
                                 size="small"
                                 className={`!font-black !text-[8px] !uppercase !tracking-[0.2em] ${
                                    order.orderStatus === 'Delivered' ? '!bg-green-50 !text-green-600' : '!bg-blue-50 !text-blue-600'
                                 }`}
                              />
                              <IconButton onClick={() => navigate(`/orders/${order._id}`)} className="!bg-slate-50 !text-slate-400 hover:!text-blue-600 transition-colors">
                                 <HiOutlineExternalLink size={18} />
                              </IconButton>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </AnimatePresence>

                {orders.length === 0 && (
                  <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border border-slate-100">
                     <p className="text-slate-300 font-black uppercase tracking-widest text-sm italic">No transactional intelligence found</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
