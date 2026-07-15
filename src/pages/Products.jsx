import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, IconButton, Badge, Rating } from '@mui/material';
import { HiOutlineShoppingBag, HiPlus, HiMinus, HiX, HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineTruck } from 'react-icons/hi';
import { FiTarget, FiEye } from 'react-icons/fi';
import p250 from '../assets/p_250.png';
import p500 from '../assets/p_500.png';
import p1l from '../assets/p_1l.png';
import p2l from '../assets/p_2l.png';
import p5l from '../assets/p_5l.png';
import p10l from '../assets/p_10l.png';
import p20l from '../assets/p_20l.png';
import pBulk from '../assets/p_bulk.png';
import { fetchProducts } from '../services/api';
import { CircularProgress } from '@mui/material';

// Map backend images/names to local assets
const imageMap = {
  '250ml Mini Bottle': p250,
  '500ml Daily Fresh': p500,
  '1L Family Pack': p1l,
  '2L Fridge Bottle': p2l,
  '5L Party Jar': p5l,
  '10L Standard Jar': p10l,
  '20L Premium Jar': p20l,
  '20L Premium Water Jar': p20l,
  '5L Himalayan Spring Water': p5l,
  'Automatic Water Dispenser': pBulk, // fallback
  'Bulk Case (24 x 500ml)': pBulk,
};

const productsData = [
  { id: 1, name: '250ml Mini Bottle', price: 10, category: 'Bottles', desc: 'Perfect for events and single-use hydration.', rating: 4.8, img: p250, bulk: false },
  { id: 2, name: '500ml Daily Fresh', price: 20, category: 'Bottles', desc: 'Your everyday companion for work and gym.', rating: 4.9, img: p500, bulk: false },
  { id: 3, name: '1L Family Pack', price: 40, category: 'Bottles', desc: 'Ideal for travel and family outings.', rating: 5.0, img: p1l, bulk: false },
  { id: 4, name: '2L Fridge Bottle', price: 60, category: 'Bottles', desc: 'Stay hydrated at home with our premium 2L pack.', rating: 4.7, img: p2l, bulk: false },
  { id: 5, name: '5L Party Jar', price: 120, category: 'Jars', desc: 'Great for small gatherings and house parties.', rating: 4.8, img: p5l, bulk: false },
  { id: 6, name: '10L Standard Jar', price: 180, category: 'Jars', desc: 'Convenient size for small offices and shops.', rating: 4.9, img: p10l, bulk: true },
  { id: 7, name: '20L Premium Jar', price: 250, category: 'Jars', desc: 'Best-selling office and home supply jar.', rating: 5.0, img: p20l, bulk: true },
  { id: 8, name: 'Bulk Case (24 x 500ml)', price: 450, category: 'Bulk', desc: 'Economic bulk pack for events and wholesale.', rating: 4.9, img: pBulk, bulk: true },
];

