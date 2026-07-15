import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider } from '@mui/material';
import { 
  HiOutlineShieldCheck, 
  HiOutlineTruck, 
  HiOutlineCreditCard, 
  HiOutlineCash, 
  HiOutlineArrowRight,
  HiCheckCircle,
  HiOutlineSupport
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { createOrder } from '../services/api';
import { CircularProgress } from '@mui/material';

// Import images for summary
import p20l from '../assets/p_20l.png';

const Checkout = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [deliveryType, setDeliveryType] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderData = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        product: {
            name: "20L Premium Jar", // This should ideally come from cart/props
            price: 250,
            quantity: 2
        },
        totalAmount: deliveryType === 'standard' ? 500 : 520,
        deliveryType: deliveryType,
        paymentMethod: paymentMethod
    };

    try {
        await createOrder(orderData);
        setOrderSuccess(true);
    } catch (err) {
        setError(err.error || "Failed to place order. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-40 h-40 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-blue-900/10"
        >
          <HiCheckCircle size={100} />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-blue-900 mb-6 tracking-tighter"
        >
          Order Placed! 💧
        </motion.h2>
        <p className="text-slate-500 text-xl mb-4">Order ID: #HN-{Math.floor(Math.random() * 1000000)}</p>
        <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">Thank you for choosing Himalayneer. Your water will reach you in record time.</p>
        <Link to="/">
          <Button variant="contained" className="!rounded-full !bg-blue-600 !px-16 !py-6 !font-black !text-xl !normal-case !shadow-2xl">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        
        {/* 1. Page Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-slate-400 font-black text-xs uppercase tracking-[0.3em]">
            <span>Cart</span>
            <HiOutlineArrowRight />
            <span className="text-blue-600">Checkout</span>
            <HiOutlineArrowRight />
            <span>Success</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-blue-900 tracking-tighter mb-4">Checkout</h1>
          <p className="text-slate-500 font-medium text-lg italic">Complete your order to bring the Himalayas home.</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Form Section */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 3. Customer Details Form */}
            <section className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white">
              <h3 className="text-3xl font-black text-blue-900 mb-10 flex items-center gap-4">
                <span className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center text-lg">1</span>
                Delivery Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TextField 
                  fullWidth 
                  label="Full Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  variant="outlined" 
                  InputProps={{ className: '!rounded-3xl !bg-slate-50/50' }}
                />
                <TextField 
                  fullWidth 
                  label="Phone Number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                  variant="outlined" 
                  InputProps={{ className: '!rounded-3xl !bg-slate-50/50' }}
                />
                <TextField 
                  fullWidth 
                  label="Email (Optional)" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined" 
                  className="md:col-span-2"
                  InputProps={{ className: '!rounded-3xl !bg-slate-50/50' }}
                />
                <TextField 
                  fullWidth 
                  multiline 
                  rows={3} 
                  label="Complete Address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required 
                  variant="outlined" 
                  className="md:col-span-2"
                  InputProps={{ className: '!rounded-[2.5rem] !bg-slate-50/50' }}
                />
                <TextField 
                  fullWidth 
                  label="City" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required 
                  variant="outlined" 
                  InputProps={{ className: '!rounded-3xl !bg-slate-50/50' }}
                />
                <TextField 
                  fullWidth 
                  label="Pincode" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required 
                  variant="outlined" 
                  InputProps={{ className: '!rounded-3xl !bg-slate-50/50' }}
                />
              </div>
            </section>

            {/* 4. Delivery Options */}
            <section className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white">
              <h3 className="text-3xl font-black text-blue-900 mb-10 flex items-center gap-4">
                <span className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center text-lg">2</span>
                Shipping Method
              </h3>
              <RadioGroup value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${deliveryType === 'standard' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-blue-200'}`}>
                  <FormControlLabel 
                    value="standard" 
                    control={<Radio color="primary" />} 
                    label={
                      <div className="ml-2">
                        <div className="font-black text-blue-900">Standard Delivery</div>
                        <div className="text-sm text-slate-500 font-medium">Free • Within 2-4 hours</div>
                      </div>
                    } 
                  />
                </div>
                <div className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${deliveryType === 'express' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-blue-200'}`}>
                  <FormControlLabel 
                    value="express" 
                    control={<Radio color="primary" />} 
                    label={
                      <div className="ml-2">
                        <div className="font-black text-blue-900">Express Delivery</div>
                        <div className="text-sm text-slate-500 font-medium">+₹20 • Within 45 mins</div>
                      </div>
                    } 
                  />
                </div>
              </RadioGroup>
            </section>

            {/* 5. Payment Method */}
            <section className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white">
              <h3 className="text-3xl font-black text-blue-900 mb-10 flex items-center gap-4">
                <span className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center text-lg">3</span>
                Payment Option
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'cod', name: 'Cash on Delivery', icon: <HiOutlineCash size={24} /> },
                  { id: 'upi', name: 'UPI (Paytm / Google Pay)', icon: <div className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded">UPI</div> },
                  { id: 'card', name: 'Credit / Debit Card', icon: <HiOutlineCreditCard size={24} /> }
                ].map((pm) => (
                  <div 
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${paymentMethod === pm.id ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-blue-200'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Radio checked={paymentMethod === pm.id} color="primary" />
                      <span className="font-black text-blue-900">{pm.name}</span>
                    </div>
                    <div className="text-blue-400">{pm.icon}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 2. Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="bg-white p-10 md:p-14 rounded-[4.5rem] shadow-[0_40px_100px_rgba(30,58,138,0.08)] border border-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-0 opacity-50 translate-x-1/2 -translate-y-1/2" />
               
               <h3 className="text-3xl font-black text-blue-900 mb-10 tracking-tighter relative z-10">Order Summary</h3>
               
               <div className="space-y-6 mb-10 relative z-10">
                  <div className="flex items-center gap-6 group">
                     <div className="w-20 h-20 bg-blue-50 rounded-[2rem] p-3 flex items-center justify-center shadow-inner">
                        <img src={p20l} alt="20L Jar" className="h-full object-contain" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-black text-blue-900 text-lg">20L Premium Jar</h4>
                        <p className="text-slate-400 font-bold text-sm">Qty: 2 Jars</p>
                     </div>
                     <div className="text-xl font-black text-blue-900">₹500</div>
                  </div>
                  <Divider />
               </div>

               {/* 7. Final Price Section */}
               <div className="space-y-5 mb-12 relative z-10">
                  <div className="flex justify-between text-slate-500 font-bold">
                    <span>Subtotal</span>
                    <span>₹500</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-bold">
                    <span>Delivery Charge</span>
                    <span className={deliveryType === 'standard' ? 'text-green-500 font-black' : 'text-blue-600'}>
                      {deliveryType === 'standard' ? 'FREE' : '+₹20'}
                    </span>
                  </div>
                  <Divider className="!my-6" />
                  <div className="flex justify-between items-center text-blue-900">
                    <span className="text-xl font-black uppercase tracking-tighter">Grand Total</span>
                    <span className="text-5xl font-black text-blue-600">₹{deliveryType === 'standard' ? 500 : 520}</span>
                  </div>
               </div>

               {/* 8. Place Order Button */}
               {error && <p className="text-red-500 text-sm font-bold mb-4 text-center">{error}</p>}
               
               <Button 
                type="submit"
                variant="contained" 
                fullWidth
                disabled={loading}
                className="!rounded-full !bg-gradient-to-br !from-blue-900 !to-blue-600 !py-8 !font-black !text-2xl !normal-case !shadow-[0_20px_60px_rgba(30,58,138,0.3)] !mb-10"
               >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
               </Button>

               {/* 10. Trust Badges */}
               <div className="grid grid-cols-3 gap-4 border-t border-slate-50 pt-10">
                  <div className="text-center">
                    <HiOutlineShieldCheck className="mx-auto text-blue-500 mb-2" size={24} />
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Secure</div>
                  </div>
                  <div className="text-center">
                    <HiOutlineTruck className="mx-auto text-blue-500 mb-2" size={24} />
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Safe Delivery</div>
                  </div>
                  <div className="text-center">
                    <HiCheckCircle className="mx-auto text-blue-500 mb-2" size={24} />
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Trusted</div>
                  </div>
               </div>
            </div>

            {/* 11. Help Section */}
            <div className="text-center p-8 bg-blue-50 rounded-[3rem] border border-blue-100 flex items-center justify-center gap-4">
               <HiOutlineSupport className="text-blue-500" size={24} />
               <p className="text-slate-500 font-bold">Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact Support</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
