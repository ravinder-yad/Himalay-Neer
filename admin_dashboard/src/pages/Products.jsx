import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconButton, 
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Chip
} from '@mui/material';
import { 
  HiOutlineTrash, 
  HiOutlineCube, 
  HiOutlinePlus,
  HiOutlineUpload,
  HiOutlineRefresh,
  HiOutlineCloudUpload,
  HiOutlineSearch
} from 'react-icons/hi';
import { fetchProducts, addProduct as createProduct, deleteProduct } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Water Bottle',
    description: '',
    stock: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('description', newProduct.description);
    formData.append('stock', newProduct.stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      await createProduct(formData);
      setOpen(false);
      setNewProduct({ name: '', price: '', category: 'Water Bottle', description: '', stock: '' });
      setImage(null);
      setImagePreview(null);
      getProducts();
    } catch (error) {
      alert("Failed to create product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Move this product to archives?")) {
      try {
        await deleteProduct(id);
        getProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 lg:p-16 bg-white min-h-screen">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20">
        <div>
           <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Inventory Matrix</div>
           <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
             Product <span className="text-blue-600">Vault</span>
           </h2>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Strategic resource management</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
           <div className="relative flex-1 md:w-80">
              <input 
                 type="text" 
                 placeholder="Search assets..." 
                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           </div>

           <Button 
             onClick={() => setOpen(true)}
             variant="contained"
             startIcon={<HiOutlinePlus />}
             className="!bg-blue-600 !rounded-2xl !py-4 !px-8 !font-black !text-[10px] !uppercase !tracking-widest !shadow-2xl !shadow-blue-600/30 hover:!scale-105 transition-all"
           >
             New Asset
           </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <CircularProgress className="!text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          <AnimatePresence>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-[3rem] border border-slate-100 hover:border-blue-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.02)] transition-all flex flex-col overflow-hidden"
              >
                <div className="relative h-64 bg-slate-50 overflow-hidden">
                   <img 
                      src={product.image ? `http://localhost:5000/${product.image}` : 'https://via.placeholder.com/400x400?text=No+Image'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute top-6 right-6">
                      <Chip 
                        label={product.stock > 10 ? 'In Stock' : 'Low Stock'} 
                        size="small"
                        className={`!font-black !text-[8px] !uppercase !tracking-widest !px-3 !py-4 !rounded-xl ${
                           product.stock > 10 ? '!bg-white/90 !backdrop-blur-md !text-green-600' : '!bg-red-500 !text-white'
                        }`}
                      />
                   </div>
                   <div className="absolute bottom-6 left-6">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">
                         {product.category}
                      </span>
                   </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                   <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                   <p className="text-xs text-slate-400 font-medium line-clamp-2 mb-6">{product.description}</p>
                   
                   <div className="mt-auto flex items-end justify-between">
                      <div>
                         <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Asset Value</div>
                         <div className="text-2xl font-black text-slate-900">₹{product.price}</div>
                      </div>
                      <div className="text-right">
                         <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Stock Level</div>
                         <div className="text-sm font-black text-slate-700">{product.stock} Units</div>
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-2">
                      <IconButton className="!bg-white !text-slate-400 hover:!text-blue-600 shadow-sm">
                         <HiOutlineRefresh size={18} />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(product._id)}
                        className="!bg-white !text-slate-400 hover:!text-red-600 shadow-sm"
                      >
                         <HiOutlineTrash size={18} />
                      </IconButton>
                   </div>
                   <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                      View Audit Log →
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "!rounded-[2.5rem] !shadow-2xl !bg-white",
          sx: { m: 2, maxHeight: 'calc(100% - 64px)' }
        }}
      >
        <div className="p-8 lg:p-12 overflow-y-auto custom-scrollbar">
           <DialogTitle className="!p-0 !mb-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                    <HiOutlineCube size={24} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Register Asset</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory Intelligence Suite</p>
                 </div>
              </div>
           </DialogTitle>
           
           <DialogContent className="!p-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Name</label>
                    <input 
                       type="text"
                       placeholder="e.g. 20L Premium Mineral"
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                       value={newProduct.name}
                       onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inventory Class</label>
                    <select 
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all appearance-none cursor-pointer"
                       value={newProduct.category}
                       onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                       {['Water Bottle', 'Dispenser', 'Service', 'Other'].map((option) => (
                         <option key={option} value={option}>{option}</option>
                       ))}
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Valuation</label>
                    <div className="relative">
                       <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">₹</span>
                       <input 
                          type="number"
                          placeholder="0.00"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-10 pr-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Opening Stock</label>
                    <input 
                       type="number"
                       placeholder="0"
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                       value={newProduct.stock}
                       onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Functional Description</label>
                 <textarea 
                    rows={2}
                    placeholder="Describe asset specifications..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all resize-none"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Visualization</label>
                 <div className="relative h-44 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center overflow-hidden group hover:border-blue-400 hover:bg-blue-50/10 transition-all cursor-pointer">
                    {imagePreview ? (
                      <div className="relative w-full h-full p-3">
                         <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-[1.2rem]" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <span className="text-white font-black uppercase text-[8px] tracking-widest px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">Replace Visual</span>
                         </div>
                      </div>
                    ) : (
                      <div className="text-center group-hover:scale-105 transition-transform">
                         <HiOutlineCloudUpload size={32} className="text-blue-600 mx-auto mb-2" />
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Drop or click to upload</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                 </div>
              </div>
           </DialogContent>

           <DialogActions className="!p-0 !mt-12 flex gap-4">
              <button 
               onClick={() => setOpen(false)}
               className="flex-1 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest text-[9px]"
              >
                Discard
              </button>
              <button 
               onClick={handleSubmit}
               className="flex-[2] py-4 rounded-2xl bg-blue-600 font-black text-white shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[9px]"
              >
                Push to Matrix
              </button>
           </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Products;
