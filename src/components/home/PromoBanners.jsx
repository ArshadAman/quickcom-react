import React from 'react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const PromoBanners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-8">
      {/* Banner 1: Blue */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#60A5FA] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[160px] shadow-sm"
      >
        <div className="relative z-10 w-2/3">
          <h3 className="text-lg font-heading font-bold text-white leading-tight mb-1">
            Creamy Fruits baby Jem
          </h3>
          <div className="text-sm text-blue-100 mb-1">Only</div>
          <div className="text-xl font-bold text-white mb-3">$12.99</div>
          <Link to="/search?q=baby" className="inline-block bg-white text-blue-600 font-bold px-5 py-2 rounded-full text-[10px] shadow-sm hover:bg-gray-50 transition-colors w-max mt-1">
            Shop Now
          </Link>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1628048698715-dd06815349e5?auto=format&fit=crop&w=200&q=80" 
          alt="Baby Food" 
          className="absolute -bottom-4 right-0 w-[120px] object-contain drop-shadow-xl brightness-110" 
        />
      </motion.div>

      {/* Banner 2: Yellow */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#D4E839] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[160px] shadow-sm"
      >
        <div className="relative z-10 w-2/3">
          <h3 className="text-lg font-heading font-bold text-gray-900 leading-tight mb-1">
            Organic Fruits
          </h3>
          <div className="text-xs font-medium text-gray-700 mb-1">100% Organic</div>
          <div className="flex items-center gap-2 mb-3">
             <span className="text-sm text-gray-600">Only</span>
             <span className="text-xl font-bold text-gray-900">$14.99</span>
          </div>
          <button className="bg-white text-gray-900 font-bold px-5 py-2 rounded-full text-[10px] shadow-sm hover:bg-gray-50 transition-colors w-max">
            Shop Now
          </button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80" 
          alt="Fruits" 
          className="absolute -bottom-2 -right-4 w-[160px] object-contain drop-shadow-xl" 
        />
      </motion.div>

      {/* Banner 3: Purple */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#D9A8F5] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-center min-h-[160px] shadow-sm"
      >
        <div className="relative z-10 w-2/3 flex flex-col h-full">
          <h3 className="text-lg font-heading font-bold text-gray-900 leading-tight mb-1">
            Kids Car Toys
          </h3>
          <div className="text-xs font-medium text-purple-800 mb-1">2023 Collections</div>
          <div className="flex items-center gap-2 mb-3 mt-auto">
             <span className="text-sm text-purple-900">Only</span>
             <span className="text-xl font-bold text-gray-900">$5.99</span>
          </div>
          <button className="bg-white text-gray-900 font-bold px-5 py-2 rounded-full text-[10px] shadow-sm hover:bg-gray-50 transition-colors w-max">
            Shop Now
          </button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=200&q=80" 
          alt="Toys" 
          className="absolute top-4 -right-2 w-[140px] object-contain drop-shadow-xl saturate-150" 
        />
      </motion.div>
    </div>
  );
};

export default PromoBanners;
