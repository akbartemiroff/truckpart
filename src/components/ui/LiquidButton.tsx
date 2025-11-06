import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'glass-blue' | 'glass-purple' | 'glass-pink' | 'glass-green' | 'glass-orange';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const LiquidButton = ({
  children,
  variant = 'glass-blue',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}: LiquidButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    setIsPressed(true);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 400);
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed';
  
  const variantClasses = {
    'glass-blue': 'bg-gradient-to-br from-blue-500/20 via-blue-600/30 to-blue-700/20 text-white border border-blue-400/30 hover:border-blue-300/50 shadow-[0_8px_32px_0_rgba(59,130,246,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.6)] backdrop-blur-xl',
    'glass-purple': 'bg-gradient-to-br from-purple-500/20 via-purple-600/30 to-purple-700/20 text-white border border-purple-400/30 hover:border-purple-300/50 shadow-[0_8px_32px_0_rgba(168,85,247,0.37)] hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.6)] backdrop-blur-xl',
    'glass-pink': 'bg-gradient-to-br from-pink-500/20 via-pink-600/30 to-pink-700/20 text-white border border-pink-400/30 hover:border-pink-300/50 shadow-[0_8px_32px_0_rgba(236,72,153,0.37)] hover:shadow-[0_8px_32px_0_rgba(236,72,153,0.6)] backdrop-blur-xl',
    'glass-green': 'bg-gradient-to-br from-green-500/20 via-green-600/30 to-green-700/20 text-white border border-green-400/30 hover:border-green-300/50 shadow-[0_8px_32px_0_rgba(34,197,94,0.37)] hover:shadow-[0_8px_32px_0_rgba(34,197,94,0.6)] backdrop-blur-xl',
    'glass-orange': 'bg-gradient-to-br from-orange-500/20 via-orange-600/30 to-orange-700/20 text-white border border-orange-400/30 hover:border-orange-300/50 shadow-[0_8px_32px_0_rgba(249,115,22,0.37)] hover:shadow-[0_8px_32px_0_rgba(249,115,22,0.6)] backdrop-blur-xl',
  };

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm rounded-2xl',
    md: 'px-8 py-3.5 text-base rounded-2xl',
    lg: 'px-10 py-4.5 text-lg rounded-3xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.92 }}
      animate={isPressed ? { scale: 0.92 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} group`}
      {...props}
      onClick={handleClick}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/50 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '30px',
            height: '30px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {icon && (
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
      </span>
      
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </motion.button>
  );
};
