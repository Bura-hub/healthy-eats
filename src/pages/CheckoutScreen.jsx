import React, { useState, useMemo } from 'react';

// Componente: Checkout / Pago
const CheckoutScreen = ({ setView, cart, address, setCart, setOrderId }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const deliveryFee = subtotal > 0 ? 5.00 : 0.00;
    const total = subtotal + deliveryFee;
    return { total };
  }, [cart]);

  // SIMULACIÓN DE PROCESAMIENTO DE PAGO
  const simulateOrderPlacement = () => {
    if (!address.line1) {
      setError('Dirección inválida. Por favor, verifica la pantalla de Entrega.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulación de latencia de red (1.5 segundos)
    setTimeout(() => {
      setIsLoading(false);

      // Simular un error aleatorio (10% de probabilidad)
      if (Math.random() < 0.1) {
        setError('Tarjeta rechazada (Simulación). Por favor, reintenta o cambia el método.');
        return;
      }

      // Éxito: Guardar datos simulados y navegar a confirmación
      const newOrderId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
      setOrderId(newOrderId);
      setCart([]); // Vaciar carrito después del pedido
      setView('confirmation');

    }, 1500);
  };

  return (
    <div className="p-4 pt-10 pb-20 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Checkout</h1>

      {/* Resumen de Dirección */}
      <div className="card p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex justify-between items-center">
          <span>Entrega en</span>
          <button 
            onClick={() => setView('delivery')} 
            className="text-sm text-primary-600 font-medium"
            aria-label="Cambiar dirección"
          >
            Cambiar
          </button>
        </h2>
        <p className="text-sm font-medium">{address.line1}</p>
        <p className="text-sm text-gray-500">{address.city}, C.P. {address.postalCode}</p>
        <p className="text-xs text-secondary-600 mt-2">Estimado: 30-45 min (Simulado)</p>
      </div>

      {/* Selección de Pago */}
      <div className="card p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Método de Pago</h2>
        
        <div className="space-y-3">
          {['card', 'cash', 'transfer'].map(method => (
            <label key={method} className="flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                aria-label={`Método de pago: ${method}`}
              />
              <span className="ml-3 font-medium capitalize">
                {method === 'card' ? 'Tarjeta (Simulada)' : method === 'cash' ? 'Efectivo (Simulado)' : 'Transferencia (Simulada)'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Resumen Final */}
      <div className="card p-4">
        <h2 className="text-2xl font-extrabold text-primary-700 flex justify-between">
          <span>Total:</span>
          <span>${calculateTotals.total.toFixed(2)}</span>
        </h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-xl mt-4 font-medium flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={simulateOrderPlacement} 
            className="text-red-900 underline ml-2"
            aria-label="Reintentar pago"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* CTA Fija */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-10">
        <button
          onClick={simulateOrderPlacement}
          disabled={isLoading}
          className={`w-full text-white py-4 rounded-xl font-extrabold text-lg shadow-lg transition-colors ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
          }`}
          aria-label={isLoading ? 'Procesando pago...' : `Confirmar y pagar ${calculateTotals.total.toFixed(2)}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando Pago...
            </div>
          ) : (
            `Confirmar y Pagar $${calculateTotals.total.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutScreen;
