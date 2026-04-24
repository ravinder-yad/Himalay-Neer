import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { HiLightningBolt, HiShieldCheck, HiStar, HiPhone, HiChevronRight, HiOutlineLocationMarker, HiOutlineSparkles, HiOutlineShieldCheck } from 'react-icons/hi';
import { FiTarget, FiEye, FiDroplet } from 'react-icons/fi';
import Logo from '../components/Logo';
import aboutPurityImg from '../assets/about_purity.png';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Cities Covered', value: '15+' },
    { label: 'Quality Tests', value: '100+' },
    { label: 'Natural Minerals', value: '10+' },
  ];

  const team = [
    { name: 'Aditya Vardhan', role: 'Founder & CEO', img: null },
    { name: 'Sonal Gupta', role: 'Operations Head', img: null },
    { name: 'Dr. Karan Mehra', role: 'Quality Specialist', img: null },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-900">
          <div className="w-full h-full flex items-center justify-center opacity-10 blur-sm scale-150">
            <Logo variant="light" className="w-[500px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-slate-900/90" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            Get to know us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6"
          >
            About <span className="text-blue-400 italic">Himalay Neer</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-70"
          >
            Pure Water Inspired by Nature, Crafted for Your Wellness.
          </motion.p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-blue-50 rounded-[4rem] overflow-hidden">
              <img src={aboutPurityImg} alt="Who We Are" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-blue-50">
              <div className="text-4xl font-black text-blue-900">100%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pure Sourced</div>
            </div>
          </motion.div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 tracking-tighter leading-tight">Bringing Purity <br /> To Your Doorstep</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Himalay Neer is not just a water brand; it is a commitment to health and purity. We believe that water is the most essential element of life, and it should be consumed in its most natural and pristine form.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Our journey started with a simple idea: to bridge the gap between the untouched springs of the Himalayas and the modern urban lifestyle. Every bottle we produce is a testament to our dedication to quality.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <HiShieldCheck size={24} />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-bold border-l border-slate-200 pl-4 ml-4">
                <HiLightningBolt size={24} />
                <span>Natural Minerals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story (Premium Vertical Timeline) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative Water Drops */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse" />

        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              The Evolution
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter">Our Brand Journey</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-blue-400 to-blue-100 hidden md:block -translate-x-1/2" />

            <div className="space-y-24">
              {[
                {
                  year: '2022',
                  title: 'The Himalayan Vision',
                  desc: 'Our founder discovered the untouched springs of the upper Himalayas. The dream was to bring this purity to the world without changing its essence.',
                  side: 'left'
                },
                {
                  year: '2023',
                  title: 'Building The Core',
                  desc: 'We established our zero-contact filtration plant at an altitude of 3,000 meters, ensuring every drop is bottled right at the source.',
                  side: 'right'
                },
                {
                  year: '2024',
                  title: 'Rising Nationally',
                  desc: 'From a local favorite to a national brand, Himalay Neer is now hydrating thousands of families and offices across 15+ cities.',
                  side: 'left'
                }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full"
                  >
                    <div className={`p-10 rounded-[3rem] bg-white shadow-2xl shadow-blue-900/5 border border-white relative ${item.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="text-blue-500 font-black text-5xl mb-4">{item.year}</div>
                      <h3 className="text-2xl font-black text-blue-900 mb-4">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm lg:text-base">{item.desc}</p>
                    </div>
                  </motion.div>

                  {/* Center Dot */}
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-xl shadow-blue-600/50"
                    />
                  </div>

                  {/* Empty space for balance */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-900 p-16 rounded-[4rem] text-white group hover:bg-blue-800 transition-all duration-500 shadow-2xl">
            <FiTarget size={60} className="mb-8 text-blue-400 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black mb-6">Our Mission</h3>
            <p className="text-blue-100 text-lg leading-relaxed opacity-80">
              To provide the purest, mineral-balanced Himalayan spring water to every household, ensuring health and vitality through nature's finest gift.
            </p>
          </div>
          <div className="bg-white border-4 border-blue-900 p-16 rounded-[4rem] text-blue-900 group hover:bg-blue-50 transition-all duration-500 shadow-2xl">
            <FiEye size={60} className="mb-8 text-blue-600 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black mb-6">Our Vision</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              To become India's most trusted and sustainable water brand, setting the gold standard for purity and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The Purity Flow (High-Fidelity Icon Flow) */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        {/* Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              Our Process
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">The Purity Flow</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Scientific precision meets natural goodness in our state-of-the-art filtration journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { title: 'Source', desc: 'Directly from Himalayan springs.', icon: <HiOutlineLocationMarker size={32} /> },
              { title: 'Filtration', desc: 'Multi-stage RO + UV purification.', icon: <HiOutlineSparkles size={32} /> },
              { title: 'Mineralizing', desc: 'Preserving essential minerals.', icon: <FiDroplet size={32} /> },
              { title: 'Packaging', desc: 'Aseptic touch-free bottling.', icon: <HiOutlineShieldCheck size={32} /> },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all duration-500 backdrop-blur-sm h-full flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-blue-600/20 text-blue-400 rounded-3xl flex items-center justify-center mb-8 border border-blue-500/30 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                     {step.icon}
                   </div>
                   <h4 className="text-xl font-black text-white mb-4 tracking-wide uppercase">{step.title}</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {/* Arrow Connector (Desktop Only) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 text-blue-500/30 group-hover:text-blue-500 transition-colors">
                     <HiChevronRight size={40} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stats Section (Premium Floating Cards) */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Happy Customers', value: '10k+', icon: <HiStar className="text-yellow-400" /> },
                { label: 'Cities Covered', value: '15+', icon: <HiOutlineLocationMarker className="text-blue-500" /> },
                { label: 'Quality Tests', value: '100+', icon: <HiOutlineShieldCheck className="text-green-500" /> },
                { label: 'Natural Minerals', value: '10+', icon: <FiDroplet className="text-blue-400" /> },
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-50 text-center group hover:bg-blue-600 transition-all duration-500"
                >
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                      {s.icon}
                   </div>
                   <div className="text-4xl md:text-5xl font-black text-blue-900 mb-2 group-hover:text-white transition-colors">{s.value}</div>
                   <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] group-hover:text-blue-100 transition-colors">{s.label}</div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. Meet The Team (High-Fidelity Profiles) */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              The Visionaries
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter">Meet The Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: 'Aditya Vardhan', role: 'Founder & CEO', img: null, bio: 'Visionary behind the purity mission.' },
              { name: 'Sonal Gupta', role: 'Operations Head', img: null, bio: 'Ensuring seamless delivery across India.' },
              { name: 'Dr. Karan Mehra', role: 'Quality Specialist', img: null, bio: 'Maintaining the scientific standards of gold-level purity.' },
            ].map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className="relative group"
              >
                <div className="bg-white rounded-[4rem] p-10 shadow-2xl shadow-blue-900/5 text-center flex flex-col items-center">
                   <div className="w-48 h-48 bg-blue-50 rounded-[3rem] overflow-hidden mb-8 border-4 border-white shadow-xl relative group-hover:border-blue-500 transition-all duration-500 flex items-center justify-center">
                      {m.img ? (
                        <img src={m.img} alt={m.name} className="w-full h-full object-contain p-8 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                      ) : (
                        <Logo variant="dark" className="h-20 opacity-20" />
                      )}
                      {/* Social Overlay */}
                      <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"><HiStar /></div>
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"><HiPhone /></div>
                      </div>
                   </div>
                   <h4 className="text-2xl font-black text-blue-900 mb-2">{m.name}</h4>
                   <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                      {m.role}
                   </span>
                   <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">{m.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Call To Action */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-16 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Experience Pure Water Today</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">Start your journey to better health with the most refreshing water India has to offer.</p>
              <Button variant="contained" className="!rounded-full !bg-blue-600 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl hover:!bg-blue-500 transition-colors">Order Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