const Products = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative py-24 overflow-hidden bg-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black text-blue-900 tracking-tighter mb-6"
           >
             Our <span className="text-blue-500 italic">Products</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12"
           >
             Pure Himalayan water in every size you need. From mini bottles to office jars, we have it all.
           </motion.p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="py-12 border-b border-slate-100 sticky top-[100px] bg-white/80 backdrop-blur-xl z-30">
         <div className="container mx-auto px-6 flex flex-wrap justify-center gap-4">
            {['All', 'Bottles', 'Jars', 'Bulk'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                    : 'bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <CircularProgress size={60} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <AnimatePresence mode='popLayout'>
                 {filteredProducts.map((p) => (
                   <motion.div
                     key={p._id}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     whileHover={{ y: -10 }}
                     className="bg-white rounded-[3rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-50 relative group flex flex-col"
                   >
                     {/* Water Drop Badge */}
                     <div className="absolute top-6 right-6 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                        <span className="text-xl font-bold">💧</span>
                     </div>

                     <div className="h-64 flex items-center justify-center mb-8 relative">
                        <motion.img 
                          src={imageMap[p.name] || p20l} 
                          alt={p.name} 
                          className="h-full w-auto object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => setSelectedProduct({ ...p, img: imageMap[p.name] || p20l })}
                             className="bg-blue-900/80 backdrop-blur-md text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-colors"
                           >
                             View Details
                           </button>
                        </div>
                     </div>

                     <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">{p.category}</span>
                           <div className="flex items-center text-yellow-400 text-xs">
                              <Rating value={4.5} precision={0.1} readOnly size="small" />
                           </div>
                        </div>
                        <h3 className="text-xl font-black text-blue-900 mb-4">{p.name}</h3>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                           <span className="text-2xl font-black text-blue-600">₹{p.price}</span>
                           <button 
                             onClick={() => setCartCount(prev => prev + 1)}
                             className="bg-blue-50 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                           >
                             <HiPlus size={20} />
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 5. Why Choose Our Products */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { title: 'Safe Packaging', icon: <HiOutlineShieldCheck size={32}/>, desc: 'BPA-free bottles with aseptic seals.' },
             { title: 'Fresh Source', icon: <HiOutlineSparkles size={32}/>, desc: 'Straight from Himalayan mountain peaks.' },
             { title: 'Mineral Balanced', icon: <FiTarget size={32}/>, desc: 'Preserving the natural goodness of minerals.' },
             { title: 'Affordable', icon: <HiOutlineTruck size={32}/>, desc: 'Premium quality water at everyday prices.' }
           ].map((item, i) => (
             <div key={i} className="text-center p-10 bg-white rounded-[3rem] shadow-xl shadow-blue-900/5">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-100">
                   {item.icon}
                </div>
                <h4 className="text-xl font-black text-blue-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 7. Featured Product Spotlight */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-[5rem] overflow-hidden flex flex-col lg:flex-row items-center relative shadow-2xl">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
               <div className="p-16 lg:p-24 lg:flex-1">
                  <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-8 block">Bestseller of the month</span>
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">20L Premium <br /> Himalayan Jar</h2>
                  <p className="text-blue-100/60 text-lg mb-12 max-w-lg">The perfect choice for offices and large families. Balanced minerals, massive quantity, and delivered at your doorstep within 2 hours.</p>
                  <Button variant="contained" className="!rounded-full !bg-white !text-blue-900 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl">Order Bulk Now</Button>
               </div>
               <div className="lg:flex-1 p-16 flex justify-center relative">
                  <div className="relative group">
                     <motion.div 
                       animate={{ scale: [1, 1.05, 1] }} 
                       transition={{ duration: 4, repeat: Infinity }}
                       className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" 
                     />
                     <img src={p20l} alt="Featured" className="h-[500px] relative z-10 drop-shadow-[0_40px_80px_rgba(59,130,246,0.5)]" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 8. Call To Action */}
      <section className="py-32 bg-white text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-12 tracking-tighter">Order Fresh Himalayneer Today</h2>
            <div className="flex flex-wrap justify-center gap-6">
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="contained" className="!rounded-full !bg-blue-600 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl shadow-blue-600/30">Buy Now</Button>
               </motion.div>
               <button className="flex items-center gap-3 px-10 py-5 rounded-full border-2 border-slate-100 font-black text-blue-900 hover:bg-blue-50 transition-all">
                  Contact Support <HiOutlineArrowRight />
               </button>
            </div>
         </div>
      </section>

      {/* Product Detail Modal (Fake) */}
      <AnimatePresence>
         {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 30 }}
                 animate={{ scale: 1, y: 0 }}
                 exit={{ scale: 0.9, y: 30 }}
                 className="bg-white w-full max-w-5xl rounded-[4rem] overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2"
               >
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-500 hover:text-white transition-all z-10"
                  >
                    <HiX size={24} />
                  </button>

                  <div className="bg-blue-50 p-16 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
                     <img src={selectedProduct.img} alt={selectedProduct.name} className="h-full max-h-[400px] object-contain drop-shadow-[0_30px_60px_rgba(30,58,138,0.3)] relative z-10" />
                  </div>

                  <div className="p-16 flex flex-col">
                     <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{selectedProduct.category}</span>
                     <h2 className="text-4xl font-black text-blue-900 mb-6">{selectedProduct.name}</h2>
                     <div className="flex items-center gap-4 mb-8">
                        <Rating value={selectedProduct.rating} precision={0.1} readOnly />
                        <span className="text-slate-400 font-bold text-sm">(50+ Reviews)</span>
                     </div>
                     <p className="text-slate-500 text-lg leading-relaxed mb-10">{selectedProduct.desc}</p>
                     
                     <div className="text-4xl font-black text-blue-600 mb-10">₹{selectedProduct.price}</div>

                     <div className="mt-auto flex gap-6">
                        <div className="flex items-center bg-slate-100 rounded-full p-2">
                           <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-900 hover:bg-blue-500 hover:text-white transition-all"><HiMinus /></button>
                           <span className="px-8 font-black text-xl">1</span>
                           <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-900 hover:bg-blue-500 hover:text-white transition-all"><HiPlus /></button>
                        </div>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          className="!rounded-full !bg-blue-600 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-xl"
                          onClick={() => {
                            setCartCount(prev => prev + 1);
                            setSelectedProduct(null);
                          }}
                        >
                           Add to Cart
                        </Button>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Cart Button Fixed */}
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-40"
      >
        <button className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(30,58,138,0.5)] border-4 border-white group relative">
           <Badge badgeContent={cartCount} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', fontSize: '14px', width: '24px', height: '24px', borderRadius: '12px' } }}>
             <HiOutlineShoppingBag className="text-3xl group-hover:rotate-12 transition-transform" />
           </Badge>
        </button>
      </motion.div>
    </div>
  );
};

export default Products;
