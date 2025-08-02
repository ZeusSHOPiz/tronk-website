'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = ''
}: AnimatedButtonProps) {
  const baseClasses = "font-bold rounded-full transition-all duration-300 hover:shadow-lg";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400",
    secondary: "bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-300 hover:to-pink-400",
    success: "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-300 hover:to-blue-400"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
} 