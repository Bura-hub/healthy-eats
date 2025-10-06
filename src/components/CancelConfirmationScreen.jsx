import React, { useState, useEffect } from 'react';
import Icon from './Icon';

// Componente: Pantalla de Confirmación de Cancelación Profesional
const CancelConfirmationScreen = ({ orderId, onBackToMenus, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);

  useEffect(() => {
    // Animaciones de entrada
    const timer1 = setTimeout(() => setShowAnimation(true), 100);
    const timer2 = setTimeout(() => setShowContent(true), 600);
    const timer3 = setTimeout(() => setShowDetails(true), 1000);
    
    // Simular cálculo de reembolso
    const timer4 = setTimeout(() => {
      setRefundAmount(45.50); // Simular monto del pedido
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 relative overflow-hidden pb-20 flex flex-col">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-red-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-orange-200/15 to-yellow-200/15 rounded-full blur-xl animate-bounce"></div>
        
        {/* Partículas de confirmación */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className={`mb-6 md:mb-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight" style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Pedido Cancelado
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-slate-500 text-sm sm:text-base font-medium" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Pedido #{orderId}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600 font-medium">Cancelado</span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8"></div>
          </div>
        </div>

        {/* Icono de confirmación animado */}
        <div className={`flex justify-center mb-8 md:mb-10 transition-all duration-700 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative">
            {/* Anillo exterior */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-red-200 via-orange-200 to-red-200 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
            
            {/* Anillo intermedio */}
            <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-br from-red-50 via-orange-50 to-red-50 rounded-full opacity-60 animate-pulse" style={{animationDuration: '3s'}}></div>
            
            {/* Círculo principal */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white/80 backdrop-blur-sm relative overflow-hidden">
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" style={{animationDuration: '2s'}}></div>
              <Icon name="X" className="w-10 h-10 md:w-12 md:h-12 text-red-600 relative z-10" />
            </div>
            
            {/* Partículas de confirmación */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-0 -left-3 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className={`text-center mb-8 md:mb-10 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4 leading-tight" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '800'
          }}>
            ¡Pedido Cancelado Exitosamente!
          </h2>
          <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 md:px-8">
            Tu pedido ha sido cancelado y el reembolso está en proceso
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600 font-medium">Procesando reembolso</span>
          </div>
        </div>

        {/* Detalles del reembolso */}
        <div className={`bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-all duration-700 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-slate-800">Detalles del Reembolso</h3>
            <div className="flex items-center text-red-600">
              <Icon name="CheckCircle" className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Procesado</span>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-slate-500 font-medium">Número de pedido</span>
                <span className="text-sm md:text-base font-bold text-slate-800">{orderId}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm md:text-base text-slate-500 font-medium mr-2">Fecha de cancelación</span>
                  <Icon name="Calendar" className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                </div>
                <span className="text-sm md:text-base font-bold text-slate-800">
                  {new Date().toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>

            {/* Monto del reembolso */}
            <div className="border-t border-slate-200 pt-4 md:pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-slate-500 font-medium">Monto del pedido</span>
                  <span className="text-sm md:text-base font-medium text-slate-800">${refundAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-slate-500 font-medium">Cargo de cancelación</span>
                  <span className="text-sm md:text-base font-medium text-green-600">$0.00</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg md:text-xl text-slate-800 font-semibold">Total a reembolsar</span>
                    <span className="text-lg md:text-xl font-bold text-red-600">${refundAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-sm transition-all duration-700 ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-start">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
              <Icon name="Info" className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-3">Información del Reembolso</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="Clock" className="w-4 h-4 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Tiempo de procesamiento</p>
                    <p className="text-xs text-blue-600">3-5 días hábiles</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" className="w-4 h-4 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Confirmación por email</p>
                    <p className="text-xs text-blue-600">Recibirás un comprobante</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="CreditCard" className="w-4 h-4 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Método de reembolso</p>
                    <p className="text-xs text-blue-600">Mismo método de pago usado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className={`space-y-4 md:space-y-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={onBackToMenus}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
            aria-label="Hacer nuevo pedido"
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Icon name="Plus" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-90 transition-transform duration-200" />
              <span className="text-base md:text-lg lg:text-xl">Hacer Nuevo Pedido</span>
            </div>
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-white/90 backdrop-blur-sm border border-slate-200/50 hover:border-emerald-200/50 text-emerald-600 hover:text-emerald-700 font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
            aria-label="Volver al inicio"
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Icon name="Home" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-base md:text-lg lg:text-xl">Volver al Inicio</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200/50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 md:space-x-8 text-xs md:text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" className="w-3 h-3 md:w-4 md:h-4" />
                <span>Reembolso garantizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" className="w-3 h-3 md:w-4 md:h-4" />
                <span>Procesamiento rápido</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" className="w-3 h-3 md:w-4 md:h-4" />
                <span>100% seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationScreen;
