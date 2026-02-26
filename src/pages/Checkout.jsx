import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Navigation, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const dummyAddresses = [
  {
    id: 1,
    type: 'Home',
    name: 'Arshad Aman',
    flat: 'A-401, Platinum Tower',
    area: 'Marathahalli Outer Ring Road',
    landmark: 'Behind Park Plaza Hotel',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560037',
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    type: 'Work',
    name: 'Arshad Aman',
    flat: 'WeWork Galaxy, 4th Floor',
    area: 'Residency Road',
    landmark: 'Opposite Ritz Carlton',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560025',
    phone: '+91 98765 43210'
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Address Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCurrentLocation = () => {
    // Mock getting current location
    setFormData({
      ...formData,
      pincode: '560103',
      area: 'Bellandur Main Road',
      city: 'Bengaluru',
      state: 'Karnataka'
    });
  };

  const handlePayNow = () => {
    if (!selectedAddress && !showNewAddressForm) {
      alert("Please select or add a delivery address.");
      return;
    }
    if (showNewAddressForm && (!formData.pincode || !formData.flat || !formData.area)) {
      alert("Please fill in the required address fields.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Clear cart on success
      clearCart();

      // Redirect out after animation
      setTimeout(() => {
        navigate('/orders'); // Realistically, navigate to an order success page or orders list
      }, 3500);
      
    }, 2000);
  };

  // Redirect if cart is empty and not processing
  useEffect(() => {
    if (items.length === 0 && !isProcessing && !paymentSuccess) {
       navigate('/');
    }
  }, [items, navigate, isProcessing, paymentSuccess]);

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-primary-600 z-[100] flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-black/20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <CheckCircle2 className="w-16 h-16 text-primary-500" />
          </motion.div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white text-4xl sm:text-5xl font-heading font-black mb-4 text-center"
        >
          Payment Successful!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-primary-100 text-lg font-medium"
        >
          Your groceries are being packed.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-6 pb-24 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 pr-0.5" />
        </button>
        <h1 className="text-2xl font-heading font-black text-slate-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Address & Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Delivery Address Section */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 className="text-lg font-heading font-black text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-500" />
              Delivery Address
            </h2>

            {/* Saved Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {dummyAddresses.map((addr) => (
                <div 
                  key={addr.id}
                  onClick={() => { setSelectedAddress(addr.id); setShowNewAddressForm(false); }}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                    selectedAddress === addr.id && !showNewAddressForm
                      ? 'border-primary-500 bg-primary-50 ring-4 ring-primary-500/10' 
                      : 'border-slate-100 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {addr.type}
                    </span>
                    {selectedAddress === addr.id && !showNewAddressForm && (
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                    )}
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{addr.name}</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    {addr.flat}, {addr.area}<br/>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>

            {/* Add New Address Toggle */}
            <button 
              onClick={() => { setShowNewAddressForm(true); setSelectedAddress(null); }}
              className={`w-full py-4 rounded-2xl border-2 border-dashed font-bold text-sm transition-all ${
                showNewAddressForm 
                  ? 'border-primary-500 text-primary-600 bg-primary-50' 
                  : 'border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-500'
              }`}
            >
              + Add New Address
            </button>

            {/* New Address Form (Indian Format) */}
            <AnimatePresence>
              {showNewAddressForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-4">
                    <button 
                      onClick={handleCurrentLocation}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      <Navigation className="w-4 h-4" /> Use Current Location
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Mobile Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Pincode*</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="6 digits" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Flat, House no., Building, Company, Apartment*</label>
                      <input type="text" name="flat" value={formData.flat} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Area, Street, Sector, Village*</label>
                      <input type="text" name="area" value={formData.area} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Landmark</label>
                        <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="E.g. near apollo hospital" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Town/City*</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column - Order Summary & Payment */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-100 sticky top-24">
            
            <h2 className="text-lg font-heading font-black text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 hide-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-black text-slate-900">₹{(item.quantity * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Delivery Fee</span>
                {totalPrice >= 500 ? (
                  <span className="text-emerald-500 font-bold">FREE</span>
                ) : (
                  <span>₹40.00</span>
                )}
              </div>
              <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-100">
                <span>Total</span>
                <span>₹{(totalPrice >= 500 ? totalPrice : totalPrice + 40).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-xl shadow-primary-600/30 font-heading text-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Pay Now
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold">100% Secure Payment</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
