import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { dummyProducts } from '../../data/products';

const FREE_DELIVERY_THRESHOLD = 500;

const CartSidebar = () => {
  const { isOpen, closeCart, items, getTotalPrice, updateQuantity, addItem } = useCartStore();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const totalPrice = getTotalPrice();
  const progressPercent = Math.min((totalPrice / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remainingForFree = Math.max(FREE_DELIVERY_THRESHOLD - totalPrice, 0);

  // Simple cross-sells logic: pick 2 items not in cart
  const cartIds = items.map(i => i.id);
  const suggestedItems = dummyProducts.filter(p => !cartIds.includes(p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-all"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-slate-50 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 bg-white z-20 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-50 w-10 h-10 rounded-full flex items-center justify-center border border-primary-100">
                    <ShoppingBag className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-heading font-black text-xl text-slate-900 leading-none">Your Cart</h2>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{items.length} unique items</p>
                  </div>
                </div>
                <button 
                  onClick={closeCart}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              {items.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wider">
                      <Truck className="w-3.5 h-3.5 text-primary-600" /> 
                      {remainingForFree > 0 ? `Add ₹${remainingForFree.toFixed(2)} for Free Delivery` : 'You unlocked Free Delivery!'}
                    </span>
                    <span className="text-[11px] font-black text-slate-900">₹{FREE_DELIVERY_THRESHOLD}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full ${progressPercent === 100 ? 'bg-emerald-500' : 'bg-primary-500'} rounded-full`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto w-full hide-scrollbar flex flex-col relative z-0">
              {items.length === 0 ? (
                /* Empty State */
                <div className="flex-[0.8] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                    <ShoppingBag className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-slate-900 mb-2">Cart is empty</h3>
                  <p className="text-slate-500 font-medium max-w-[250px] leading-relaxed">
                    Looks like you haven't added any fresh groceries to your cart yet.
                  </p>
                </div>
              ) : (
                /* Cart Items */
                <div className="p-4 sm:p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: 20 }}
                      key={item.id} 
                      className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 relative group"
                    >
                      {/* Delete Button (appears on hover) */}
                      <button 
                        onClick={() => updateQuantity(item.id, 0)}
                        className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-rose-500 border border-slate-100 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>

                      <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col py-1">
                        <h4 className="font-bold text-sm text-slate-800 line-clamp-2 leading-tight pr-4">{item.name}</h4>
                        <span className="text-[10px] font-medium text-slate-400 mt-1 mb-auto">{item.weight}</span>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-slate-900 text-base">₹{item.price}</span>
                          
                          {/* Quantity Controls - Custom Style */}
                          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 rounded-lg shadow-sm transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-black text-slate-900">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 rounded-lg shadow-sm transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Cross-Sells Section */}
                  {suggestedItems.length > 0 && (
                    <div className="pt-6 pb-2">
                      <h4 className="font-heading font-bold text-sm text-slate-600 mb-3 uppercase tracking-wider">Before you checkout</h4>
                      <div className="space-y-3">
                        {suggestedItems.map(suggest => (
                          <div key={suggest.id} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden">
                               <img src={suggest.image} className="w-full h-full object-cover" alt=""/>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-slate-800 line-clamp-1">{suggest.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">₹{suggest.price}</p>
                            </div>
                            <button 
                              onClick={() => addItem(suggest)}
                              className="bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors mr-1 cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Floating Checkout Footer */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 bg-white border-t border-slate-200 z-20 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.08)]">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Subtotal</span>
                  <div className="flex items-end gap-2">
                     <span className="font-black text-slate-900 text-2xl leading-none tracking-tighter">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-xl shadow-primary-600/30 flex items-center justify-between px-6 group transition-all active:scale-[0.98]"
                >
                  <span className="text-lg">Checkout</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                     <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
