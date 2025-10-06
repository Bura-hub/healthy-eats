import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import CancelOrderModal from '../components/CancelOrderModal';

// Componente: Seguimiento de Pedido (Tracking Simulado)
const TrackingScreen = ({ setView, orderId, setOrderId }) => {
  const [step, setStep] = useState(1); // 1: Preparando, 2: En Camino, 3: Entregado
  const [statusText, setStatusText] = useState('Recibido y Confirmado');
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Simulación de pasos de seguimiento con temporizador
    let timer;
    if (step < 3) {
      timer = setTimeout(() => {
        setStep(step + 1);
      }, 5000); // Avanza cada 5 segundos

      if (step === 1) setStatusText('Preparando el menú saludable...');
      if (step === 2) setStatusText('¡En camino! El repartidor ya salió.');
    } else if (step === 3) {
       setStatusText('¡Entregado! Gracias por tu pedido.');
    }

    return () => clearTimeout(timer);
  }, [step]);

  const handleCancelOrder = () => {
    // Simular cancelación del pedido
    setOrderId(null);
    setView('menus'); // Redirigir a menús para hacer nuevo pedido
    alert('Pedido cancelado exitosamente. Se procesará el reembolso.');
  };

  const steps = [
    { id: 1, title: 'Pedido Recibido', subtitle: 'Confirmado por la cocina.', icon: 'CheckCircle' },
    { id: 2, title: 'En Preparación', subtitle: 'Tu menú se está cocinando.', icon: 'Clock' },
    { id: 3, title: 'En Camino', subtitle: 'Saliendo para la entrega.', icon: 'Truck' },
    { id: 4, title: 'Entregado', subtitle: '¡Disfruta tu Healthy Eats!', icon: 'Check' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col animate-fade-in">
      {/* Fondo responsive con animación */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl animate-float-reverse"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header profesional con animación */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight" style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Seguimiento de Pedido
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                Pedido #{orderId}
              </p>
            </div>
            <div className="w-8 h-8"></div>
          </div>
        </div>

        {/* Estado Actual */}
        <div className="bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 shadow-lg text-center">
          <p className="text-sm md:text-base text-emerald-700 font-medium mb-2">Estado Actual:</p>
          <p className="text-xl md:text-2xl font-bold text-emerald-800">{statusText}</p>
        </div>

        {/* Línea de Tiempo */}
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-6">Progreso del Pedido</h3>
          <div className="relative border-l-4 border-slate-200 ml-4">
            {steps.map((item) => (
              <div key={item.id} className="mb-8 ml-6">
                <div className={`absolute w-4 h-4 rounded-full -left-2.5 transform -translate-x-1/2 ${item.id <= step ? 'bg-emerald-500 shadow-lg shadow-emerald-300' : 'bg-slate-300'}`}></div>
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={item.icon} 
                    className={`w-5 h-5 md:w-6 md:h-6 ${item.id <= step ? 'text-emerald-600' : 'text-slate-400'}`} 
                  />
                  <div>
                    <h3 className={`font-bold text-lg md:text-xl ${item.id <= step ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 md:space-y-6">
          {step < 3 && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
              aria-label="Cancelar pedido"
            >
              <div className="flex items-center justify-center space-x-2 md:space-x-3">
                <Icon name="X" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-90 transition-transform duration-200" />
                <span className="text-base md:text-lg lg:text-xl">Cancelar Pedido</span>
              </div>
            </button>
          )}
          
          <button
            onClick={() => setView('menus')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
            aria-label="Hacer nuevo pedido"
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Icon name="Plus" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-90 transition-transform duration-200" />
              <span className="text-base md:text-lg lg:text-xl">Hacer Nuevo Pedido</span>
            </div>
          </button>
        </div>
      </div>

      {/* Modal de confirmación para cancelar */}
      <CancelOrderModal
        isVisible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        orderId={orderId}
      />
    </div>
  );
};

export default TrackingScreen;
