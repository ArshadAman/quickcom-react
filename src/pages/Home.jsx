import React, { useState } from 'react';
import { motion } from 'framer-motion';


// New Components
import CategoryPills from '../components/home/CategoryPills';
import BentoHero from '../components/home/BentoHero';
import PromoBanners from '../components/home/PromoBanners';
import ProductSection from '../components/home/ProductSection';

const dummyProducts = [
  {
    id: 1,
    category: 'Vegetables',
    name: 'Russet Idaho Potatoes Fresh Premium',
    price: 36.00,
    oldPrice: 38.00,
    weight: '100gm',
    variants: [
      { weight: '100gm', price: 36.00 },
      { weight: '300gm', price: 105.00 },
      { weight: '1kg', price: 320.00 },
    ],
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    discount: 16
  },
  {
    id: 2,
    category: 'Beverage',
    name: 'Aptamil Gold+ ProNutra Biotik Stage 1',
    price: 30.00,
    oldPrice: 35.00,
    weight: '150gm',
    variants: [
      { weight: '150gm', price: 30.00 },
      { weight: '300gm', price: 58.00 },
    ],
    image: 'https://images.unsplash.com/photo-1555252115-ffcb525048cd?auto=format&fit=crop&w=400&q=80',
    discount: 14
  },
  {
    id: 3,
    category: 'Vegetables',
    name: 'Whole Foods Market, Organic Green Beans',
    price: 8.00,
    oldPrice: 12.00,
    weight: '150gm',
    variants: [
      { weight: '150gm', price: 8.00 },
      { weight: '300gm', price: 15.00 },
    ],
    image: 'https://images.unsplash.com/photo-1566842600175-97dca489844f?auto=format&fit=crop&w=400&q=80',
    discount: 22
  },
  {
    id: 4,
    category: 'Vegetables',
    name: 'Whole Foods Market, Romaine Salad Bag',
    price: 19.00,
    oldPrice: 22.00,
    weight: '100gm',
    variants: [
      { weight: '100gm', price: 19.00 },
      { weight: '200gm', price: 35.00 },
    ],
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80',
    discount: 14
  },
  {
    id: 5,
    category: 'Desserts',
    name: 'Red Rock Deli Style Potato Chips',
    price: 34.00,
    oldPrice: 45.00,
    weight: '100gm',
    variants: [
      { weight: '100gm', price: 34.00 },
      { weight: '200gm', price: 65.00 },
    ],
    image: 'https://images.unsplash.com/photo-1566478989037-e6239309ec95?auto=format&fit=crop&w=400&q=80',
    discount: 24
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Desserts', 'Vegetables', 'Beverage'];

  const filteredFeatured = activeTab === 'All' 
    ? dummyProducts 
    : dummyProducts.filter(p => p.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20 w-full"
    >
      <CategoryPills />
      <BentoHero />

      {/* Featured Products with Tabs */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold font-heading text-gray-900 border-l-4 border-primary-600 pl-3">
            Featured Products
          </h2>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 sm:pb-0 w-full sm:w-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1' 
                    : 'text-gray-400 hover:text-gray-600 pb-1'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <ProductSection products={filteredFeatured} />
      </div>

      <PromoBanners />

      {/* Trending Products (Reused layout) */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold font-heading text-gray-900 border-l-4 border-primary-600 pl-3 mb-8">
          Trending Products
        </h2>
        <ProductSection products={[...dummyProducts].reverse()} />
      </div>

    </motion.div>
  );
};

export default Home;
