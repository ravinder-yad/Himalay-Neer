import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CircularProgress, 
  Avatar, 
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  HiOutlineSearch, 
  HiOutlineRefresh, 
  HiOutlinePhone, 
  HiOutlineMail, 
  HiOutlineArrowRight,
  HiOutlineEye
} from 'react-icons/hi';
import { fetchCustomers, syncCustomers } from '../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getCustomers = async () => {
    setLoading(true);
    try {
      const data = await fetchCustomers();
      setCustomers(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleSync = async () => {
    setLoading(true);
    try {
      await syncCustomers();
      getCustomers();
    } catch (error) {
      alert("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => {
    const name = c.customerName || '';
    const phone = c.phone || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           phone.includes(searchTerm);
  });

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20">
        <div>
           <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Client Relations</div>
           <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
             Customer <span className="text-blue-600">Wall</span>
           </h2>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Institutional engagement tracking</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
           {/* Search Bar */}
           <div className="relative flex-1 md:w-80">
              <input 
                 type="text" 
                 placeholder="Search identities..." 
                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           </div>

           <button 
             onClick={handleSync}
             className="flex items-center gap-3 px-8 py-4 bg-slate-900 rounded-2xl font-black text-white hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 transition-all uppercase tracking-widest text-[10px]"
           >
             <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={18} />
             Sync Matrix
           </button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
           <CircularProgress size={60} thickness={5} className="!text-blue-600 mb-6" />
           <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Synchronizing Matrix...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredCustomers.map((customer, i) => (
              <motion.div
                key={customer._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 hover:border-blue-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.02)] transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-10">
                   <Avatar className="!w-16 !h-16 !bg-blue-50 !text-blue-600 !font-black !rounded-2xl !text-xl shadow-inner group-hover:scale-110 transition-transform">
                      {customer.customerName?.charAt(0) || 'C'}
                   </Avatar>
                   <div className="text-right">
                      <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</div>
                      <Chip label="Active Client" size="small" className="!bg-green-50 !text-green-600 !font-black !text-[8px] !uppercase !tracking-widest" />
                   </div>
                </div>

                <div className="flex-1">
                   <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{customer.customerName}</h3>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                      <HiOutlinePhone className="text-blue-400" />
                      {customer.phone}
                   </div>

                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50/30 transition-colors text-center md:text-left">
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Orders</div>
                         <div className="text-lg font-black text-slate-900">{customer.totalOrders}</div>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50/30 transition-colors text-center md:text-left">
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Spent</div>
                         <div className="text-lg font-black text-blue-600">₹{customer.totalSpent}</div>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest truncate max-w-[150px]">
                      <HiOutlineMail className="text-blue-300" />
                      {customer.email || 'Private Client'}
                   </div>
                   <Link to={`/customers/${customer.phone}`}>
                      <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                         Intelligence
                         <HiOutlineArrowRight />
                      </button>
                   </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredCustomers.length === 0 && !loading && (
        <div className="text-center py-40">
           <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center text-6xl mx-auto mb-10 shadow-inner grayscale opacity-50 text-slate-300">👥</div>
           <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Directory Empty</h3>
           <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Customers;
