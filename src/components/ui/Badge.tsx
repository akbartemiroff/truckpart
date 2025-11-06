import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: BadgeProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-blue-600 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    warning: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 rounded-full font-semibold shadow-lg ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
};
