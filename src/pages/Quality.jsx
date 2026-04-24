import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { HiOutlineBadgeCheck, HiOutlineBeaker, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineTruck, HiStar } from 'react-icons/hi';
import { FiTarget, FiEye, FiDroplet, FiCheckCircle } from 'react-icons/fi';
import qSource from '../assets/q_source.png';
import qLab from '../assets/q_lab.png';
import qPack from '../assets/q_pack.png';

const Quality = () => {
  const steps = [
    { id: '01', title: 'Collection', desc: 'Sourced from natural Himalayan springs.' },
    { id: '02', title: 'Filtration', desc: 'Multi-layer sediment removal.' },
    { id: '03', title: 'RO & UV', desc: 'Advanced microbiological purification.' },
    { id: '04', title: 'Mineralizing', desc: 'Balancing essential minerals for taste.' },
    { id: '05', title: 'Aseptic Filling', desc: 'Untouched by human hands.' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        {/* Bubbles Animation Background */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 800, x: Math.random() * 1000, opacity: 0 }}
            animate={{ 
              y: -200, 
              opacity: [0, 0.4, 0],
              x: (Math.random() * 1000) + (Math.sin(i) * 100)
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2 
            }}
            className="absolute w-24 h-24 bg-blue-200 rounded-full blur-2xl -z-10"
          />
        ))}

        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-20 h-20 bg-white shadow-2xl rounded-3xl flex items-center justify-center mx-auto mb-10 text-blue-500 border border-blue-50"
           >
              <HiOutlineBadgeCheck size={40} />
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black text-blue-900 tracking-tighter mb-6"
           >
             Our Quality <span className="text-blue-500 italic">Promise</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-12 uppercase tracking-widest"
           >
             Pure • Safe • Trusted
           </motion.p>
           <div className="text-blue-900/40 text-sm font-black tracking-[0.3em] uppercase italic">"Every drop tested for perfection"</div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Water Source */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
           >
              <div className="aspect-video bg-blue-50 rounded-[4rem] overflow-hidden shadow-2xl relative group">
                 <img src={qSource} alt="Source" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 bg-blue-900/10" />
                 <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-6 py-3 rounded-full text-blue-900 font-black text-xs uppercase tracking-widest">Natural Origin</div>
              </div>
           </motion.div>
           <div>
              <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Origin Story</span>
              <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 tracking-tighter leading-tight">Sourced From The <br /> Himalayan Heart</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                 Our water begins its journey high in the Himalayan mountain springs, far away from urban pollution. It is naturally filtered through layers of mountain rock, absorbing life-essential minerals along the way.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-6 bg-blue-50 rounded-3xl">
                    <div className="text-2xl font-black text-blue-900 mb-1">Pristine</div>
                    <div className="text-sm text-slate-400">Untouched Environment</div>
                 </div>
                 <div className="p-6 bg-blue-50 rounded-3xl">
                    <div className="text-2xl font-black text-blue-900 mb-1">Natural</div>
                    <div className="text-sm text-slate-400">Spring-Fed Source</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Filtration Process */}
      <section className="py-32 bg-blue-900 text-white relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">The Purity Journey</h2>
               <p className="text-blue-100 opacity-60">How we turn mountain water into your favorite beverage.</p>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between gap-12">
               {/* Connecting Line */}
               <div className="absolute top-12 left-0 w-full h-1 bg-blue-800 hidden md:block -z-0" />
               
               {steps.map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="relative z-10 flex-1 text-center group"
                 >
                    <div className="w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-black border-4 border-blue-900 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-500">
                       {step.id}
                    </div>
                    <h3 className="text-xl font-black mb-4 text-blue-400 tracking-wide uppercase">{step.title}</h3>
                    <p className="text-blue-100/60 text-sm leading-relaxed">{step.desc}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Quality Testing */}
      <section className="py-32">
         <div className="container mx-auto px-6">
            <div className="bg-slate-50 rounded-[5rem] p-16 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center shadow-inner">
               <div>
                  <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 tracking-tighter">100% Laboratory <br /> Tested Purity</h2>
                  <div className="space-y-6">
                     {[
                       { title: 'pH Level Monitoring', desc: 'Maintaining a perfect balance of 7.4 - 7.8 pH.', icon: <HiOutlineBeaker /> },
                       { title: 'TDS Management', desc: 'Controlled Total Dissolved Solids for best taste.', icon: <FiDroplet /> },
                       { title: 'Micro-Check', desc: 'Zero microbiological contamination guarantee.', icon: <HiOutlineShieldCheck /> }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 items-start">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500 shrink-0">
                             {item.icon}
                          </div>
                          <div>
                             <h4 className="font-black text-blue-900 text-lg mb-1">{item.title}</h4>
                             <p className="text-slate-500 text-sm">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
                <div className="relative">
                  <div className="aspect-square bg-white rounded-[4rem] shadow-2xl flex items-center justify-center overflow-hidden group">
                     <img src={qLab} alt="Lab Testing" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" />
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-0 border-[20px] border-blue-50 border-dashed rounded-full scale-110"
                     />
                     <div className="text-center relative z-10">
                        <div className="text-8xl font-black text-blue-600 mb-2">100%</div>
                        <div className="text-blue-900 font-black tracking-[0.3em] uppercase text-xs">Quality Certified</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Quality Stats */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { val: '100%', label: 'Purity Level' },
              { val: '0', label: 'Contamination' },
              { val: '10+', label: 'Daily Quality Checks' }
            ].map((s, i) => (
              <div key={i} className="text-center p-12 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-blue-900/5 group hover:bg-blue-600 transition-all duration-500">
                 <div className="text-6xl font-black text-blue-900 mb-4 group-hover:text-white transition-colors">{s.val}</div>
                 <div className="text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:text-blue-100 transition-colors">{s.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* 8. Packaging Quality */}
      <section className="py-32 bg-blue-50">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-12 tracking-tighter">Safe & Secure Packaging</h2>
            <div className="max-w-4xl mx-auto mb-20 aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative group">
               <img src={qPack} alt="Packaging" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: 'Food Grade Plastic', desc: '100% recyclable, BPA-free material.', icon: <FiCheckCircle /> },
                 { title: 'Tamper Proof Seals', desc: 'Secure capping system for purity.', icon: <FiCheckCircle /> },
                 { title: 'Leak-Proof Design', desc: 'Engineered for safe transportation.', icon: <FiCheckCircle /> }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <div className="text-blue-500 mb-6 text-3xl">{item.icon}</div>
                    <h4 className="text-xl font-black text-blue-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-32">
         <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto bg-blue-900 p-16 lg:p-24 rounded-[4rem] relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_70%)]" />
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Trust Every Drop <br /> You Drink</h2>
                  <p className="text-blue-100 text-xl mb-12 opacity-70">Experience the difference of scientific purity and natural goodness.</p>
                  <Button variant="contained" className="!rounded-full !bg-white !text-blue-900 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl">Order Now</Button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Quality;
