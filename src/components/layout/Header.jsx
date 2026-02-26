import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, Package, LogOut } from 'lucide-react';
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

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
            <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-primary-600 tracking-tighter">
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
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            
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
              className="flex items-center gap-3 ml-2 sm:ml-4 bg-slate-900 text-white pl-3 pr-4 py-2 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 active:scale-95"
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
            <button className="lg:hidden text-slate-600 hover:text-primary-600 ml-2 w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
              <Menu className="w-5 h-5" />
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

    </header>
  );
};

export default Header;
