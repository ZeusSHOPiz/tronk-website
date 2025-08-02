'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PriceCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: string;
  delay?: number;
}

export default function PriceCard({ icon: Icon, title, value, color, delay = 0 }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
      <p className="text-gray-300">{title}</p>
    </motion.div>
  );
} 