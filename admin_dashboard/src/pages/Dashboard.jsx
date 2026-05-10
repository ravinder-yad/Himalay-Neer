import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineClipboardList, 
  HiOutlineChartBar,
  HiOutlineRefresh,
  HiOutlineCheckCircle,
  HiOutlineCurrencyRupee,
  HiOutlineArrowUp,
  HiOutlineUserGroup,
  HiOutlineTrendingUp
} from 'react-icons/hi';
import { Button, CircularProgress } from '@mui/material';
import { fetchOrders } from '../services/api';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        const fetchedOrders = data.data;
        setOrders(fetchedOrders);

        // Process data for chart (Group by Date)
        const groupedData = fetchedOrders.reduce((acc, order) => {
          const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (!acc[date]) {
            acc[date] = { date, revenue: 0, count: 0 };
          }
          acc[date].revenue += order.totalAmount;
          acc[date].count += 1;
          return acc;
        }, {});

        setChartData(Object.values(groupedData).slice(-7)); // Last 7 days
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `₹${orders.reduce((acc, curr) => acc + curr.totalAmount, 0)}`, icon: <HiOutlineCurrencyRupee />, color: 'text-green-600', bg: 'bg-green-50', trend: '+12.5%' },
    { label: 'Total Orders', value: orders.length, icon: <HiOutlineClipboardList />, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+8.2%' },
    { label: 'Pending Delivery', value: orders.filter(o => o.orderStatus === 'Placed').length, icon: <HiOutlineRefresh />, color: 'text-orange-600', bg: 'bg-orange-50', trend: '-2.4%' },
    { label: 'Total Customers', value: [...new Set(orders.map(o => o.phone))].length, icon: <HiOutlineUserGroup />, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5.1%' },
  ];

  if (loading) return (
    <div className="flex h-full items-center justify-center p-40">
      <CircularProgress className="!text-blue-600" />
    </div>
  );

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <header className="mb-16 flex justify-between items-end">
        <div>
           <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Enterprise Intelligence</div>
           <h2 className="text-6xl font-black text-slate-900 tracking-tighter">
             Network <span className="text-blue-600">Performance</span>
           </h2>
        </div>
        <div className="hidden xl:flex gap-4 mb-2">
           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">System Status</div>
              <div className="flex items-center gap-2 text-xs font-black text-green-500">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                 Operational
              </div>
           </div>
        </div>
      </header>

      {/* Stats Grid - High Fidelity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-blue-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.02)] transition-all cursor-default"
          >
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>
               {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
               <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
               <div className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg mb-1">
                  {stat.trend}
               </div>
            </div>
            <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <HiOutlineArrowUp className="text-slate-200" size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Growth Analytics Chart - Refined Container */}
         <div className="xl:col-span-2 bg-slate-50/50 rounded-[3.5rem] p-12 border border-slate-100 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-16">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                     Revenue <span className="text-blue-600">Velocity</span>
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Growth Metrics</p>
               </div>
               <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                  <button className="px-4 py-2 text-[10px] font-black text-blue-600 bg-blue-50 rounded-xl uppercase tracking-widest">7 Days</button>
                  <button className="px-4 py-2 text-[10px] font-black text-slate-400 hover:text-slate-600 rounded-xl uppercase tracking-widest transition-colors">30 Days</button>
               </div>
            </div>
            
            <div className="h-[450px] w-full">
               {chartData.length > 0 ? (
                  <ResponsiveContainer width="99%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                           <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                           dataKey="date" 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                           dy={15}
                        />
                        <YAxis 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                           dx={-15}
                        />
                        <Tooltip 
                           contentStyle={{ 
                              backgroundColor: '#0f172a', 
                              borderRadius: '24px', 
                              border: 'none', 
                              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                              padding: '24px'
                           }}
                           itemStyle={{ color: '#fff', fontWeight: 900, fontSize: 14 }}
                           labelStyle={{ color: '#64748b', fontSize: 10, fontWeight: 900, marginBottom: 8, textTransform: 'uppercase' }}
                        />
                        <Area 
                           type="monotone" 
                           dataKey="revenue" 
                           stroke="#2563eb" 
                           strokeWidth={5}
                           fillOpacity={1} 
                           fill="url(#colorRev)" 
                           animationDuration={2000}
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                     <CircularProgress color="inherit" size={32} />
                     <p className="font-black text-[10px] uppercase tracking-widest italic">Calculating metrics...</p>
                  </div>
               )}
            </div>
         </div>

         {/* Activity Feed - Ultra Modern Timeline */}
         <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.01)] flex flex-col">
            <header className="mb-12">
               <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Live <span className="text-blue-600">Feed</span></h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Transaction Stream</p>
            </header>

            <div className="space-y-10 flex-1 relative">
               <div className="absolute left-[27px] top-4 bottom-10 w-[2px] bg-slate-50" />
               {orders.slice(0, 5).map((order, i) => (
                 <motion.div 
                    key={order._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-6 group"
                 >
                    <div className="relative z-10 w-14 h-14 bg-white border-2 border-slate-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:border-blue-200 transition-colors">
                       <HiOutlineClipboardList size={24} />
                    </div>
                    <div>
                       <div className="text-sm font-black text-slate-800 leading-tight">
                          {order.customerName.split(' ')[0]} <span className="text-slate-400 font-bold italic">ordered</span> {order.product?.name || "Product"}
                       </div>
                       <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-widest">₹{order.totalAmount}</span>
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>

            <button className="w-full mt-12 py-5 bg-slate-50 rounded-[1.5rem] text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all">
               View Full Matrix
            </button>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
