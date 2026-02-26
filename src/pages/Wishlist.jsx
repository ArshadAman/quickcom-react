import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import ProductSection from '../components/home/ProductSection';
import { useWishlistStore } from '../store/useWishlistStore';

const Wishlist = () => {
  const { items } = useWishlistStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-20 w-full"
    >
      <div className="flex flex-col mb-10 border-b border-slate-100 pb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
          <div className="bg-rose-50 p-2 rounded-xl text-rose-500">
             <Heart className="w-6 h-6 fill-current" />
          </div>
          My Wishlist
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          {items.length === 0 ? "Your wishlist is empty." : `You have ${items.length} items saved.`}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="w-full">
          <ProductSection products={items} />
        </div>
      ) : (
        <div className="w-full bg-slate-50 rounded-3xl p-12 text-center flex flex-col items-center justify-center border border-slate-100">
           <Heart className="w-16 h-16 text-slate-300 mb-4" />
           <h2 className="text-xl font-bold text-slate-700 mb-2">Nothing to see here</h2>
           <p className="text-slate-500 max-w-sm">
             Tap the heart icon on any product card to save it here for later.
           </p>
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
