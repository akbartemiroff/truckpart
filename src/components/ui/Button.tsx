import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-xl border border-white/20';
  
  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary/90 via-blue-600/90 to-blue-700/90 text-white shadow-glass hover:shadow-glass-lg hover:shadow-neon backdrop-blur-2xl',
    secondary: 'bg-gradient-to-br from-accent/90 via-yellow-400/90 to-yellow-500/90 text-gray-900 shadow-glass hover:shadow-glass-lg hover:shadow-neon-accent backdrop-blur-2xl',
    outline: 'bg-white/10 dark:bg-gray-800/10 text-primary dark:text-accent border-2 border-primary/30 dark:border-accent/30 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:border-primary dark:hover:border-accent backdrop-blur-2xl shadow-glass',
    danger: 'bg-gradient-to-br from-red-500/90 via-rose-600/90 to-red-700/90 text-white shadow-glass hover:shadow-glass-lg backdrop-blur-2xl',
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm rounded-2xl',
    md: 'px-7 py-3.5 text-base rounded-2xl',
    lg: 'px-9 py-4 text-lg rounded-3xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} group`}
      {...props}
      onClick={handleClick}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
    </motion.button>
  );
};
