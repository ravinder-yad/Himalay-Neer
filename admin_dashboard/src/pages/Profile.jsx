import React from 'react';
import { motion } from 'framer-motion';
import { 
  Avatar, 
  Button, 
  TextField, 
  IconButton,
  Switch,
  Paper
} from '@mui/material';
import { 
  HiOutlineCamera, 
  HiOutlineMail, 
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineColorSwatch,
  HiOutlineUserCircle,
  HiOutlineKey,
  HiOutlineFingerPrint
} from 'react-icons/hi';

const Profile = () => {
  const [profileImage, setProfileImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20">
          <div>
             <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Identity & Security</div>
             <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
               Admin <span className="text-blue-600">Vault</span>
             </h2>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Master credentials oversight</p>
          </div>
          
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Master Session Active</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left: Master Identity Module */}
          <div className="lg:col-span-1 space-y-10">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-full h-32 bg-blue-50/50 -z-0" />
                <div className="relative z-10 mb-8">
                   <div className="relative">
                      <Avatar 
                       src={imagePreview}
                       className="!w-28 !h-28 !bg-blue-600 !text-3xl !font-black !rounded-[2rem] border-4 border-white shadow-2xl"
                      >
                        {!imagePreview && 'RY'}
                      </Avatar>
                      <label className="!absolute !-bottom-2 !-right-2 !bg-white !text-blue-600 shadow-lg border border-slate-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
                         <HiOutlineCamera size={18} />
                         <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                   </div>
                </div>
                
                <div className="relative z-10">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Ravinder Yadav</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-8">System Architect</p>
                   
                   <div className="space-y-4 w-full">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <HiOutlineShieldCheck className="text-blue-600" />
                         <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Verified Identity</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                         <HiOutlineFingerPrint className="text-blue-600" />
                         <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Biometric Enabled</span>
                      </div>
                   </div>
                </div>
             </motion.div>

             <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Account Standing</h4>
                   <div className="space-y-6">
                      <div>
                         <div className="text-[9px] font-black text-slate-600 uppercase mb-1">Authorization Level</div>
                         <div className="text-xl font-black text-blue-400">Master Admin</div>
                      </div>
                      <div className="pt-6 border-t border-slate-800">
                         <div className="text-[9px] font-black text-slate-600 uppercase mb-1">Subscription</div>
                         <div className="text-xl font-black text-white">Enterprise Suite</div>
                      </div>
                   </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700" />
             </div>
          </div>

          {/* Right: Security & Personalization Matrix */}
          <div className="lg:col-span-3 space-y-12">
             {/* Identity Specs */}
             <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.01)]">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <HiOutlineUserCircle size={24} />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tighter">Identity Specification</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Personal intelligence profile</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
                      <input 
                         type="text"
                         defaultValue="Ravinder Yadav"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Electronic Mail</label>
                      <input 
                         type="email"
                         defaultValue="ravinder@himalayaneer.com"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Phone</label>
                      <input 
                         type="text"
                         defaultValue="+91 98765 43210"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Zone</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all appearance-none cursor-pointer">
                         <option>IST (GMT+5:30) - New Delhi</option>
                      </select>
                   </div>
                </div>
                <div className="mt-12">
                   <button className="px-10 py-4 bg-blue-600 rounded-2xl font-black text-white text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all">
                      Push Updates to Ledger
                   </button>
                </div>
             </div>

             {/* Security Matrix */}
             <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.01)] relative overflow-hidden">
                <div className="flex items-center gap-4 mb-10 relative z-10">
                   <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      <HiOutlineKey size={24} />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tighter">Security Matrix</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol & Shield management</p>
                   </div>
                </div>
                
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:border-blue-100 transition-all">
                      <div>
                         <div className="font-black text-sm text-slate-900">Multi-Factor Authentication</div>
                         <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Secondary verification protocol</div>
                      </div>
                      <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:border-blue-100 transition-all">
                      <div>
                         <div className="font-black text-sm text-slate-900">Push Intelligence</div>
                         <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Real-time operational alerts</div>
                      </div>
                      <Switch defaultChecked color="primary" />
                   </div>
                </div>
                
                <div className="mt-10 relative z-10 flex gap-4">
                   <button className="flex-1 py-4 border border-slate-100 rounded-2xl font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest text-[9px]">
                      Download Security Log
                   </button>
                   <button className="flex-1 py-4 bg-slate-900 rounded-2xl font-black text-white shadow-2xl shadow-slate-900/20 hover:bg-black transition-all uppercase tracking-widest text-[9px]">
                      Regenerate Master Key
                   </button>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-0" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
