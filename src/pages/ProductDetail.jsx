import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Heart, Share2, ShieldCheck, Truck, RotateCcw, Plus, Minus, Leaf, Droplets, Zap, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { dummyProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem, updateQuantity, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [activeImage, setActiveImage] = useState(0);

  const product = dummyProducts.find(p => p.id === parseInt(id)) || dummyProducts[0];
  
  // Variant Logic
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  
  const currentWeight = hasVariants ? product.variants[selectedVariantIdx].weight : product.weight;
  const currentPrice = hasVariants ? product.variants[selectedVariantIdx].price : product.price;
  
  const cartItemId = hasVariants ? `${product.id}-${currentWeight}` : product.id;
  const cartItem = items.find(item => item.id === cartItemId);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  const isWishlisted = isInWishlist(product.id);

  const handleIncrement = () => updateQuantity(cartItemId, quantity + 1);
  const handleDecrement = () => updateQuantity(cartItemId, quantity - 1);

  const handleAdd = () => {
    const itemToAdd = {
      ...product,
      id: cartItemId,
      originalId: product.id,
      price: currentPrice,
      weight: currentWeight,
      name: hasVariants ? `${product.name} (${currentWeight})` : product.name
    };
    addItem(itemToAdd);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
         await navigator.share({
           title: product.name,
           text: `Check out this fresh ${product.name} at PK SuperMart!`,
           url: window.location.href,
         });
      } catch (error) {
         console.log('Error sharing', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Mock multiple images for better visual feel
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden relative w-full mb-12"
    >
      {/* Immersive Top Nav */}
      <div className="flex items-center justify-between p-6 absolute top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center text-slate-800 shadow-md border border-white/50 hover:bg-white hover:scale-105 transition-all pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6 ml-[-2px]" />
        </button>
        <div className="flex items-center gap-3 pointer-events-auto">
          <button 
            onClick={() => toggleItem(product)}
            className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-md border border-white/50 hover:bg-white hover:scale-105 transition-all group"
          >
            <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600 group-hover:text-rose-500'}`} />
          </button>
          <button 
            onClick={handleShare}
            className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center text-slate-600 shadow-md border border-white/50 hover:bg-white hover:scale-105 transition-all group"
          >
            <Share2 className="w-6 h-6 group-hover:text-blue-500" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[85vh]">
        {/* Left: Standard Image Showcase */}
        <div className="w-full lg:w-[50%] xl:w-[55%] relative flex flex-col items-center justify-center bg-zinc-50/50 p-6 sm:p-10 lg:p-12 border-r border-slate-100">
          
          {/* Main Stage - Balanced Container */}
          <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 bg-white">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </AnimatePresence>
            
            {product.discount && (
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute top-6 left-6 z-10 bg-rose-500 text-white text-base font-black px-4 py-2 rounded-xl shadow-lg shadow-rose-500/20"
              >
                -{product.discount}% OFF
              </motion.div>
            )}
          </div>

          {/* Dots/Thumbnails */}
          <div className="flex gap-4 mt-8 z-10">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 rounded-2xl overflow-hidden border-2 bg-white transition-all ${
                  activeImage === idx ? 'border-primary-500 scale-110 shadow-md ring-2 ring-primary-500/20' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Immersive Product Info Panel */}
        <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col p-8 lg:p-12 xl:p-16 bg-white relative">
          <div className="flex-grow">
            {/* Tagline & Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-100">
                {product.category || 'Premium'}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <Leaf className="w-3 h-3" /> Organic Source
              </span>
            </div>

            {/* Title Block */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 leading-[1.1] mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl font-medium mb-8">
              Hand-picked and organically sourced from our finest farms. Guaranteed fresh delivery to your door in exactly 10 minutes.
            </p>

            {/* Variant Selector */}
            {hasVariants && (
              <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                <h4 className="text-sm font-bold text-slate-900 mb-3 font-heading uppercase tracking-wider">Select Amount</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                        selectedVariantIdx === idx 
                          ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-black text-sm">{v.weight}</span>
                      <span className="text-xs font-medium opacity-80 mt-1">₹{v.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {!hasVariants && (
              <div className="mb-8">
                <span className="inline-block bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold py-2 px-4 rounded-xl">
                  Fixed Size: {product.weight}
                </span>
              </div>
            )}
            
            {/* Specs Bento Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 text-blue-500 border border-slate-50">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Hydration</p>
                  <p className="text-base font-bold text-slate-900">85% Water</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 text-amber-500 border border-slate-50">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
                  <p className="text-base font-bold text-slate-900">120 kcal</p>
                </div>
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="flex items-center gap-4 p-4 rounded-3xl border border-slate-100 bg-white shadow-sm mb-10">
              <div className="flex items-center justify-center bg-slate-900 text-white w-14 h-14 rounded-2xl font-black text-xl shadow-lg">
                4.8
              </div>
              <div>
                <div className="flex text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-medium text-slate-500">Based on <span className="text-slate-900 font-bold underline cursor-pointer">842 verified reviews</span></p>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Action Panel */}
          <div className="mt-auto border-t border-slate-100 pt-8 flex flex-col space-y-6">
            
            {/* Price Frame */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Price</p>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">₹{currentPrice.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-xl font-bold text-slate-300 line-through mb-1 block">₹{(hasVariants ? (currentPrice * 1.2) : product.oldPrice).toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Cart Button */}
            <div className="w-full">
              {quantity === 0 ? (
                <motion.button 
                  whileHover={{ scale: 1.01, backgroundColor: '#6d28d9' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className="w-full h-[72px] bg-primary-600 text-white font-bold py-4 rounded-[24px] shadow-xl shadow-primary-600/30 text-xl flex items-center justify-center gap-3 transition-colors"
                >
                  Add to Cart
                </motion.button>
              ) : (
                <div className="flex gap-4 h-[72px]">
                  {/* Plus/Minus Controller */}
                  <div className="flex-[0.4] bg-slate-50 rounded-[24px] p-2 flex items-center justify-between border border-slate-200">
                    <button 
                      onClick={handleDecrement}
                      className="w-14 h-14 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-[18px] shadow-sm transition-all active:scale-95 border border-transparent hover:border-slate-100"
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <span className="font-black text-2xl text-slate-900">{quantity}</span>
                    <button 
                      onClick={handleIncrement}
                      className="w-14 h-14 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-[18px] shadow-sm transition-all active:scale-95 border border-transparent hover:border-slate-100"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* View Cart Callout */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCart}
                    className="flex-[0.6] bg-slate-900 text-white font-bold rounded-[24px] shadow-xl shadow-slate-900/20 text-xl flex items-center justify-center border border-slate-800"
                  >
                    View Cart
                  </motion.button>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold">100% Secure</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-2 text-slate-500">
                <RotateCcw className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-bold">Easy Returns</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
