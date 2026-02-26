import React from 'react';
import { motion } from 'framer-motion';

import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Vegetables', count: '6 Products', icon: '🥬', bg: 'bg-green-50' },
  { id: 2, name: 'Fresh Fruits', count: '6 Products', icon: '🍎', bg: 'bg-orange-50' },
  { id: 3, name: 'Desserts', count: '5 Products', icon: '🧁', bg: 'bg-pink-50' },
  { id: 4, name: 'Drinks & Juice', count: '6 Products', icon: '🥤', bg: 'bg-purple-50' },
  { id: 5, name: 'Fish & Meats', count: '6 Products', icon: '🐟', bg: 'bg-blue-50' },
  { id: 6, name: 'Pets & Animals', count: '4 Products', icon: '🐕', bg: 'bg-rose-50' },
  { id: 7, name: 'Bakery', count: '8 Products', icon: '🥐', bg: 'bg-amber-50' },
];

const CategoryPills = () => {
  const [emblaRef] = useEmblaCarousel({ 
    dragFree: true, 
    containScroll: 'trimSnaps' 
  });

  return (
    <div className="w-full my-8">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-6 px-1">
          {categories.map((cat) => ( // Removed 'i' as it was unused
            <Link 
              to={`/category/${cat.id}`}
              key={cat.id} 
              className="flex-[0_0_auto]"
              draggable={false} // Prevent native drag to let embla handle it
            >
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 bg-white border border-slate-100 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center text-xl shadow-inner pointer-events-none`}>
                  {cat.icon}
                </div>
                <div className="flex flex-col pr-2 pointer-events-none">
                  <span className="font-bold text-sm text-slate-800 leading-tight">{cat.name}</span>
                  <span className="text-[10px] font-medium text-slate-400">{cat.count}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPills;
