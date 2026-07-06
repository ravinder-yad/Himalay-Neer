import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { HiArrowRight, HiShieldCheck, HiOutlineSparkles, HiTruck, HiClock, HiPhone, HiStar, HiX } from 'react-icons/hi';
import bottleImg from '../assets/bottle.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroImageUrl = bottleImg;

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>100% Himalayan Source</span>
          </motion.div>

          <h1 className="text-6xl lg:text-8xl font-black text-blue-900 leading-[1.1] mb-8 tracking-tighter">
            Pure From <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 italic font-serif">Himalayas</span>
          </h1>

          <div className="mb-12">
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg font-medium mb-4">
              Experience the crystal-clear freshness of the Himalayas in every drop.
            </p>
            <div className="flex items-center gap-4 text-blue-600 font-black uppercase tracking-[0.3em] text-xs">
              <span>Still Water</span>
              <span className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
              <span>100% Pure & Fresh</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                className="!rounded-full !bg-gradient-to-r !from-blue-900 !to-blue-600 !px-12 !py-5 !text-white !font-black !text-lg !normal-case !shadow-2xl !shadow-blue-900/30"
              >
                Order Now <HiArrowRight className="ml-2" />
              </Button>
            </motion.div>
            <button className="px-10 py-5 rounded-full font-black text-blue-900 border-2 border-blue-900/5 hover:bg-blue-50 transition-all flex items-center gap-2">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative flex justify-center items-center"
        >
          {/* Main Image Container */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center overflow-hidden">
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={heroImageUrl}
              alt="Himalayan Water Bottle"
              className="w-full h-full object-contain z-10 mix-blend-multiply"
            />
          </div>

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-12 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl shadow-blue-900/10 border border-blue-50 z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <HiShieldCheck size={28} />
              </div>
              <div>
                <div className="text-lg font-black text-blue-900">Certified</div>
                <div className="text-xs text-slate-400 uppercase font-black tracking-widest">ISO 9001:2015</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 -left-12 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl shadow-blue-900/10 border border-blue-50 z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400">
                <HiOutlineSparkles size={28} />
              </div>
              <div>
                <div className="text-lg font-black text-blue-900">pH 7.8</div>
                <div className="text-xs text-slate-400 uppercase font-black tracking-widest">NATURAL BALANCE</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-[0] overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-blue-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { title: '100% Pure Water', desc: 'Directly sourced from pristine Himalayan aquifers.', icon: HiShieldCheck, color: 'bg-blue-600' },
    { title: 'Advanced Filtration', desc: 'Multi-stage RO + UV + Ozone processing for safety.', icon: HiOutlineSparkles, color: 'bg-blue-400' },
    { title: 'Natural Minerals', desc: 'Retaining the goodness of calcium and magnesium.', icon: HiShieldCheck, color: 'bg-blue-700' },
    { title: 'Fast Delivery', desc: 'Bringing freshness to your doorstep in 24 hours.', icon: HiTruck, color: 'bg-blue-500' },
  ];

  return (
    <section className="py-32 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6">Why Choose Himalay Neer?</h2>
          <p className="text-slate-500 font-medium">We don't just sell water; we provide a source of life and wellness direct from the mountains.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white transition-all group"
            >
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-blue-900 mb-4">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import p250 from '../assets/p_250.png';
import p500 from '../assets/p_500.png';
import p1l from '../assets/p_1l.png';
import p20l from '../assets/p_20l.png';

const Products = () => {
  const products = [
    { name: '250ml Mini', price: '₹10', size: 'Perfect for Events', img: p250 },
    { name: '500ml Daily', price: '₹20', size: 'Your Daily Hydration', img: p500 },
    { name: '1L Premium', price: '₹40', size: 'Family & Travel', img: p1l },
    { name: '20L Jar', price: '₹80', size: 'Home & Office', img: p20l },
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 w-full leading-[0] overflow-hidden rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-blue-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-6 tracking-tighter">Our Products</h2>
            <p className="text-slate-500 font-medium text-lg">Every drop of Himalay Neer comes in a size that fits your lifestyle perfectly.</p>
          </div>
          <Button variant="outlined" className="!rounded-full !border-2 !border-blue-900 !text-blue-900 !font-black !px-10 !py-4 !normal-case">View All Products</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-[3rem] p-8 group relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest text-blue-400 bg-white px-3 py-1 rounded-full shadow-sm">In Stock</div>
              <div className="h-64 flex items-center justify-center mb-8">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  src={p.img}
                  alt={p.name}
                  className="h-full w-auto object-contain drop-shadow-2xl"
                />
              </div>
              <div className="text-center w-full">
                <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">{p.size}</div>
                <h3 className="text-2xl font-black text-blue-900 mb-4">{p.name}</h3>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
                  <span className="text-2xl font-black text-blue-600">{p.price}</span>
                  <button className="bg-blue-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                    <HiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import storyImg from '../assets/our_story.png';

const AboutShort = () => {
  return (
    <section className="py-32 bg-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square bg-white rounded-[4rem] shadow-2xl overflow-hidden relative group">
            <img src={storyImg} alt="About" className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute inset-0 bg-blue-900/10" />
            <div className="absolute bottom-12 left-12">
              <div className="text-6xl font-black text-blue-900/20">EST. 2024</div>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-8 rounded-full shadow-2xl">
            <div className="text-3xl font-black">100%</div>
            <div className="text-[10px] font-bold tracking-widest uppercase">Organic Mineral</div>
          </div>
        </motion.div>

        <div>
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Our Story</span>
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 leading-tight">Crafted by nature, <br /> delivered by us.</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            Himalay Neer was born from a simple mission: to bring the pristine, untouched mineral-rich water of the Himalayan springs to your city. We believe that everyone deserves access to water as nature intended — pure, balanced, and refreshing.
          </p>
          <Link to="/about">
            <Button variant="contained" className="!rounded-full !bg-blue-900 !px-10 !py-4 !font-black !normal-case">Read Our Full Story</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const PurityProcess = () => {
  const steps = [
    { title: 'Natural Sourcing', desc: 'Water collected from high-altitude springs.', icon: '01' },
    { title: 'Advanced Filtration', desc: 'Ultrafine filtration to remove all impurities.', icon: '02' },
    { title: 'Aseptic Packaging', desc: 'Bottled in a touch-free, sterile environment.', icon: '03' },
  ];

  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">The Purity Process</h2>
          <p className="text-slate-400 max-w-lg mx-auto">See how we preserve the soul of the Himalayas in every bottle we produce.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center justify-between">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-8 items-start lg:flex-1 group">
              <div className="text-8xl font-black text-white/5 group-hover:text-blue-500/20 transition-colors leading-none">{s.icon}</div>
              <div className="pt-4">
                <h3 className="text-2xl font-black mb-4 text-blue-400">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import g1 from '../assets/g1.png';
import g2 from '../assets/g2.png';

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const galleryImages = [g1, g2, g1, g2];

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">Himalayan Moments</h2>
          <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">A glimpse of our purity</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedIndex(i)}
              className="aspect-square bg-slate-100 rounded-[2rem] overflow-hidden relative group cursor-pointer"
            >
              <img src={img} alt="Gallery" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[200] bg-blue-900/95 backdrop-blur-2xl flex items-center justify-center p-6 lg:p-12 cursor-zoom-out"
          >
            {/* Navigation Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-6 lg:left-12 w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[210] border border-white/10 backdrop-blur-md"
            >
              <HiArrowRight className="rotate-180 text-2xl" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-6 lg:right-12 w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[210] border border-white/10 backdrop-blur-md"
            >
              <HiArrowRight className="text-2xl" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img 
                src={galleryImages[selectedIndex]} 
                alt="Full View" 
                className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]" 
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white font-black text-sm tracking-[0.3em] uppercase opacity-60">
                {selectedIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>

            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[210]"
            >
              <HiX size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: 'Rahul Sharma', review: 'The most refreshing water I have ever tasted. Pure and crisp!', rating: 5 },
    { name: 'Anjali Gupta', review: 'Excellent packaging and timely delivery. Highly recommended for office use.', rating: 5 },
    { name: 'Vivek Singh', review: 'Natural minerals you can actually feel. Best water brand in India.', rating: 5 },
  ];

  return (
    <section className="py-32 bg-blue-50 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-20 tracking-tighter">Trusted by 50,000+ Families</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] shadow-xl shadow-blue-900/5 text-left border border-white">
              <div className="flex text-yellow-400 mb-6">
                {[...Array(r.rating)].map((_, idx) => <HiStar key={idx} />)}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">"{r.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{r.name[0]}</div>
                <div className="font-black text-blue-900">{r.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Products />
      <AboutShort />
      <PurityProcess />
      <Gallery />
      <Testimonials />

      {/* Contact CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Order Fresh Himalayan <br /> Water Today</h2>
              <p className="text-blue-100 text-xl mb-12 font-medium opacity-80">Join 50,000+ happy customers who trust Himalay Neer for their daily hydration needs.</p>
              <div className="flex flex-wrap gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="contained" className="!rounded-full !bg-white !text-blue-900 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl">Start Your Order</Button>
                </motion.div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                    <HiPhone size={24} />
                  </div>
                  <div>
                    <div className="text-sm opacity-60 uppercase font-bold tracking-[0.2em]">Call Us Now</div>
                    <div className="text-xl font-black">+91 98765 43210</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
