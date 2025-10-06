import React from 'react';
import Icon from '../components/Icon';

// Componente: Confirmación de Pedido
const ConfirmationScreen = ({ setView, orderId, address }) => {
  return (
    <div className="p-4 pt-10 pb-20 min-h-screen flex flex-col items-center justify-center text-center bg-primary-50">
      <Icon name="CheckCircle" className="w-24 h-24 text-primary-500 mb-6 animate-pulse-slow" />
      <h1 className="text-4xl font-extrabold text-primary-800 mb-3">¡Pedido Confirmado!</h1>
      <p className="text-xl text-gray-700 font-semibold mb-2">Tu orden ha sido colocada (Simulación).</p>
      
      <div className="card p-6 w-full max-w-sm space-y-3 mt-6">
        <p className="text-sm text-gray-500">Número de Pedido (Simulado):</p>
        <p className="text-3xl font-extrabold text-gray-900">{orderId}</p>
        <div className="border-t pt-3">
          <p className="text-sm text-gray-500">Entrega Estimada (Simulada):</p>
          <p className="font-bold text-lg text-secondary-600">30-45 minutos</p>
          <p className="text-xs text-gray-500 mt-1">
            {address.line1}, {address.city}
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-8 w-full max-w-sm">
        <button
          onClick={() => setView('tracking')}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-colors active:scale-[0.98]"
          aria-label="Seguir pedido en tiempo real"
        >
          Seguir Pedido (Tracking)
        </button>
        <button
          onClick={() => setView('home')}
          className="btn-secondary w-full"
          aria-label="Hacer otro pedido"
        >
          Hacer Otro Pedido
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
