import React, { useMemo } from 'react';
import Icon from '../components/Icon';

// Componente: Carrito / Resumen de Pedido
const CartScreen = ({ setView, cart, setCart, address }) => {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const calculateTotals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const deliveryFee = subtotal > 0 ? 5.00 : 0.00; // Tarifa simulada
    const total = subtotal + deliveryFee;
    return { subtotal, deliveryFee, total };
  }, [cart]);

  const handleUpdateQuantity = (id, change) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + change) };
      }
      return item;
    }).filter(item => item.quantity > 0); // Eliminar si la cantidad es 0
    setCart(newCart);
  };

  if (cartCount === 0) {
    return (
      <div className="p-4 pt-10 pb-20 min-h-screen flex flex-col items-center justify-center text-center">
        <Icon name="ShoppingCart" className="w-20 h-20 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Tu carrito está triste!</h1>
        <p className="text-gray-500 mb-6">Parece que aún no has seleccionado ningún menú saludable.</p>
        <button
          onClick={() => setView('menus')}
          className="btn-primary"
          aria-label="Ir a menús del día"
        >
          Ver Menús del Día
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pt-10 pb-40 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Tu Pedido</h1>
      
      {/* Lista de Items */}
      <div className="space-y-4 mb-8">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex space-x-4 items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 text-xs text-center p-1 flex items-center justify-center">
              {item.kcal} kcal
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
              <p className="text-sm text-primary-700 font-semibold">${item.price.toFixed(2)} c/u</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleUpdateQuantity(item.id, -1)}
                className="w-7 h-7 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 flex items-center justify-center"
                aria-label={`Disminuir cantidad de ${item.name}`}
              >
                <Icon name="Minus" className="w-3 h-3" />
              </button>
              <span className="text-lg font-bold w-4 text-center">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, 1)}
                className="w-7 h-7 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 flex items-center justify-center"
                aria-label={`Aumentar cantidad de ${item.name}`}
              >
                <Icon name="Plus" className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de Totales */}
      <div className="card p-6 space-y-2">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Resumen</h2>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cartCount} productos)</span>
          <span>${calculateTotals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Costo de Envío (Simulado)</span>
          <span>${calculateTotals.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="pt-3 flex justify-between font-extrabold text-xl text-primary-700 border-t border-dashed mt-2">
          <span>Total a Pagar</span>
          <span>${calculateTotals.total.toFixed(2)}</span>
        </div>
      </div>

      {/* CTA Fija */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-10">
        {!address.line1 ? (
          <div 
            className="text-center p-3 bg-red-100 text-red-700 rounded-xl font-medium cursor-pointer" 
            onClick={() => setView('delivery')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setView('delivery');
              }
            }}
            aria-label="Configurar dirección de entrega"
          >
            🚨 Selecciona un Lugar de Entrega antes de continuar.
          </div>
        ) : (
          <button
            onClick={() => setView('checkout')}
            className="btn-primary w-full text-lg py-4"
            aria-label={`Proceder al checkout por ${calculateTotals.total.toFixed(2)}`}
          >
            Programar Pedido (${calculateTotals.total.toFixed(2)})
          </button>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
