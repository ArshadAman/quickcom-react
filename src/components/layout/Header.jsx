import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, Package, LogOut, X, Home, LayoutGrid, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';

const Header = () => {
  const navigate = useNavigate();
  const { openCart, getTotalItems, getTotalPrice } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { isAuthenticated, openAuthModal, user } = useAuthStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full bg-white flex flex-col">
      {/* 1. Top Promo Bar */}
      <div className="w-full bg-primary-600 text-white py-2 text-center text-[10px] sm:text-xs font-bold tracking-widest uppercase">
        PK SuperMart Exclusive • FREE delivery on your first order!
      </div>

      {/* 2. Main Header (Logo, Clean Search, Icons) */}
      <div className="w-full py-4 sm:py-6 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <span className="font-heading font-black text-xl sm:text-3xl lg:text-4xl text-primary-600 tracking-tighter truncate max-w-[140px] sm:max-w-none">
              PK SuperMart<span className="text-secondary-500">.</span>
            </span>
          </Link>

          {/* Clean Dedicated Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-2xl items-center border-2 border-slate-100 rounded-full bg-slate-50 h-12 relative transition-all focus-within:border-primary-500 focus-within:bg-white focus-within:shadow-md mx-8"
          >
            <div className="pl-5 text-slate-400">
               <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for groceries, fast..."
              className="flex-1 h-full px-4 outline-none text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent"
            />
            <button type="submit" className="h-full px-8 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-r-full text-sm transition-colors border-2 border-transparent">
               Search
            </button>
          </form>

          {/* Action Icons Panel */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-auto lg:ml-0">
            
            {isAuthenticated ? (
               <Link to="/account" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-700 bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:text-primary-600 transition-all font-bold text-xs">
                 <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-black">
                   {user?.name?.charAt(0) || 'P'}
                 </div>
                 <span>Account</span>
               </Link>
            ) : (
               <button onClick={openAuthModal} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-white bg-slate-900 shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-all font-bold text-sm">
                 <User className="w-4 h-4" />
                 <span>Login</span>
               </button>
            )}
            
            <Link to="/orders" className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 hover:text-primary-600 transition-all">
              <Package className="w-5 h-5" />
            </Link>
            
            <Link to="/wishlist" className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-slate-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 hover:text-rose-500 transition-all relative">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            {/* Cart Button - PK Style */}
            <button 
              onClick={openCart}
              className="flex items-center gap-3 bg-slate-900 text-white pl-2 pr-3 sm:pl-3 sm:pr-4 py-1.5 sm:py-2 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 active:scale-95"
            >
              <div className="relative bg-white/20 p-2 rounded-xl">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                 <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-none mb-1">My Cart</span>
                 <span className="font-bold text-sm leading-none">₹{totalPrice.toFixed(2)}</span>
              </div>
            </button>

            {/* Mobile Hamburger Layout */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-600 hover:text-primary-600 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100 shrink-0"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Only visible on small screens below header) */}
      <form onSubmit={handleSearch} className="lg:hidden px-4 pb-4">
         <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full h-12 px-2 shadow-sm focus-within:border-primary-500 focus-within:bg-white transition-all">
            <div className="pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." 
              className="flex-1 outline-none text-sm font-medium bg-transparent px-3" 
            />
            <button type="submit" className="bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded-full h-8">Go</button>
         </div>
      </form>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80vw] sm:w-[320px] max-w-[320px] bg-slate-50 shadow-2xl z-[100] flex flex-col overflow-hidden lg:hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
                <span className="font-heading font-black text-xl text-primary-600 tracking-tighter">
                  PK Menu<span className="text-secondary-500">.</span>
                </span>
                <button 
                  onClick={closeMobileMenu}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-100 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Nav Items */}
              <div className="flex-1 overflow-y-auto w-full p-4 space-y-2">
                
                {isAuthenticated && (
                  <div className="bg-primary-50 rounded-2xl p-4 mb-4 border border-primary-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {user?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{user?.name || 'PK Shopper'}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Verified Customer</p>
                    </div>
                  </div>
                )}

                <Link onClick={closeMobileMenu} to="/" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 text-slate-500 p-2 rounded-xl"><Home className="w-5 h-5" /></div>
                    <span className="font-bold text-slate-700">Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                <Link onClick={closeMobileMenu} to="/" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 text-slate-500 p-2 rounded-xl"><LayoutGrid className="w-5 h-5" /></div>
                    <span className="font-bold text-slate-700">Categories</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                <Link onClick={closeMobileMenu} to="/orders" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 text-slate-500 p-2 rounded-xl"><Package className="w-5 h-5" /></div>
                    <span className="font-bold text-slate-700">My Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                <Link onClick={closeMobileMenu} to="/wishlist" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-50 text-slate-500 p-2 rounded-xl"><Heart className="w-5 h-5" /></div>
                    <span className="font-bold text-slate-700">Wishlist</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {isAuthenticated ? (
                  <Link onClick={closeMobileMenu} to="/account" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 text-slate-500 p-2 rounded-xl"><User className="w-5 h-5" /></div>
                      <span className="font-bold text-slate-700">Account Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </Link>
                ) : (
                  <button 
                    onClick={() => { closeMobileMenu(); openAuthModal(); }}
                    className="w-full flex items-center justify-between p-4 bg-primary-600 text-white rounded-2xl shadow-md shadow-primary-600/20 active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-xl"><User className="w-5 h-5" /></div>
                      <span className="font-bold">Login / Sign Up</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                )}

              </div>
              
              {/* Bottom Actions */}
              <div className="p-4 bg-white border-t border-slate-200">
                <button 
                  onClick={() => { closeMobileMenu(); openCart(); }}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <ShoppingCart className="w-5 h-5" /> 
                  View Cart <div className="ml-2 bg-primary-500 text-[10px] px-2 py-0.5 rounded-full">{totalItems}</div>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Header;
