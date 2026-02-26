import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Heart, Share2, ShieldCheck, Truck, RotateCcw, MapPin, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { dummyProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem, updateQuantity } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [activeImage, setActiveImage] = useState(0);

  const product = dummyProducts.find(p => p.id === parseInt(id)) || dummyProducts[0];
  
  // Variant Logic
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  
  const currentWeight = hasVariants ? product.variants[selectedVariantIdx].weight : product.weight;
  const currentPrice = hasVariants ? product.variants[selectedVariantIdx].price : product.price;
  const oldPrice = hasVariants ? (currentPrice * 1.25) : (product.oldPrice || currentPrice * 1.2);
  const discountPercent = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  
  const cartItemId = hasVariants ? `${product.id}-${currentWeight}` : product.id;
  const cartItem = items.find(item => item.id === cartItemId);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  const isWishlisted = isInWishlist(product.id);

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
  
  const handleBuyNow = () => {
    if (quantity === 0) {
      handleAdd();
    }
    navigate('/checkout');
  };

  const images = [
    product.image,
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="max-w-[1400px] mx-auto bg-white min-h-[85vh] font-sans">
      {/* Standard E-commerce Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-slate-500 py-3 px-4 border-b border-slate-200 bg-white">
        <button onClick={() => navigate(-1)} className="hover:text-primary-600 flex items-center">
          <ChevronLeft className="w-4 h-4" /> Back to results
        </button>
        <span>|</span>
        <span className="hover:underline cursor-pointer">{product.category || 'Grocery & Gourmet Foods'}</span>
        <span>›</span>
        <span className="text-slate-900 line-clamp-1">{product.name}</span>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white">
        
        {/* Left: Images (Thumbs + Main) */}
        <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-24 h-fit bg-white">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible hide-scrollbar shrink-0">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onMouseEnter={() => setActiveImage(idx)}
                onClick={() => setActiveImage(idx)}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 ${
                  activeImage === idx ? 'border-primary-500 shadow-md ring-2 ring-primary-500/20' : 'border-slate-100 hover:border-primary-300'
                } overflow-hidden bg-white p-1 transition-all`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Main Stage */}
          <div className="flex-1 relative border border-slate-100 rounded-[24px] overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center p-4 bg-slate-50/50">
            <button 
              onClick={() => toggleItem(product)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors z-10"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'fill-transparent'}`} />
            </button>
            <button 
              onClick={() => alert('Share link copied!')}
              className="absolute top-16 right-4 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors z-10"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <img 
              src={images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-contain max-h-[500px]" 
            />
          </div>
        </div>

        {/* Middle: Product Info */}
        <div className="lg:col-span-4 flex flex-col pt-2 bg-white">
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
              ))}
              <ChevronDown className="w-3 h-3 text-slate-500 ml-1" />
            </div>
            <span className="text-primary-600 hover:text-primary-700 hover:underline cursor-pointer text-sm font-medium">1,492 ratings</span>
          </div>

          {/* Pricing Box */}
          <div className="mb-4">
            <div className="flex items-start gap-4">
              <span className="text-3xl font-light text-rose-600">-{discountPercent}%</span>
              <div className="flex items-start">
                <span className="text-sm font-bold text-slate-900 mt-1 pr-1">₹</span>
                <span className="text-4xl font-black text-slate-900 tracking-tight">{currentPrice.toFixed(0)}</span>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-500 mt-1">
              M.R.P.: <span className="line-through">₹{oldPrice.toFixed(0)}</span>
            </div>
            <div className="text-sm font-bold text-slate-600 mt-1">Inclusive of all taxes</div>
          </div>

          {/* Variants */}
          {hasVariants && (
            <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Size: <span className="text-slate-900">{currentWeight}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedVariantIdx === idx 
                        ? 'border-2 border-primary-500 bg-primary-50 text-primary-700 shadow-sm' 
                        : 'border-2 border-slate-200 hover:bg-white text-slate-600 hover:border-primary-200'
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!hasVariants && (
             <div className="mb-6">
                <p className="text-sm font-medium text-[#0F1111]">Size: <span className="font-bold">{product.weight}</span></p>
             </div>
          )}

          {/* About this item */}
          <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100">
            <h3 className="text-lg font-heading font-black text-slate-900 mb-3">Why choose this?</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 font-medium text-slate-600">
              <li>Farm fresh guaranteed. Carefully handpicked and sorted.</li>
              <li>100% natural, no artificial preservatives added.</li>
              <li>Packed in hygienic conditions to maintain utmost freshness.</li>
              <li>Rich in essential nutrients and dietary fibers.</li>
              <li>Store in a cool, dry place away from direct sunlight.</li>
            </ul>
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="lg:col-span-3 pt-2">
          <div className="border border-slate-100 rounded-[24px] p-5 lg:p-6 sticky top-24 shadow-xl shadow-slate-200/40 bg-white">
            <h3 className="text-3xl font-black text-slate-900 mb-2">₹{currentPrice.toFixed(0)}</h3>
            
            <div className="text-sm font-medium text-slate-600 mb-4 leading-relaxed bg-primary-50 p-3 rounded-xl border border-primary-100">
              <span className="text-primary-600 font-bold">FREE delivery</span> <span className="font-bold text-slate-900">Tomorrow, 8 AM - 10 AM</span> on orders dispatched by PK SuperMart over ₹500
            </div>
            
            <div className="flex items-center gap-2 text-sm font-medium text-primary-600 mb-5 bg-slate-50 p-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-primary-50 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Deliver to Arshad - Bengaluru 560037</span>
            </div>
            
            <h4 className="text-lg font-black text-emerald-500 mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> In stock
            </h4>

            <div className="space-y-3 mb-6">
              {quantity === 0 ? (
                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl text-sm font-bold text-primary-700 shadow-sm transition-all"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="w-full flex items-center justify-between bg-primary-600 rounded-xl border border-primary-700 px-1 py-1 shadow-lg shadow-primary-600/20">
                  <button 
                    onClick={() => updateQuantity(cartItemId, quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-white">{quantity} in Cart</span>
                  <button 
                    onClick={() => updateQuantity(cartItemId, quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              )}
              
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 border border-primary-700 rounded-xl text-base font-bold text-white shadow-xl shadow-primary-600/30 transition-all active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 uppercase tracking-widest">Secure transaction</span>
              </div>

              <table className="text-xs font-medium text-slate-500 w-full border-separate border-spacing-y-1.5">
                <tbody>
                  <tr>
                    <td className="w-24">Ships from</td>
                    <td className="text-slate-900 font-bold bg-white px-2 py-1 rounded">PK SuperMart</td>
                  </tr>
                  <tr>
                    <td>Sold by</td>
                    <td className="text-slate-900 font-bold bg-white px-2 py-1 rounded">PK SuperMart</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <button className="w-full py-3 text-sm font-bold bg-white border-2 border-slate-100 rounded-xl shadow-sm hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-colors flex justify-center items-center gap-2">
              <Heart className="w-4 h-4" /> Add to Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
