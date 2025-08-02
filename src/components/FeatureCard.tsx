'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center hover:border-white/20 transition-all duration-300"
    >
      <div className="text-yellow-400 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
} 