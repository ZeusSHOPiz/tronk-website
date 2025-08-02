'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceChart() {
  const [priceData, setPriceData] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0.00012345);
  const [priceChange, setPriceChange] = useState(0);

  // Générer des données de prix simulées
  useEffect(() => {
    const generatePriceData = () => {
      const data = [];
      let price = 0.00012345;
      
      for (let i = 0; i < 50; i++) {
        price += (Math.random() - 0.5) * 0.00001;
        data.push(Math.max(0.0001, price));
      }
      
      setPriceData(data);
      setCurrentPrice(price);
      setPriceChange(((price - 0.00012345) / 0.00012345) * 100);
    };

    generatePriceData();
    const interval = setInterval(generatePriceData, 5000);

    return () => clearInterval(interval);
  }, []);

  const maxPrice = Math.max(...priceData);
  const minPrice = Math.min(...priceData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Prix TRONK</h3>
        <div className="flex items-center space-x-2">
          {priceChange >= 0 ? (
            <TrendingUp className="w-5 h-5 text-green-400" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-400" />
          )}
          <span className={`font-bold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-white">${currentPrice.toFixed(8)}</div>
        <div className="text-sm text-gray-300">Prix actuel</div>
      </div>

      {/* Graphique simplifié */}
      <div className="h-32 bg-black/20 rounded-lg p-4 relative overflow-hidden">
        {priceData.length > 0 && (
          <svg className="w-full h-full" viewBox={`0 0 ${priceData.length} 100`}>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d={priceData.map((price, index) => {
                const x = (index / (priceData.length - 1)) * 100;
                const y = 100 - ((price - minPrice) / (maxPrice - minPrice)) * 100;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>24h</span>
        <span>7j</span>
        <span>30j</span>
        <span>1an</span>
      </div>
    </motion.div>
  );
} 