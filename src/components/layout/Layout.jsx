import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';
import { useCartStore } from '../../store/useCartStore';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const Layout = ({ children }) => {
  const { items, getTotalPrice, openCart } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-500 selection:text-white relative">
      <Header />
      
      {/* Main Content Area - Wider for Freshly Theme */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-8">
        {children}
      </main>
      
      <Footer />
      <CartSidebar />

      {/* Mobile Floating Cart Trigger */}
      {items.length > 0 && (
        <div className="fixed sm:hidden bottom-4 left-4 right-4 z-40 animate-bounce-subtle">
          <div 
            onClick={openCart}
            className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-slate-900/30 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative border border-slate-700 p-2 rounded-xl bg-slate-800">
                <ShoppingBag className="w-5 h-5" />
                <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                  {items.length}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none mb-1">Total</span>
                <span className="text-sm font-bold leading-none">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 font-bold text-sm bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
              View Cart
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
