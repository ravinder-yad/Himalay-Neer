import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock, HiChevronDown, HiOutlineCheckCircle, HiX } from 'react-icons/hi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logoImg from '../assets/logo.png';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfos = [
    { title: 'Our Address', val: 'Himalayan Spring Valley, Solan, HP - 173212', icon: <HiOutlineLocationMarker size={28}/> },
    { title: 'Phone Number', val: '+91 98765 43210', icon: <HiOutlinePhone size={28}/> },
    { title: 'Email Address', val: 'Himalayneer.com@gmail.com', icon: <HiOutlineMail size={28}/> },
    { title: 'Working Hours', val: 'Mon - Sun: 8 AM to 9 PM', icon: <HiOutlineClock size={28}/> },
  ];

  const faqs = [
    { q: 'What is the delivery time?', a: 'We deliver within 2-4 hours of order placement in most cities.' },
    { q: 'How can I place a bulk order?', a: 'You can use the bulk order form or call us directly for special pricing.' },
    { q: 'What payment options are available?', a: 'We accept COD, UPI, Credit/Debit cards, and Net Banking.' },
    { q: 'Is the water 100% natural?', a: 'Yes, it is sourced from natural springs and goes through zero-contact filtration.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative py-24 bg-blue-50/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black text-blue-900 tracking-tighter mb-6"
           >
             Contact <span className="text-blue-500 italic">Us</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto"
           >
             We're here to help you. Get in touch for orders, bulk inquiries, or support.
           </motion.p>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Contact Info Cards */}
      <section className="py-24">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfos.map((info, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-50 text-center flex flex-col items-center"
              >
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                    {info.icon}
                 </div>
                 <h3 className="text-xl font-black text-blue-900 mb-2">{info.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">{info.val}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 3. Contact Form & Socials */}
      <section className="py-24 bg-slate-50/50">
         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
               <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Send a message</span>
               <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 tracking-tighter">Have A Question? <br /> Write To Us</h2>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <TextField fullWidth label="Your Name" variant="outlined" className="!bg-white !rounded-3xl" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.5rem' } }} required />
                     <TextField fullWidth label="Phone Number" variant="outlined" className="!bg-white !rounded-3xl" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.5rem' } }} required />
                  </div>
                  <TextField fullWidth label="Email Address" variant="outlined" className="!bg-white !rounded-3xl" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.5rem' } }} required />
                  <TextField fullWidth label="Your Message" variant="outlined" multiline rows={4} className="!bg-white !rounded-3xl" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.5rem' } }} required />
                  <Button type="submit" variant="contained" className="!rounded-full !bg-blue-600 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl shadow-blue-600/30">Send Message</Button>
               </form>

               {/* Success Message */}
               <AnimatePresence>
                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0 }}
                      className="mt-8 p-6 bg-green-50 border border-green-100 rounded-3xl flex items-center gap-4 text-green-700"
                    >
                       <HiOutlineCheckCircle size={32} />
                       <div>
                          <div className="font-black">Message Sent Successfully!</div>
                          <div className="text-sm">We will get back to you within 24 hours.</div>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>

            <div className="flex flex-col justify-center">
               <div className="bg-blue-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-4xl font-black mb-8 relative z-10">Follow Our <br /> Purity Journey</h3>
                  <p className="text-blue-100/60 text-lg mb-12 relative z-10">Join our social family to see where your water comes from and get daily health tips.</p>
                  
                  <div className="flex flex-wrap gap-4 relative z-10">
                     {[
                       { icon: <FaInstagram />, link: '#', color: 'bg-[#E1306C]', label: 'Instagram' },
                       { icon: <FaFacebook />, link: '#', color: 'bg-[#1877F2]', label: 'Facebook' },
                       { icon: <FaWhatsapp />, link: '#', color: 'bg-[#25D366]', label: 'WhatsApp' },
                       { icon: <HiOutlinePhone />, link: '#', color: 'bg-blue-500', label: 'Call' }
                     ].map((social, i) => (
                       <motion.a 
                         key={i} 
                         href={social.link} 
                         whileHover={{ scale: 1.1, y: -5 }}
                         className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl group hover:bg-white transition-all duration-500"
                       >
                          <div className={`w-12 h-12 ${social.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-black/20 text-white group-hover:scale-110 transition-transform`}>
                             {social.icon}
                          </div>
                          <div className="pr-4">
                             <div className="text-[10px] font-black uppercase tracking-widest text-blue-200 group-hover:text-blue-900 transition-colors">Follow</div>
                             <div className="text-sm font-black text-white group-hover:text-blue-600 transition-colors">{social.label}</div>
                          </div>
                       </motion.a>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Map Section */}
      <section className="py-24">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-blue-900 mb-12">Visit Our Main Office</h2>
            <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[500px] bg-slate-100 border-8 border-white">
               {/* Replace with real Google Map Embed if needed */}
               <iframe 
                 title="map"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110123.456789!2d77.08!3d30.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDU0JzM2LjAiTiA3N8KwMDQnNDguMCJF!5e0!3m2!1sen!2sin!4v123456789" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy"
               />
            </div>
         </div>
      </section>

      {/* 5. Delivery Areas */}
      <section className="py-32 bg-blue-900 text-white relative">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight">Delivering Freshness <br /> Across North India</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
               {['Chandigarh', 'Ludhiana', 'Amritsar', 'Solan', 'Shimla', 'Jalandhar', 'Panchkula', 'Mohali'].map((city) => (
                 <span key={city} className="px-8 py-3 bg-white/10 rounded-full font-black text-sm uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all cursor-default">
                    {city}
                 </span>
               ))}
            </div>
         </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-black text-blue-900 mb-4 tracking-tighter">Frequently Asked Questions</h2>
               <p className="text-slate-400">Quick answers to common inquiries.</p>
            </div>
            <div className="space-y-4">
               {faqs.map((f, i) => (
                 <Accordion key={i} className="!rounded-3xl !shadow-none !border !border-slate-100 overflow-hidden before:hidden">
                    <AccordionSummary expandIcon={<HiChevronDown className="text-blue-500" />} className="!px-8 !py-4">
                       <div className="font-black text-blue-900">{f.q}</div>
                    </AccordionSummary>
                    <AccordionDetails className="!px-8 !pb-6 text-slate-500 leading-relaxed">
                       {f.a}
                    </AccordionDetails>
                 </Accordion>
               ))}
            </div>
         </div>
      </section>

      {/* 7. Quick CTA */}
      <section className="py-24 bg-white text-center">
         <div className="container mx-auto px-6">
            <div className="bg-blue-600 p-16 lg:p-24 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/water.png')] opacity-10" />
               <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Need Water Urgently?</h2>
               <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium">For emergency supplies or event bulk orders, give us a direct call.</p>
               <div className="flex flex-wrap justify-center gap-6">
                  <Button variant="contained" className="!rounded-full !bg-white !text-blue-900 !px-12 !py-5 !font-black !text-lg !normal-case !shadow-2xl">Order Now</Button>
                  <button className="flex items-center gap-4 px-10 py-5 rounded-full bg-blue-700 font-black text-white hover:bg-blue-800 transition-all">
                     <HiOutlinePhone /> Call Support
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;
