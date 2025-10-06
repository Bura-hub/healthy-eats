import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = null,
  loading = 'lazy',
  onError = null,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generar rutas para diferentes formatos
  const getImagePaths = (originalSrc) => {
    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    return {
      webp: `${basePath}.webp`,
      original: originalSrc,
      fallback: fallbackSrc || originalSrc
    };
  };

  const paths = getImagePaths(src);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder mientras carga */}
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}
      
      {/* Imagen WebP (mejor compresión) */}
      {!hasError && (
        <picture>
          <source srcSet={paths.webp} type="image/webp" />
          <img
            src={paths.original}
            alt={alt}
            className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            loading={loading}
            onLoad={handleImageLoad}
            onError={handleImageError}
            {...props}
          />
        </picture>
      )}
      
      {/* Fallback si hay error */}
      {hasError && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          loading={loading}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
