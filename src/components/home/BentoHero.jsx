import React from 'react';
import { motion } from 'framer-motion';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BentoHero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 h-auto lg:h-[480px]">
      
      {/* 1. Main Large Banner (Left) */}
      <motion.div 
        whileHover={{ scale: 0.99 }}
        className="lg:col-span-8 bg-gradient-to-br from-[#c084fc] to-primary-600 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px] lg:min-h-0 shadow-sm"
      >
        {/* Decorative Circle */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[140%] bg-primary-400/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        
        <div className="relative z-10 max-w-sm">
          <span className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            100% Farm Fresh Food
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-[1.1] tracking-tight mb-2 drop-shadow-md">
            Fresh Organic
          </h1>
          <p className="text-lg text-primary-100 font-medium mb-6">Food For All</p>
          
          <div className="text-5xl font-heading font-black text-white mb-8 drop-shadow-sm">
            $59.00
          </div>
          
          <Link to="/category/1" className="inline-block bg-primary-800 text-white text-center font-bold px-8 py-3.5 rounded-full hover:bg-slate-900 transition-colors shadow-lg shadow-primary-900/40 w-max text-sm">
            Shop Now
          </Link>
        </div>
        
        {/* Floating Product Image */}
        <motion.img 
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80" 
          alt="Fresh Organic Produce" 
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[55%] md:w-[45%] h-[120%] object-cover rounded-[40px] md:rounded-full border-[8px] sm:border-[16px] border-white/10 shadow-2xl opacity-90 grayscale-[0.1]" 
        />
      </motion.div>

      {/* Right Side Stacked Banners */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Top Banner - Blue */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="flex-1 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[220px] shadow-sm"
        >
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight mb-2 top-shadow-sm">
              Creamy Fruits baby Jem
            </h3>
            <div className="text-sm text-blue-100 mb-1">Only</div>
            <div className="text-2xl font-bold text-white mb-4">$12.99</div>
            <Link to="/search?q=baby" className="inline-block bg-white text-blue-600 font-bold px-6 py-2 rounded-full text-xs shadow-md hover:bg-gray-50 transition-colors mt-2">
              Shop Now
            </Link>
          </div>
          
          <img 
            src="https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=300&q=80" 
            alt="Baby Food" 
            className="absolute -bottom-2 -right-2 w-[140px] sm:w-[160px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] object-cover rounded-full drop-shadow-2xl border-4 border-white/20" 
          />
        </motion.div>

        {/* Bottom Banners Row (Split) */}
        <div className="flex-1 flex gap-6">
          {/* Bottom Left - Cyan */}
          <motion.div 
            whileHover={{ scale: 0.96 }}
            className="flex-1 bg-gradient-to-br from-[#22d3ee] to-[#06b6d4] rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div className="relative z-10">
               <h4 className="text-sm font-heading font-bold text-white leading-tight mb-1">New Baby Diaper</h4>
               <span className="text-[9px] text-cyan-100 font-medium tracking-wide uppercase">Top Quality Product</span>
            </div>
            
            <Link to="/search?q=diaper" className="inline-block bg-cyan-900 text-white text-center font-bold px-4 py-1.5 rounded-full text-[10px] shadow-md hover:bg-slate-900 transition-colors w-max mt-16 z-10">
              Shop Now
            </Link>
            <img 
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=200&q=80" 
              alt="Baby Product" 
              className="absolute -bottom-4 -right-4 w-28 sm:w-36 h-28 sm:h-36 object-cover rounded-full drop-shadow-xl border-4 border-white/20 opacity-95" 
            />
          </motion.div>

          {/* Bottom Right - Pink/Purple Badge style */}
          <motion.div 
            whileHover={{ scale: 0.96 }}
            className="flex-1 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-3xl p-5 relative overflow-hidden flex flex-col items-center text-center shadow-sm border border-gray-100"
          >
             <h4 className="text-xs font-heading font-bold text-gray-800 leading-tight mb-1 w-full truncate">Dark wash FaceWash</h4>
             <span className="text-[9px] text-gray-400 font-medium">All Fixed Size</span>
             
             <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex flex-col items-center justify-center font-bold shadow-lg shadow-rose-500/30 my-3 z-10 rotate-12">
               <span className="text-sm leading-none">15%</span>
               <span className="text-[8px] leading-none">OFF</span>
             </div>

             <Link to="/search?q=facewash" className="inline-block bg-white border border-gray-200 text-gray-700 text-center font-bold px-4 py-1.5 rounded-full text-[10px] shadow-sm hover:bg-gray-50 transition-colors w-max z-10">
              Shop Now
            </Link>
             
            <img 
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80" 
              alt="Face Wash" 
              className="absolute -bottom-2 -right-4 w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-full drop-shadow-lg opacity-90 border-4 border-white text-clip" 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BentoHero;
