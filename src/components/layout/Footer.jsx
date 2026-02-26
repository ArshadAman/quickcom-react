import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold">PK</span>
              </div>
              <span className="font-heading font-bold text-xl text-slate-800 tracking-tight">SuperMart</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your daily grocery needs delivered to your door in minutes. Fresh, fast, and reliable.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-slate-900 mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Fresh Vegetables</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Fresh Fruits</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Dairy & Bakery</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Snacks & Beverages</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-slate-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>Call Us: +91 98765 43210</li>
              <li>Email: support@pksupermart.com</li>
              <li>Address: SuperMart HQ, Mumbai, India</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PK SuperMart. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
             {/* Social Links Placeholders */}
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary-50 hover:text-primary-500 cursor-pointer transition-colors">
               f
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary-50 hover:text-primary-500 cursor-pointer transition-colors">
               t
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary-50 hover:text-primary-500 cursor-pointer transition-colors">
               in
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
