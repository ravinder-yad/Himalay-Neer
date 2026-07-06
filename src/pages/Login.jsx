import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiDroplet } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reset } from '../store/authSlice';
import { useEffect } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message); // Could use a better toast here later
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-[90vh] bg-[#f0f2f5] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative min-h-[600px]">
        
        {/* Left Panel - Blue */}
        <div className="w-full md:w-[45%] bg-[#2563eb] p-8 lg:p-14 flex flex-col items-center justify-between text-white relative z-0">
          
          <div className="w-full flex justify-between text-[11px] font-bold opacity-80 tracking-widest uppercase">
            <span>Created Here</span>
            <span>Designed Here</span>
          </div>

          <div className="flex flex-col items-center text-center my-auto w-full">
             <h2 className="text-2xl lg:text-3xl font-bold mb-8">Welcome to</h2>
             
             {/* Logo */}
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
               <FiDroplet className="text-[#2563eb] w-12 h-12" />
             </div>
             <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">Himalay Neer</h1>
          </div>

          <div className="text-center w-full mt-auto">
            <p className="text-[13px] text-blue-100 font-medium leading-relaxed opacity-100 max-w-sm mx-auto">
              Experience the purest hydration directly from the untouched peaks of the Himalayas to your doorstep.
            </p>
            <p className="mt-8 text-[11px] font-black text-white tracking-[0.2em] uppercase">
              CONTACT: INFO@HIMALAYNEER.COM
            </p>
          </div>
        </div>

        {/* Right Panel - White */}
        <div className="w-full md:w-[55%] bg-white p-8 lg:p-20 relative z-10 flex items-center">
          
          {/* Cloud Separator Container (Desktop) */}
          <div className="hidden md:block absolute left-0 top-0 h-full w-32 -translate-x-16 pointer-events-none z-0">
             
             {/* Light Blue Shadows */}
             <div className="absolute top-[-5%] left-[10px] w-32 h-32 bg-[#4a84e6] rounded-full"></div>
             <div className="absolute top-[15%] left-[2px] w-28 h-28 bg-[#4a84e6] rounded-full"></div>
             <div className="absolute top-[35%] left-[-15px] w-40 h-40 bg-[#4a84e6] rounded-full"></div>
             <div className="absolute top-[55%] left-[5px] w-32 h-32 bg-[#4a84e6] rounded-full"></div>
             <div className="absolute top-[75%] left-[15px] w-36 h-36 bg-[#4a84e6] rounded-full"></div>
             
             {/* White Clouds */}
             <div className="absolute top-[-5%] left-[25px] w-32 h-32 bg-white rounded-full"></div>
             <div className="absolute top-[15%] left-[15px] w-28 h-28 bg-white rounded-full"></div>
             <div className="absolute top-[35%] left-[5px] w-40 h-40 bg-white rounded-full"></div>
             <div className="absolute top-[55%] left-[20px] w-32 h-32 bg-white rounded-full"></div>
             <div className="absolute top-[75%] left-[30px] w-36 h-36 bg-white rounded-full"></div>
             <div className="absolute top-[90%] left-[10px] w-32 h-32 bg-white rounded-full"></div>

          </div>

          {/* Form Content */}
          <div className="w-full max-w-[420px] mx-auto relative z-20">
            <h2 className="text-2xl font-black text-gray-800 text-center mb-12">Sign in to your account</h2>
            
            <form className="space-y-8" onSubmit={handleSubmit}>
               <div className="relative group">
                 <label className="text-[13px] font-bold text-gray-700 block mb-2">E-mail Address</label>
                 <input 
                   type="email" 
                   name="email"
                   placeholder="Enter your email" 
                   className="w-full border-b-[1.5px] border-gray-200 focus:border-[#2563eb] py-2 outline-none text-gray-800 placeholder-gray-400 transition-colors bg-transparent text-[15px] font-medium"
                   value={formData.email}
                   onChange={handleChange}
                 />
                 <span className="absolute right-0 bottom-3 text-blue-500 opacity-0 group-focus-within:opacity-100 transition-opacity text-sm font-bold">✓</span>
               </div>

               <div className="relative group">
                 <div className="flex justify-between items-center mb-2">
                   <label className="text-[13px] font-bold text-gray-700 block">Password</label>
                   <Link to="/forgot-password" className="text-[12px] font-bold text-[#2563eb] hover:underline">Forgot Password?</Link>
                 </div>
                 <input 
                   type="password" 
                   name="password"
                   placeholder="Enter your password" 
                   className="w-full border-b-[1.5px] border-gray-200 focus:border-[#2563eb] py-2 outline-none text-gray-800 placeholder-gray-400 transition-colors bg-transparent text-[15px] font-medium"
                   value={formData.password}
                   onChange={handleChange}
                 />
                 <span className="absolute right-0 bottom-3 text-blue-500 opacity-0 group-focus-within:opacity-100 transition-opacity text-sm font-bold">✓</span>
               </div>
               
               <div className="flex gap-5 pt-8">
                  <button type="submit" disabled={isLoading} className="flex-1 bg-[#2563eb] text-white rounded-full py-3.5 text-[14px] font-bold shadow-[0_8px_20px_rgba(37,99,235,0.24)] hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                 <button type="button" onClick={() => navigate('/signup')} className="flex-1 bg-white text-gray-500 border-2 border-gray-200 rounded-full py-3.5 text-[14px] font-bold hover:border-gray-300 hover:text-gray-700 hover:-translate-y-0.5 transition-all active:scale-95">
                   Sign Up
                 </button>
               </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
