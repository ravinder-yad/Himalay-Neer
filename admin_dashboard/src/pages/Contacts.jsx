import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar
} from '@mui/material';
import { 
  HiOutlineMail, 
  HiOutlineTrash, 
  HiOutlineCheckCircle,
  HiOutlineChatAlt2,
  HiOutlineRefresh,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineMailOpen
} from 'react-icons/hi';
import { fetchContacts, updateContactStatus, deleteContact } from '../services/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  const getContacts = async () => {
    setLoading(true);
    try {
      const data = await fetchContacts();
      setContacts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateContactStatus(id, { status });
      getContacts();
    } catch (error) {
      alert("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Archive this communication?")) {
      try {
        await deleteContact(id);
        getContacts();
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20">
        <div>
           <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Communication Hub</div>
           <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
             Inquiry <span className="text-blue-600">Wall</span>
           </h2>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active feedback stream</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
           <button 
             onClick={getContacts}
             className="flex items-center gap-3 px-8 py-4 bg-slate-900 rounded-2xl font-black text-white hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 transition-all uppercase tracking-widest text-[10px]"
           >
             <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={18} />
             Refresh Stream
           </button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
           <CircularProgress size={60} thickness={5} className="!text-blue-600 mb-6" />
           <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Retrieving Communications...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence>
            {contacts.map((contact, i) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 hover:border-blue-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.02)] transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-10">
                   <Avatar className="!w-16 !h-16 !bg-blue-50 !text-blue-600 !font-black !rounded-2xl !text-xl shadow-inner group-hover:scale-110 transition-transform">
                      {contact.name.charAt(0)}
                   </Avatar>
                   <div className="text-right">
                      <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Priority</div>
                      <Chip 
                        label={contact.status === 'New' ? 'Unread' : 'Processed'} 
                        size="small" 
                        className={`!font-black !text-[8px] !uppercase !tracking-widest ${
                           contact.status === 'New' ? '!bg-blue-500 !text-white' : '!bg-slate-100 !text-slate-400'
                        }`} 
                      />
                   </div>
                </div>

                <div className="flex-1">
                   <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{contact.name}</h3>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                      <HiOutlineMail className="text-blue-400" />
                      {contact.email}
                   </div>

                   <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50/30 transition-colors mb-8">
                      <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Subject Matter</div>
                      <h4 className="text-lg font-black text-slate-800 leading-tight mb-4">{contact.subject}</h4>
                      <p className="text-slate-500 text-xs font-medium line-clamp-2 italic leading-relaxed">
                         "{contact.message}"
                      </p>
                   </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                      <HiOutlineClock className="text-blue-300" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                   </div>
                   <div className="flex gap-2">
                      <Tooltip title="Examine Intel">
                         <IconButton 
                           onClick={() => {
                             setSelectedContact(contact);
                             handleStatusUpdate(contact._id, 'Read');
                           }}
                           className="!bg-white !text-slate-400 hover:!text-blue-600 shadow-sm border border-slate-100"
                         >
                            <HiOutlineChatAlt2 size={18} />
                         </IconButton>
                      </Tooltip>
                      <Tooltip title="Archive">
                         <IconButton 
                           onClick={() => handleDelete(contact._id)}
                           className="!bg-white !text-slate-400 hover:!text-red-600 shadow-sm border border-slate-100"
                         >
                            <HiOutlineTrash size={18} />
                         </IconButton>
                      </Tooltip>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Message Command Center Modal */}
      <Dialog 
        open={!!selectedContact} 
        onClose={() => setSelectedContact(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "!rounded-[3.5rem] !p-12 !shadow-2xl !bg-white",
        }}
      >
        {selectedContact && (
          <div className="custom-scrollbar">
            <DialogTitle className="!p-0 !mb-10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                     <HiOutlineShieldCheck size={24} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Inquiry Intelligence</h3>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Digital Audit Log</p>
                  </div>
               </div>
            </DialogTitle>
            
            <DialogContent className="!p-0 space-y-10">
               <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-4">
                     <Avatar className="!w-12 !h-12 !bg-white !text-blue-600 !font-black !rounded-xl shadow-sm border border-slate-100">
                        {selectedContact.name.charAt(0)}
                     </Avatar>
                     <div>
                        <div className="text-sm font-black text-slate-900">{selectedContact.name}</div>
                        <div className="text-[10px] font-bold text-slate-400">{selectedContact.email}</div>
                     </div>
                  </div>
                  <Chip 
                    label="Verified Sender" 
                    icon={<HiOutlineShieldCheck className="!text-blue-600" />}
                    className="!bg-blue-50 !text-blue-600 !font-black !text-[8px] !uppercase !tracking-widest !px-2"
                  />
               </div>

               <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4">Communication Payload</div>
                  <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 text-slate-700 font-bold italic leading-loose text-sm">
                     <div className="text-blue-600 font-black text-lg mb-4 not-italic">Re: {selectedContact.subject}</div>
                     "{selectedContact.message}"
                  </div>
               </div>

               <div className="flex items-center gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="flex-1">
                     <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Receipt Date</div>
                     <div className="text-xs font-black text-slate-700">{new Date(selectedContact.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="flex-1">
                     <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Stream Status</div>
                     <div className="text-xs font-black text-blue-600">Processed & Indexed</div>
                  </div>
               </div>
            </DialogContent>

            <div className="mt-12 flex gap-4">
               <button 
                onClick={() => setSelectedContact(null)}
                className="flex-1 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest text-[9px]"
               >
                 Close Audit
               </button>
               <button 
                onClick={() => {
                   window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`;
                }}
                className="flex-[2] py-4 rounded-2xl bg-blue-600 font-black text-white shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[9px] flex items-center justify-center gap-2"
               >
                 <HiOutlineMailOpen size={16} />
                 Initiate Response
               </button>
            </div>
          </div>
        )}
      </Dialog>

      {contacts.length === 0 && !loading && (
        <div className="text-center py-40">
           <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center text-6xl mx-auto mb-10 shadow-inner grayscale opacity-50 text-slate-300">✉️</div>
           <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Inbox Synchronized</h3>
           <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">All communications are archived</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;
