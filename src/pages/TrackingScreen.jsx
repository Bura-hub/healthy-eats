import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import CancelOrderModal from '../components/CancelOrderModal';
import CancelConfirmationScreen from '../components/CancelConfirmationScreen';

// Componente: Seguimiento de Pedido Profesional Avanzado
const TrackingScreen = ({ setView, orderId, setOrderId, orders = [], deliveryTime }) => {
  // Buscar el pedido actual en la lista de pedidos
  const currentOrder = orders.find(order => order.id === orderId);
  
  const [step, setStep] = useState(1); // 1: Preparando, 2: Listo, 3: Recogido
  const [statusText, setStatusText] = useState('Recibido y Confirmado');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('Cocina Healthy Eats');

  // Calcular tiempo hasta recogida basado en deliveryTime o currentOrder
  const getTimeUntilPickup = () => {
    const pickupTime = currentOrder?.pickupTime || deliveryTime;
    if (!pickupTime) return 0;
    
    const now = new Date();
    const pickup = new Date(pickupTime);
    const diffMs = pickup - now;
    const diffMins = Math.round(diffMs / 60000);
    
    return diffMins > 0 ? diffMins : 0;
  };

  useEffect(() => {
    // Animaciones de entrada
    const timer1 = setTimeout(() => setShowAnimation(true), 100);
    const timer2 = setTimeout(() => setShowContent(true), 600);
    const timer3 = setTimeout(() => setShowTimeline(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    // Actualizar estimatedTime basado en el pedido real
    const timeUntilPickup = getTimeUntilPickup();
    setEstimatedTime(timeUntilPickup);

    // Actualizar cada minuto
    const interval = setInterval(() => {
      const updatedTime = getTimeUntilPickup();
      setEstimatedTime(updatedTime);
      
      // Actualizar el paso basado en el estado del pedido o el tiempo
      if (currentOrder) {
        if (currentOrder.status === 'listo') {
          setStep(2);
          setStatusText('¡Listo para recoger!');
          setCurrentLocation('Listo en el restaurante');
        } else if (currentOrder.status === 'completado') {
          setStep(3);
          setStatusText('¡Recogido! Gracias por tu pedido.');
          setCurrentLocation('Recogido');
        } else {
          setStep(1);
          setStatusText('Preparando tu menú saludable...');
          setCurrentLocation('En preparación');
        }
      } else {
        // Si no hay pedido en la lista, usar lógica de tiempo
        if (updatedTime === 0) {
          setStep(2);
          setStatusText('¡Listo para recoger!');
          setCurrentLocation('Listo en el restaurante');
        } else {
          setStep(1);
          setStatusText('Preparando tu menú saludable...');
          setCurrentLocation('En preparación');
        }
      }
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [currentOrder, deliveryTime]);

  const handleCancelOrder = () => {
    // Mostrar pantalla de confirmación de cancelación
    setShowCancelConfirmation(true);
  };

  const handleBackToMenus = () => {
    setOrderId(null);
    setView('menus');
  };

  const handleCloseConfirmation = () => {
    setShowCancelConfirmation(false);
    setView('home');
  };

  const steps = [
    { 
      id: 1, 
      title: 'Pedido Confirmado', 
      subtitle: 'Confirmado por el restaurante.', 
      icon: 'CheckCircle',
      time: 'Confirmado',
      color: 'emerald',
      completed: step >= 1,
      active: step === 1
    },
    { 
      id: 2, 
      title: 'En Preparación', 
      subtitle: 'Tu menú se está preparando.', 
      icon: 'Clock',
      time: estimatedTime > 0 ? `${estimatedTime} min` : 'En progreso',
      color: step >= 1 ? 'emerald' : 'gray',
      completed: step >= 2,
      active: step === 1 && step < 2
    },
    { 
      id: 3, 
      title: 'Listo para Recoger', 
      subtitle: 'Tu pedido está listo en el restaurante.', 
      icon: 'Utensils',
      time: step >= 2 ? 'Listo' : 'Próximo',
      color: step >= 2 ? 'emerald' : 'gray',
      completed: step >= 2,
      active: step === 2
    },
  ];

  // Si se está mostrando la confirmación de cancelación
  if (showCancelConfirmation) {
    return (
      <CancelConfirmationScreen
        orderId={orderId}
        onBackToMenus={handleBackToMenus}
        onClose={handleCloseConfirmation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col">
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl animate-bounce"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl animate-ping"></div>
        
        {/* Partículas de seguimiento */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header profesional con animación */}
        <div className={`mb-6 md:mb-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
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
                Seguimiento en Tiempo Real
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-slate-500 text-sm sm:text-base font-medium" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Pedido #{orderId}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-600 font-medium">En vivo</span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8"></div>
          </div>
        </div>

        {/* Estado Actual Mejorado */}
        <div className={`bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 shadow-lg transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Icon name="Truck" className="w-6 h-6 text-white animate-bounce" />
              </div>
              <div>
                <p className="text-sm md:text-base text-emerald-700 font-medium">Estado Actual</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-800">{statusText}</p>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Clock" className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-emerald-600 font-medium">Tiempo Estimado</p>
                    <p className="text-lg font-bold text-emerald-800">{estimatedTime} min</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="MapPin" className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-emerald-600 font-medium">Ubicación</p>
                    <p className="text-sm font-bold text-emerald-800">{currentLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Mejorado */}
        <div className={`bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 shadow-lg transition-all duration-700 ${showTimeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-slate-800">Progreso del Pedido</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-600 font-medium">Actualizando...</span>
            </div>
          </div>
          
          <div className="relative">
            {/* Línea de progreso */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500 rounded-full"></div>
            
            {steps.map((item, index) => (
              <div key={item.id} className={`relative flex items-start mb-8 transition-all duration-500 ${item.completed ? 'opacity-100' : 'opacity-60'}`}>
                {/* Indicador circular */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  item.completed 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                    : item.active 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse' 
                    : 'bg-slate-300'
                }`}>
                  <Icon 
                    name={item.icon} 
                    className={`w-7 h-7 ${item.completed || item.active ? 'text-white' : 'text-slate-500'}`} 
                  />
                  {/* Efecto de brillo para pasos activos */}
                  {item.active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-75 animate-ping"></div>
                  )}
                </div>
                
                {/* Contenido del paso */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold text-lg md:text-xl transition-colors duration-300 ${
                      item.completed || item.active ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      {item.title}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.completed 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : item.active 
                        ? 'bg-emerald-200 text-emerald-800' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-slate-500 mb-2">{item.subtitle}</p>
                  
                  {/* Información adicional para pasos específicos */}
                  {item.id === 2 && item.active && (
                    <div className="bg-emerald-50 rounded-lg p-3 mt-3">
                      <p className="text-xs text-emerald-700 font-medium">Chef asignado: María González</p>
                      <p className="text-xs text-emerald-600">Especialidad: Comida saludable</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons Mejorados */}
        <div className={`space-y-4 md:space-y-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
