import React from 'react';
import Icon from './Icon';

// Componente: Modal de Confirmación para Cancelar Pedido con diseño profesional
const CancelOrderModal = ({ isVisible, onClose, onConfirm, orderId }) => {
  if (!isVisible) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-gray-200/50 transform transition-all duration-300 scale-100">
        {/* Header profesional */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '900'
          }}>
            Cancelar Pedido
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors duration-200 hover:scale-110 active:scale-95"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        <div className="space-y-6">
          {/* Icono de advertencia profesional */}
          <div className="flex justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg border-4 border-red-200/50 animate-pulse">
              <Icon name="AlertTriangle" className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
            </div>
          </div>

          {/* Mensaje de confirmación profesional */}
          <div className="text-center">
            <p className="text-gray-700 text-lg md:text-xl font-semibold mb-3 leading-relaxed" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}>
              ¿Estás seguro de que quieres cancelar este pedido?
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-4">
              <p className="text-gray-500 text-sm font-medium mb-1">Pedido:</p>
              <p className="text-gray-900 text-lg font-bold" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700'
              }}>
                {orderId}
              </p>
            </div>
          </div>

          {/* Información adicional profesional */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 md:p-5 shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name="Info" className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-yellow-800 text-sm md:text-base font-semibold mb-2" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}>
                  Información importante:
                </p>
                <ul className="text-yellow-700 text-xs md:text-sm space-y-1 leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                    <span>Esta acción no se puede deshacer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                    <span>Se procesará el reembolso automáticamente</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                    <span>Recibirás confirmación por email</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones de acción profesionales */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 py-3 md:py-4 rounded-2xl font-semibold text-sm md:text-base hover:from-gray-300 hover:to-gray-400 transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl border border-gray-300/50"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600'
              }}
              aria-label="Mantener el pedido"
            >
              Mantener Pedido
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 md:py-4 rounded-2xl font-semibold text-sm md:text-base hover:from-red-600 hover:to-red-700 transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl border border-red-400/50 transform hover:scale-105"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700'
              }}
              aria-label="Confirmar cancelación del pedido"
            >
              Cancelar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
