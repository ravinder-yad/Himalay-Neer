import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CircularProgress, 
  Button, 
  Chip,
  IconButton,
  Paper,
  Avatar,
  Tooltip
} from '@mui/material';
import { fetchOrders, updateOrderStatus } from '../services/api';
import { motion } from 'framer-motion';
import { 
  HiOutlineArrowLeft, 
  HiOutlinePrinter, 
  HiOutlineTruck, 
  HiOutlineCheckCircle,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineShoppingBag,
  HiOutlineCurrencyRupee,
  HiOutlineCalendar,
  HiOutlineCube
} from 'react-icons/hi';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const data = await fetchOrders();
        const foundOrder = data.data.find(o => o._id === id);
        setOrder(foundOrder);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getOrderDetails();
  }, [id]);

  const handleStatusUpdate = async (status) => {
    try {
      await updateOrderStatus(id, { orderStatus: status });
      setOrder({ ...order, orderStatus: status });
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center p-40">
      <CircularProgress className="!text-blue-600" />
    </div>
  );

  if (!order) return <div className="p-20 text-center font-black text-slate-300">Order not found in matrix</div>;

  return (
    <div className="p-10 lg:p-20 bg-slate-50/30 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[10px]"
          >
            <HiOutlineArrowLeft size={20} />
            Back to Matrix
          </button>
          <div className="flex gap-4">
             <Button 
                variant="outlined" 
                startIcon={<HiOutlinePrinter />}
                className="!rounded-2xl !border-slate-200 !text-slate-600 !font-black !px-8 !py-3 hover:!bg-white"
             >
                Generate Invoice
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Invoice Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Paper className="!rounded-[3.5rem] !p-16 !shadow-[0_40px_80px_rgba(0,0,0,0.03)] !border-none overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -mr-32 -mt-32" />
               
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-20">
                     <div>
                        <div className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">Official Transaction</div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">ORD-{order._id.slice(-8).toUpperCase()}</h1>
                        <p className="text-slate-400 font-bold text-xs mt-2 flex items-center gap-2 uppercase tracking-widest">
                           <HiOutlineCalendar />
                           Processed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                     </div>
                     <Chip 
                        label={order.orderStatus} 
                        className={`!font-black !text-[10px] !uppercase !tracking-widest !py-6 !px-8 !rounded-2xl ${
                           order.orderStatus === 'Delivered' ? '!bg-green-50 !text-green-600' : '!bg-blue-600 !text-white'
                        }`}
                     />
                  </div>

                  {/* Order Process Timeline */}
                  <div className="flex items-center gap-4 mb-20 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                     <div className="flex-1 flex flex-col items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                           <HiOutlineCheckCircle />
                        </div>
                        <span className="text-[9px] font-black text-slate-900 uppercase">Placed</span>
                     </div>
                     <div className="w-12 h-0.5 bg-blue-200" />
                     <div className="flex-1 flex flex-col items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.orderStatus !== 'Placed' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                           <HiOutlineCube />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase">Processing</span>
                     </div>
                     <div className="w-12 h-0.5 bg-slate-100" />
                     <div className="flex-1 flex flex-col items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.orderStatus === 'Delivered' ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                           <HiOutlineTruck />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase">Delivered</span>
                     </div>
                  </div>

                  <div className="mb-16">
                     <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 ml-1">Purchased Intelligence</h3>
                     <div className="p-10 bg-slate-900 rounded-[3rem] text-white flex items-center justify-between shadow-2xl shadow-slate-900/20">
                        <div className="flex items-center gap-8">
                           <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-blue-400 text-3xl backdrop-blur-md">
                              <HiOutlineShoppingBag />
                           </div>
                           <div>
                              <div className="text-xl font-black">{order.product.name}</div>
                              <div className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Quantity: {order.product.quantity} Units</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Total Impact</div>
                           <div className="text-3xl font-black text-blue-400">₹{order.totalAmount}</div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-50">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Strategy</h4>
                        <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                           <HiOutlineCurrencyRupee className="text-blue-600 text-2xl" />
                           <div>
                              <div className="text-sm font-black text-slate-900">{order.paymentMethod}</div>
                              <div className={`text-[10px] font-black uppercase ${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>{order.paymentStatus}</div>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-end">
                        <Button 
                           onClick={() => handleStatusUpdate('Delivered')}
                           variant="contained" 
                           className="!rounded-[2rem] !bg-blue-600 !py-6 !font-black !shadow-2xl !shadow-blue-600/30 hover:!scale-[1.02] transition-all"
                        >
                           Seal & Deliver Order
                        </Button>
                     </div>
                  </div>
               </div>
            </Paper>
          </motion.div>

          {/* Right Column: Customer Intelligence */}
          <div className="space-y-10">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.02)] border border-slate-100"
             >
                <h3 className="text-xl font-black text-slate-900 mb-10 tracking-tighter">Client Details</h3>
                <div className="flex items-center gap-5 mb-10">
                   <Avatar className="!w-16 !h-16 !bg-blue-50 !text-blue-600 !font-black !rounded-2xl !text-xl">
                      {order.customerName.charAt(0)}
                   </Avatar>
                   <div>
                      <div className="text-lg font-black text-slate-900">{order.customerName}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Community Client</div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <HiOutlinePhone className="text-blue-600" size={20} />
                      <span className="text-sm font-black text-slate-700">{order.phone}</span>
                   </div>
                   <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <HiOutlineMail className="text-blue-600" size={20} />
                      <span className="text-sm font-black text-slate-700 truncate">{order.email || 'No email provided'}</span>
                   </div>
                   <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <HiOutlineLocationMarker />
                         Delivery Coordinate
                      </div>
                      <div className="text-sm font-bold text-slate-700 leading-relaxed">
                         {order.address}<br />
                         {order.city}, {order.pincode}
                      </div>
                   </div>
                </div>
             </motion.div>

             <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h4 className="text-sm font-black uppercase tracking-widest mb-4">Master Note</h4>
                   <p className="text-slate-400 text-xs leading-relaxed font-medium">
                      Ensure premium delivery standards for this client. Himalaya Neer water quality must be maintained at 100% purity during transit.
                   </p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-[60px] opacity-20" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
