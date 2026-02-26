import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Plus, Minus, ChevronDown } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  // Default to first variant if available, otherwise fallback to flat weight/price
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  
  const currentWeight = hasVariants ? product.variants[selectedVariantIdx].weight : product.weight;
  const currentPrice = hasVariants ? product.variants[selectedVariantIdx].price : product.price;

  // We need a unique ID for cart if it has variants, combining product ID and variant weight
  const cartItemId = hasVariants ? `${product.id}-${currentWeight}` : product.id;
  
  // Find item in cart by this unique ID
  const cartItem = items.find(item => item.id === cartItemId);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a modified product object with the selected variant's price/weight and unique ID
    const itemToAdd = {
      ...product,
      id: cartItemId, // important: override id for cart
      originalId: product.id, // keep original for wishlist/routing if needed
      price: currentPrice,
      weight: currentWeight,
      name: hasVariants ? `${product.name} (${currentWeight})` : product.name
    };
    
    addItem(itemToAdd);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(cartItemId, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(cartItemId, quantity - 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  // Generate random stars for dummy feel (safe outside dependency array by using product id hash logic)
  const rating = useMemo(() => {
     // A simple deterministic pseudo-random based on id
     return 4 + (product.id % 2); 
  }, [product.id]);

  return (
    <div className="group flex flex-col bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-600/5 hover:border-primary-100 transition-all duration-300 relative h-full overflow-hidden">
      
      {/* Top Badges & Icons */}
      <div className="flex justify-between items-start mb-3 z-10 relative">
        {product.discount ? (
          <div className="bg-rose-500 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-lg shadow-sm tracking-wider">
            {product.discount}% OFF
          </div>
        ) : <div></div>}
        <button 
          onClick={handleWishlistToggle} 
          className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors z-20"
        >
           <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'fill-transparent'}`} />
        </button>
      </div>

      {/* Image Area */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative w-full aspect-[4/3] mb-4 flex items-center justify-center cursor-pointer bg-slate-100 rounded-[20px] overflow-hidden group-hover:shadow-inner transition-shadow"
      >
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow text-left">
        
        {/* Title */}
        <Link to={`/product/${product.id}`} className="cursor-pointer mb-1 z-10">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight line-clamp-2 min-h-[36px] sm:min-h-[40px] group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-3">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
           ))}
           <span className="text-[10px] font-bold text-slate-400 ml-1">({(rating * 10).toFixed(0)})</span>
        </div>

        {/* Variant Selector */}
        {hasVariants && (
          <div className="w-full relative z-30 mb-4">
            <select 
              value={selectedVariantIdx}
              onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 pl-2 pr-6 sm:px-3 rounded-lg sm:rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.map((variant, idx) => (
                <option key={idx} value={idx}>{variant.weight}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        )}
        
        {!hasVariants && (
           <div className="mb-4">
              <span className="inline-block bg-slate-50 border border-slate-200 text-slate-600 text-[10px] sm:text-xs font-bold py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg sm:rounded-xl">
                {product.weight}
              </span>
           </div>
        )}

        <div className="mt-auto flex items-end justify-between z-20 gap-1">
          {/* Pricing */}
          <div className="flex flex-col min-w-0">
            {product.oldPrice && (
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 line-through truncate">₹{(hasVariants ? (currentPrice * 1.2) : product.oldPrice).toFixed(2)}</span>
            )}
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none truncate">₹{currentPrice.toFixed(0)}</span>
          </div>

          {/* Action Button */}
          <div className="w-[70px] sm:w-[100px] h-[32px] sm:h-[36px] shrink-0">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                 <motion.button 
                   key="add-btn"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={handleAdd}
                   className="w-full h-full bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white font-bold text-xs rounded-xl transition-colors duration-200 shadow-sm border border-primary-100"
                 >
                   Add
                 </motion.button>
              ) : (
                 <motion.div 
                   key="counter"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="w-full h-full flex items-center bg-primary-600 text-white rounded-xl shadow-md overflow-hidden box-border"
                 >
                   <button 
                     onClick={handleDecrement}
                     className="flex-1 h-full flex items-center justify-center hover:bg-primary-700 transition-colors active:bg-primary-800"
                   >
                     <Minus className="w-3.5 h-3.5" />
                   </button>
                   <span className="w-8 text-center font-bold text-xs select-none">
                     {quantity}
                   </span>
                   <button 
                     onClick={handleIncrement}
                     className="flex-1 h-full flex items-center justify-center hover:bg-primary-700 transition-colors active:bg-primary-800"
                   >
                     <Plus className="w-3.5 h-3.5" />
                   </button>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
