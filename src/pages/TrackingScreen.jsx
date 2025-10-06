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
    setView('home');
    alert('Pedido cancelado exitosamente. Se procesará el reembolso.');
  };

  const steps = [
    { id: 1, title: 'Pedido Recibido', subtitle: 'Confirmado por la cocina.', icon: 'CheckCircle' },
    { id: 2, title: 'En Preparación', subtitle: 'Tu menú se está cocinando.', icon: 'Clock' },
    { id: 3, title: 'En Camino', subtitle: 'Saliendo para la entrega.', icon: 'Truck' },
    { id: 4, title: 'Entregado', subtitle: '¡Disfruta tu Healthy Eats!', icon: 'Check' },
  ];

  return (
    <div className="p-4 pt-10 pb-20 min-h-screen bg-white">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Seguimiento</h1>
      <p className="text-lg text-gray-600 mb-6">Pedido #{orderId}</p>

      {/* Estado Actual */}
      <div className="bg-primary-100 p-6 rounded-2xl shadow-inner mb-8 text-center">
        <p className="text-sm text-primary-700 font-medium">Estado Actual:</p>
        <p className="text-2xl font-bold text-primary-800 mt-1">{statusText}</p>
      </div>

      {/* Línea de Tiempo */}
      <div className="relative border-l-4 border-gray-200 ml-4">
        {steps.map((item) => (
          <div key={item.id} className="mb-8 ml-6">
            <div className={`absolute w-4 h-4 rounded-full -left-2.5 transform -translate-x-1/2 ${item.id <= step ? 'bg-primary-500 shadow-lg shadow-primary-300' : 'bg-gray-300'}`}></div>
            <div className="flex items-center space-x-3">
              <Icon 
                name={item.icon} 
                className={`w-5 h-5 ${item.id <= step ? 'text-primary-600' : 'text-gray-400'}`} 
              />
              <div>
                <h3 className={`font-bold text-xl ${item.id <= step ? 'text-primary-700' : 'text-gray-400'}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {step < 3 && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-2xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-red-400/50 backdrop-blur-sm group"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}
            aria-label="Cancelar pedido"
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="X" className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Cancelar Pedido</span>
            </div>
          </button>
        )}
        <button
          onClick={() => setView('home')}
          className="btn-primary w-full"
          aria-label="Volver a la pantalla principal"
        >
          Volver a Inicio
        </button>
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
