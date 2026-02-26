import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, ChevronDown, ChevronUp, CheckCircle2, Star, X } from 'lucide-react';

const dummyOrders = [
  {
    id: '#ORD-894231',
    date: 'Today, 2:45 PM',
    status: 'Delivered',
    total: 245.50,
    items: [
      { name: 'Organic Tomatoes', qty: 2, price: 90 },
      { name: 'Whole Wheat Bread', qty: 1, price: 40 },
    ],
  },
  {
    id: '#ORD-894100',
    date: 'Yesterday, 11:30 AM',
    status: 'Delivered',
    total: 540.00,
    items: [
      { name: 'Alphonso Mangoes', qty: 1, price: 450 },
      { name: 'Amul Milk', qty: 2, price: 90 },
    ],
  }
];

const Orders = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState('');
  const [rating, setRating] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  const handleOpenReview = (productName) => {
    setSelectedProductForReview(productName);
    setRating(0);
    setReviewModalOpen(true);
  };

  const submitReview = () => {
    setReviewModalOpen(false);
    setToastMessage(`Review submitted for ${selectedProductForReview}!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-4xl mx-auto w-full pt-4 pb-20"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight leading-none">
            Order History
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest">
            Your recent purchases
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {dummyOrders.map((order, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={order.id}
            className="bg-white border border-slate-100 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <div 
              className="cursor-pointer flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            >
              <div className="flex gap-4 items-start sm:items-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900">{order.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">{order.status}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {order.date}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="line-clamp-1 max-w-[200px] sm:max-w-xs">{order.items.map(img => img.name).join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t border-slate-50 pt-4 sm:pt-0 sm:border-0 mt-2 sm:mt-0">
                <div className="flex flex-col sm:items-end">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total</span>
                  <span className="text-xl font-black text-slate-900 leading-none mt-1">₹{order.total.toFixed(2)}</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${expandedId === order.id ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}>
                  {expandedId === order.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Expandable Order Details */}
            <AnimatePresence>
              {expandedId === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-100 mt-6"
                >
                  <div className="pt-6 space-y-4">
                    <h4 className="font-heading font-bold text-slate-800 text-sm uppercase tracking-wider">Items in this order</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">Qty: {item.qty} • ₹{item.price}</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenReview(item.name); }}
                          className="bg-white border border-primary-200 text-primary-600 text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-primary-50 transition-colors flex items-center gap-1"
                        >
                          <Star className="w-4 h-4" /> Rate Product
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <button className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors">Download Invoice</button>
                    <button className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary-700 transition-colors shadow-primary-600/20">Reorder All</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Rate & Review Modal */}
      <AnimatePresence>
        {reviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900">Rate & Review</h3>
                <button 
                  onClick={() => setReviewModalOpen(false)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-8 flex flex-col items-center">
                <p className="text-slate-500 font-medium text-center mb-6">How was your experience with <br/><span className="font-bold text-slate-900">{selectedProductForReview}</span>?</p>
                
                <div className="flex gap-2 mb-8">
                  {[1,2,3,4,5].map(star => (
                    <button 
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star className={`w-10 h-10 ${rating >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                    </button>
                  ))}
                </div>

                <textarea 
                  placeholder="Write an optional review..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none focus:border-primary-500 focus:bg-white transition-colors h-32 resize-none mb-6"
                ></textarea>

                <button 
                  onClick={submitReview}
                  disabled={rating === 0}
                  className={`w-full h-14 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center transition-all ${rating > 0 ? 'bg-primary-600 text-white shadow-primary-600/30 hover:bg-primary-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  Submit Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Orders;
