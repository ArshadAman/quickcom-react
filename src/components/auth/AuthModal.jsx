import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [step, setStep] = useState('PHONE'); // PHONE or OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isAuthModalOpen) {
      // Defer state updates to avoid React warning: "Calling setState synchronously within an effect can trigger cascading renders"
      const t = setTimeout(() => {
        setStep('PHONE');
        setPhone('');
        setOtp(['', '', '', '']);
        setError('');
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isAuthModalOpen]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Mock API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Auto-focus previous input on backspace
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }
    
    setError('');
    setIsLoading(true);

    // Mock API call to verify OTP and login
    setTimeout(() => {
      setIsLoading(false);
      // Dummy user data
      login({
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        phone: phone,
        name: 'PK Shopper',
        joinedAt: new Date().toISOString()
      });
      closeAuthModal();
    }, 1500);
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Close Button */}
          <button 
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Banner */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-center relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[140%] bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
            
            <h2 className="text-2xl font-heading font-black text-white relative z-10 mb-2">
              PK SuperMart<span className="text-secondary-400">.</span>
            </h2>
            <p className="text-primary-100/90 text-sm font-medium relative z-10 max-w-[250px] mx-auto">
              {step === 'PHONE' ? 'Login or Sign up to access your account & fast deliveries.' : 'Verifying your identity securely.'}
            </p>
          </div>

          {/* Form Area */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 'PHONE' ? (
                <motion.form 
                  key="phone-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handlePhoneSubmit}
                  className="flex flex-col"
                >
                  <label className="text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <div className="relative mb-6">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3">
                      <Smartphone className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600 font-bold">+91</span>
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Enter 10-digit number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-[90px] pr-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all text-lg tracking-wider"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      autoFocus
                    />
                  </div>

                  {error && <p className="text-rose-500 text-xs font-bold mb-4 text-center bg-rose-50 p-2 rounded-lg">{error}</p>}

                  <button 
                    type="submit"
                    disabled={isLoading || phone.length < 10}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        Continue <ArrowRight className="w-4 h-4 text-slate-400" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs font-medium text-slate-400 mt-6 px-4">
                    By continuing, you agree to PK SuperMart's <span className="text-primary-600 underline cursor-pointer">Terms of Service</span> & <span className="text-primary-600 underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </motion.form>
              ) : (
                <motion.form 
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={verifyOtp}
                  className="flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Enter OTP</h3>
                      <p className="text-sm text-slate-500 font-medium">Sent to +91 {phone}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setStep('PHONE')}
                      className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit Number
                    </button>
                  </div>

                  <div className="flex justify-between gap-3 mb-8">
                    {otp.map((digit, idx) => (
                      <input 
                        key={idx}
                        id={`otp-${idx}`}
                        type="text" 
                        maxLength="1"
                        className="w-full aspect-square bg-slate-50 border border-slate-200 rounded-2xl text-center text-2xl font-black text-slate-900 focus:outline-none focus:border-primary-500 focus:bg-white focus:shadow-sm transition-all"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      />
                    ))}
                  </div>

                  {error && <p className="text-rose-500 text-xs font-bold mb-4 text-center bg-rose-50 p-2 rounded-lg">{error}</p>}

                  <button 
                    type="submit"
                    disabled={isLoading || otp.join('').length < 4}
                    className="w-full bg-primary-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary-600/30 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <ShieldCheck className="w-5 h-5" /> Verify & Login
                      </>
                    )}
                  </button>
                  
                  <div className="text-center mt-6">
                    <p className="text-sm font-medium text-slate-500">
                      Didn't receive the code? <button type="button" className="text-primary-600 font-bold hover:underline">Resend OTP</button>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
