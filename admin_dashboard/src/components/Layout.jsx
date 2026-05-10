import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  HiOutlineChartBar, 
  HiOutlineClipboardList, 
  HiOutlineCube, 
  HiOutlineUserGroup, 
  HiOutlineMail,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineBell,
  HiOutlineSearch
} from 'react-icons/hi';
import { IconButton, Badge, Avatar, Tooltip } from '@mui/material';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <HiOutlineChartBar /> },
    { path: '/orders', label: 'Orders Wall', icon: <HiOutlineClipboardList /> },
    { path: '/products', label: 'Inventory', icon: <HiOutlineCube /> },
    { path: '/customers', label: 'Customer Wall', icon: <HiOutlineUserGroup /> },
    { path: '/contacts', label: 'Inquiries', icon: <HiOutlineMail /> },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Ultra Minimalist & Sophisticated */}
      <aside className="w-72 bg-white flex flex-col fixed h-full z-50 transition-all border-r border-slate-100">
        <div className="p-10 mb-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform">💧</div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900">HIMALAY<span className="text-blue-600">NEER</span></h1>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-10 overflow-y-auto custom-scrollbar">
          {/* Main Section */}
          <div className="space-y-2">
             <div className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Main Menu</div>
             <Link
                to="/"
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                  location.pathname === '/' 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }`}
             >
                <HiOutlineChartBar className="text-xl" />
                <span className="text-sm">Dashboard</span>
             </Link>
          </div>

          {/* Operations Section */}
          <div className="space-y-2">
             <div className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Operations</div>
             {[
               { path: '/orders', label: 'Orders Wall', icon: <HiOutlineClipboardList /> },
               { path: '/products', label: 'Inventory', icon: <HiOutlineCube /> },
               { path: '/customers', label: 'Customers', icon: <HiOutlineUserGroup /> },
             ].map((item) => (
               <Link
                 key={item.path}
                 to={item.path}
                 className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                   location.pathname === item.path 
                     ? 'bg-blue-50 text-blue-600 shadow-sm' 
                     : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                 }`}
               >
                 <span className="text-xl">{item.icon}</span>
                 <span className="text-sm">{item.label}</span>
               </Link>
             ))}
          </div>

          {/* Communication Section */}
          <div className="space-y-2">
             <div className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Communication</div>
             <Link
                to="/contacts"
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                  location.pathname === '/contacts' 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }`}
             >
                <HiOutlineMail className="text-xl" />
                <span className="text-sm">Inquiries</span>
             </Link>
          </div>
        </nav>

        <div className="p-8 border-t border-slate-50">
           <div className="bg-slate-50 rounded-2xl p-4">
              <Link to="/profile" className="flex items-center gap-3 mb-4 group">
                 <Avatar className="!w-10 !h-10 !bg-blue-600 !text-sm !font-black !rounded-lg shadow-md">RY</Avatar>
                 <div className="flex-1">
                    <div className="text-xs font-black text-slate-900 truncate">Ravinder Yadav</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Admin</div>
                 </div>
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-black text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all uppercase tracking-widest">
                 <HiOutlineLogout size={14} />
                 Secure Logout
              </button>
           </div>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Topbar - Enterprise Grade Refinement */}
        <header className="h-20 bg-white border-b border-slate-100 sticky top-0 z-40 px-10 lg:px-16 flex items-center justify-between">
           <div className="flex items-center gap-8">
              {/* Dynamic Page Title */}
              <div className="hidden md:block">
                 <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-0.5">Workspace</div>
                 <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    {location.pathname === '/' ? 'Overview' : location.pathname.split('/')[1]}
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                 </h2>
              </div>

              {/* Minimalist Search */}
              <div className="relative hidden lg:block group">
                 <input 
                    type="text" 
                    placeholder="Search intelligence..." 
                    className="w-80 bg-slate-50/50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-slate-700 focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-50 transition-all outline-none"
                 />
                 <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              </div>
           </div>

           <div className="flex items-center gap-6">
              {/* Notification Node */}
              <Tooltip title="Notifications">
                 <IconButton className="!w-10 !h-10 !bg-slate-50 !text-slate-400 hover:!bg-blue-50 hover:!text-blue-600 transition-all">
                    <Badge badgeContent={4} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 8, fontWeight: 900, minWidth: 16, height: 16 } }}>
                       <HiOutlineBell size={20} />
                    </Badge>
                 </IconButton>
              </Tooltip>
              
              <div className="h-8 w-[1px] bg-slate-100 mx-2" />
              
              {/* Profile Shortcut */}
              <Link to="/profile" className="flex items-center gap-4 group px-2 py-1 rounded-xl hover:bg-slate-50 transition-all">
                 <Avatar className="!w-9 !h-9 !bg-blue-50 !text-blue-600 !text-xs !font-black !rounded-lg border border-blue-100 shadow-sm group-hover:scale-105 transition-all">
                    RY
                 </Avatar>
                 <div className="hidden sm:block">
                    <div className="text-[11px] font-black text-slate-900 leading-tight">Ravinder</div>
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Master</div>
                 </div>
              </Link>
           </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden bg-white">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
