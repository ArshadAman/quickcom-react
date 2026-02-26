import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

import ProductSection from '../components/home/ProductSection';
import { dummyProducts } from '../data/products';

const Category = () => {
  const { id } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock category mapping
  const categoryNames = {
    1: 'Vegetables', 2: 'Fresh Fruits', 3: 'Desserts',
    4: 'Drinks & Juice', 5: 'Fish & Meats', 6: 'Pets & Animals', 7: 'Bakery'
  };

  const name = categoryNames[id] || 'All Products';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-20 w-full flex flex-col items-center"
    >
      {/* Category Header */}
      <div className="w-full bg-slate-50 rounded-[32px] p-8 md:p-16 mb-12 text-center border border-slate-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-4">{name}</h1>
        <p className="text-slate-500 font-medium max-w-lg">
          Browse our freshly picked selection of {name.toLowerCase()}. Everything you see is guaranteed fresh and delivered in 10 minutes.
        </p>
      </div>

      <div className="w-full">
        <ProductSection products={dummyProducts} />
      </div>
    </motion.div>
  );
};

export default Category;
