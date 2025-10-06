import React from 'react';
import Icon from './Icon';

// Componente Input reutilizable con estados profesionales
const Input = ({ 
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  error,
  label,
  helperText,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const variants = {
    default: 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-300',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-300',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-300'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const currentVariant = error ? 'error' : variant;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon 
              name={icon} 
              className={`${iconSizes[size]} text-gray-400`} 
            />
          </div>
        )}
        
        <input
          className={`${baseClasses} ${variants[currentVariant]} ${sizes[size]} ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${
            icon && iconPosition === 'right' ? 'pr-10' : ''
          } ${className}`}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon 
              name={icon} 
              className={`${iconSizes[size]} text-gray-400`} 
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
