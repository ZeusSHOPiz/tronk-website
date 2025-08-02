'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, MessageCircle, Heart, TrendingUp } from 'lucide-react';

export default function CommunityStats() {
  const [stats, setStats] = useState({
    holders: 12345,
    telegram: 5678,
    twitter: 8901,
    growth: 23.5
  });

  // Animation des statistiques
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        holders: prev.holders + Math.floor(Math.random() * 10),
        telegram: prev.telegram + Math.floor(Math.random() * 5),
        twitter: prev.twitter + Math.floor(Math.random() * 8),
        growth: prev.growth + (Math.random() - 0.5) * 2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: <Users className="w-6 h-6" />,
      label: "Holders",
      value: stats.holders.toLocaleString(),
      color: "text-blue-400"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Telegram",
      value: stats.telegram.toLocaleString(),
      color: "text-purple-400"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Twitter",
      value: stats.twitter.toLocaleString(),
      color: "text-pink-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Croissance",
      value: `${stats.growth.toFixed(1)}%`,
      color: "text-green-400"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <h3 className="text-2xl font-bold text-white text-center mb-8">
        🚀 Communauté TRONK
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`${item.color} mb-2 flex justify-center`}>
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-300">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-300 mb-4">
          Rejoignez la communauté la plus fun du crypto ! 🎉
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            📱 Telegram
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            🐦 Twitter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            📺 Discord
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
} 