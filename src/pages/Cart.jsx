import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, IconButton, TextField, Divider } from '@mui/material';
import { 
  HiOutlineShoppingBag, 
  HiPlus, 
  HiMinus, 
  HiX, 
  HiOutlineArrowRight, 
  HiOutlineShieldCheck, 
  HiOutlineTruck,
  HiOutlineSupport
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

// Import images (using the ones we generated)
import p500 from '../assets/p_500.png';
import p1l from '../assets/p_1l.png';
import p20l from '../assets/p_20l.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '500ml Daily Fresh', price: 20, quantity: 12, img: p500 },
    { id: 2, name: '1L Family Pack', price: 40, quantity: 6, img: p1l },
    { id: 3, name: '20L Premium Jar', price: 250, quantity: 2, img: p20l },
  ]);

  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + delivery - (discountApplied ? 100 : 0);

  const handleCheckout = () => {
    setOrderSuccess(true);
    setCartItems([]);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8"
        >
          <HiOutlineShieldCheck size={64} />
        </motion.div>
        <h2 className="text-4xl font-black text-blue-900 mb-4 tracking-tighter">Order Placed Successfully! 💧</h2>
        <p className="text-slate-500 text-lg mb-10 max-w-md">Your fresh Himalayan water is on its way. You'll receive an SMS update shortly.</p>
        <Link to="/">
          <Button variant="contained" className="!rounded-full !bg-blue-600 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mb-8">
          <HiOutlineShoppingBag size={64} />
        </div>
        <h2 className="text-4xl font-black text-blue-900 mb-4 tracking-tighter">Your cart is empty</h2>
        <p className="text-slate-500 text-lg mb-10">Add some purity to your cart to stay hydrated.</p>
        <Link to="/products">
          <Button variant="contained" className="!rounded-full !bg-blue-600 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl">
            Shop Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6">
        {/* 1. Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter mb-2">Your Cart</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Review your order and stay fresh</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 2. Cart Items Section */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 md:p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center gap-8 relative border border-white"
                >
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <HiX size={20} />
                  </button>

                  <div className="w-32 h-32 bg-blue-50 rounded-3xl p-4 flex items-center justify-center shrink-0">
                    <img src={item.img} alt={item.name} className="h-full object-contain drop-shadow-xl" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-blue-900 mb-2">{item.name}</h3>
                    <div className="text-blue-600 font-bold text-lg mb-4">₹{item.price}</div>
                    
                    {/* 3. Quantity Control */}
                    <div className="inline-flex items-center bg-slate-50 rounded-full p-2 border border-slate-100">
                      <IconButton onClick={() => updateQuantity(item.id, -1)} className="!text-blue-900 hover:!bg-white shadow-sm">
                        <HiMinus size={16} />
                      </IconButton>
                      <span className="px-6 font-black text-lg">{item.quantity}</span>
                      <IconButton onClick={() => updateQuantity(item.id, 1)} className="!text-blue-900 hover:!bg-white shadow-sm">
                        <HiPlus size={16} />
                      </IconButton>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Total</div>
                    <div className="text-3xl font-black text-blue-900">₹{item.price * item.quantity}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* 10. Support Line */}
            <div className="p-8 bg-blue-900 rounded-[3rem] text-white flex items-center justify-between overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-1 flex items-center gap-2">
                  <HiOutlineSupport /> Need Help?
                </h4>
                <p className="text-blue-100 opacity-70 text-sm">Our hydration experts are here for you.</p>
              </div>
              <Button className="!rounded-full !bg-white !text-blue-900 !px-8 !py-3 !font-black !normal-case !text-sm relative z-10">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Sidebar: 4. Order Summary */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white p-10 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-white">
              <h3 className="text-2xl font-black text-blue-900 mb-8 tracking-tighter">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Delivery Charge</span>
                  <span className={delivery === 0 ? 'text-green-500 font-black' : ''}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-500 font-bold">
                    <span>Discount (WELCOME100)</span>
                    <span>-₹100</span>
                  </div>
                )}
                <Divider className="!my-6" />
                <div className="flex justify-between items-center text-blue-900">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-4xl font-black">₹{total}</span>
                </div>
              </div>

              {/* 5. Coupon Section */}
              <div className="mb-8">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter coupon" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-400 transition-all text-sm font-bold"
                  />
                  <Button 
                    onClick={() => {
                      if (coupon.toUpperCase() === 'WELCOME100') setDiscountApplied(true);
                      setCoupon('');
                    }}
                    className="!rounded-2xl !bg-blue-50 !text-blue-600 !px-6 !font-black !normal-case"
                  >
                    Apply
                  </Button>
                </div>
                {!discountApplied && (
                  <p className="text-[10px] text-blue-400 font-black mt-3 uppercase tracking-widest">Use code: WELCOME100</p>
                )}
              </div>

              {/* 6. Delivery Info */}
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                  <HiOutlineTruck className="text-blue-500" />
                  <span>Delivery within 2 hours</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                  <HiOutlineShieldCheck className="text-green-500" />
                  <span>100% Secure Payment</span>
                </div>
              </div>

              {/* 7. Checkout Button */}
              <Link to="/checkout" className="block w-full">
                <Button 
                  variant="contained" 
                  fullWidth
                  className="!rounded-full !bg-gradient-to-r !from-blue-900 !to-blue-600 !py-6 !font-black !text-xl !normal-case !shadow-2xl !shadow-blue-900/30"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>

            {/* 9. Recommended Products (Pro) */}
            <div className="p-8 bg-blue-50 rounded-[3rem] border border-blue-100">
               <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-6">You may also like</h4>
               <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center shadow-sm">
                     <img src={p1l} alt="1L" className="h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-blue-900 font-black text-sm group-hover:text-blue-600 transition-colors">1L Premium Bottle</div>
                    <div className="text-blue-500 font-bold text-xs">₹40</div>
                  </div>
                  <HiOutlineArrowRight className="ml-auto text-blue-300 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
