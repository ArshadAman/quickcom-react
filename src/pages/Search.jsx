import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { Search as SearchIcon } from 'lucide-react';
import ProductSection from '../components/home/ProductSection';
import { dummyProducts } from '../data/products';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery().get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Mock search logic
    const t = setTimeout(() => {
      if (query) {
        const filtered = dummyProducts.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.length > 0 ? filtered : dummyProducts.slice(0, 2)); // fallback just to show something
      } else {
        setResults(dummyProducts);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-20 w-full"
    >
      {/* Search Header */}
      <div className="flex flex-col mb-10 border-b border-slate-100 pb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-900 flex items-center gap-3">
          <div className="bg-primary-50 p-2 rounded-xl text-primary-600">
             <SearchIcon className="w-6 h-6" />
          </div>
          Results for "{query}"
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Found {results.length} items matching your search.</p>
      </div>

      <div className="w-full">
        <ProductSection products={results} />
      </div>
    </motion.div>
  );
};

export default Search;
