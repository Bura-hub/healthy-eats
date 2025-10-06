import React from 'react';

// Componente Card reutilizable con variantes profesionales
const Card = ({ 
  variant = 'default',
  padding = 'md',
  hover = true,
  children,
  className = '',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'shadow-md border border-gray-200',
    elevated: 'shadow-lg border border-gray-100',
    flat: 'shadow-sm border border-gray-300',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg'
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
