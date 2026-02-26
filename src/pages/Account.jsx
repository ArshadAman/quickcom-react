import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Settings, LogOut, Package, CreditCard, Bell, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, openAuthModal } = useAuthStore();

  useEffect(() => {
    // If user is not authenticated, we could redirect them to Home, or show auth modal
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-20 w-full"
    >
      <div className="flex flex-col mb-10 border-b border-slate-100 pb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-900">
          My Account
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your personal information, addresses, and secure settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-3xl border border-slate-100 p-2 shadow-sm sticky top-24">
            {/* User Meta Card */}
            <div className="p-4 flex items-center gap-4 mb-4 border-b border-slate-50 pb-6">
              <div className="w-14 h-14 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                {user?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{user?.name || 'PK Shopper'}</h3>
                <p className="text-sm text-slate-400 font-medium">+91 {user?.phone || '...'}</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-full transition-all text-sm font-bold ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'text-slate-400'}`} />
                    {tab.label}
                  </button>
                )
              })}
              
              <div className="h-px bg-slate-100 my-2 mx-4"></div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
              >
                <LogOut className="w-5 h-5 opacity-70" />
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4">
          <AnimatePresence mode="wait">
            
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Personal Information</h2>
                  <button className="text-primary-600 text-sm font-bold hover:underline">Edit</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Full Name</span>
                    <p className="font-medium text-slate-900 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">{user?.name || 'PK Shopper'}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Phone Number</span>
                    <p className="font-medium text-slate-900 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">+91 {user?.phone || 'Loading...'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Joined</span>
                    <p className="font-medium text-slate-900 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                      {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Just now'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-slate-900 font-heading">Saved Addresses</h2>
                  <button className="bg-primary-50 text-primary-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-100 transition-colors">
                    + Add New
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-primary-500 rounded-2xl p-5 relative bg-primary-50/30">
                    <span className="absolute top-4 right-4 bg-primary-100 text-primary-700 text-[10px] uppercase font-black px-2 py-0.5 rounded-sm">Default</span>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <h4 className="font-bold text-slate-900">Home</h4>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      A-12, Green Park Extension, <br/>
                      Near Metro Station, New Delhi, 110016
                    </p>
                    <div className="flex gap-3 text-sm font-bold">
                       <button className="text-primary-600">Edit</button>
                       <button className="text-rose-500">Delete</button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <h4 className="font-bold text-slate-900">Office</h4>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      Cyber Hub, DLF Phase 2, <br/>
                      Sector 24, Gurugram, 122022
                    </p>
                    <div className="flex gap-3 text-sm font-bold">
                       <button className="text-slate-600 hover:text-primary-600">Edit</button>
                       <button className="text-rose-500">Delete</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Empty states for others */}
            {['payment', 'notifications', 'settings'].includes(activeTab) && (
               <motion.div
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-white rounded-3xl border border-slate-100 p-16 shadow-sm flex flex-col items-center justify-center text-center"
               >
                 <Settings className="w-16 h-16 text-slate-200 mb-4" />
                 <h2 className="text-xl font-bold text-slate-700 mb-2">Coming Soon</h2>
                 <p className="text-slate-500 max-w-sm">This section is currently under development to bring you more features.</p>
               </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
