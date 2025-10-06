import React, { useState } from 'react';
import Icon from './Icon';

// Componente: Estado Offline con diseño profesional
const OfflineScreen = ({ onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simular reintento de conexión
    setTimeout(() => {
      setIsRetrying(false);
      if (onRetry) onRetry();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 relative overflow-hidden flex flex-col">
      {/* Fondo decorativo profesional */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-red-200/15 to-orange-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-yellow-200/15 to-red-200/15 rounded-full blur-xl"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-200/10 to-red-200/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
        <div className="text-center max-w-md mx-auto">
          {/* Icono de conexión con animación profesional */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center animate-pulse shadow-xl border-4 border-red-200/50">
            <Icon name="Wifi" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-500" />
          </div>

          {/* Título principal profesional */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight leading-tight mb-4" style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #dc2626 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Sin conexión
          </h1>

          {/* Descripción profesional */}
          <p className="text-slate-600 mb-8 text-lg sm:text-xl md:text-2xl leading-relaxed px-4" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            No hay conexión a internet. Verifica tu conexión y vuelve a intentar.
          </p>

          {/* Botón de reintento profesional */}
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className={`w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] font-semibold text-lg md:text-xl lg:text-2xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px] border-2 border-red-400/20 backdrop-blur-sm ${
              isRetrying ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-600 hover:to-orange-600 transform hover:scale-105'
            }`}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}
            aria-label={isRetrying ? 'Reintentando conexión...' : 'Reintentar conexión'}
          >
            {isRetrying ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
                <span>Reintentando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <Icon name="RefreshCw" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-180 transition-transform duration-500" />
                <span>Reintentar</span>
              </div>
            )}
          </button>

          {/* Información adicional profesional */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 md:p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name="Info" className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-blue-800 text-sm md:text-base font-semibold mb-1" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}>
                  Información importante:
                </p>
                <p className="text-blue-700 text-xs md:text-sm leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Los datos se sincronizarán automáticamente cuando se restaure la conexión. Tu carrito y preferencias están guardados localmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineScreen;
