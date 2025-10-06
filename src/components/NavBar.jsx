import React from 'react';
import Icon from './Icon';

// Componente de navegación inferior profesional mejorado
const NavBar = ({ view, setView, cart, setShowContactModal }) => {
  const navItems = [
    { 
      name: 'Inicio', 
      target: 'home', 
      icon: 'Home',
      description: 'Pantalla principal'
    },
    { 
      name: 'Menús', 
      target: 'menus', 
      icon: 'MenuList',
      description: 'Ver menús disponibles'
    },
    { 
      name: 'Carrito', 
      target: 'cart', 
      icon: 'ShoppingCart', 
      hasBadge: true,
      description: 'Revisar pedido'
    },
    { 
      name: 'Entrega', 
      target: 'delivery', 
      icon: 'MapPin',
      description: 'Configurar dirección'
    },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  // Determinar si hay un pedido en progreso
  const hasActiveOrder = ['checkout', 'confirmation', 'tracking'].includes(view);
  const isInOrderFlow = ['cart', 'delivery', 'checkout', 'confirmation', 'tracking'].includes(view);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl z-20 border-t border-gray-200/50">
      {/* Indicador de seguridad mejorado */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </div>
      
      {/* Indicador de progreso del pedido */}
      {isInOrderFlow && (
        <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200/50">
          <div className="flex items-center justify-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${['cart', 'delivery', 'checkout', 'confirmation', 'tracking'].includes(view) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
              <span className={`text-xs font-medium ${['cart', 'delivery', 'checkout', 'confirmation', 'tracking'].includes(view) ? 'text-emerald-700' : 'text-gray-500'}`}>
                Carrito
              </span>
            </div>
            <div className="w-4 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${['delivery', 'checkout', 'confirmation', 'tracking'].includes(view) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
              <span className={`text-xs font-medium ${['delivery', 'checkout', 'confirmation', 'tracking'].includes(view) ? 'text-emerald-700' : 'text-gray-500'}`}>
                Entrega
              </span>
            </div>
            <div className="w-4 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${['checkout', 'confirmation', 'tracking'].includes(view) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
              <span className={`text-xs font-medium ${['checkout', 'confirmation', 'tracking'].includes(view) ? 'text-emerald-700' : 'text-gray-500'}`}>
                Pago
              </span>
            </div>
            <div className="w-4 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${['confirmation', 'tracking'].includes(view) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
              <span className={`text-xs font-medium ${['confirmation', 'tracking'].includes(view) ? 'text-emerald-700' : 'text-gray-500'}`}>
                Confirmado
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="px-4 py-3">
        <div className="flex justify-around max-w-lg mx-auto">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => setView(item.target)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 relative w-1/4 group ${
                view === item.target 
                  ? 'text-emerald-600 bg-emerald-50 shadow-lg transform scale-105' 
                  : 'text-gray-500 hover:text-emerald-500 hover:bg-gray-50 hover:scale-105'
              }`}
              aria-label={`Ir a ${item.name} - ${item.description}`}
              title={`${item.name} - ${item.description}`}
            >
              {/* Badge de carrito mejorado */}
              {item.hasBadge && cartCount > 0 && (
                <div className="absolute -top-1 -right-1 z-10">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                      <span className="text-xs font-black text-white" style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '900'
                      }}>
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    </div>
                    {/* Efecto de brillo mejorado */}
                    <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-75 animate-ping"></div>
                    {/* Efecto de pulso adicional */}
                    <div className="absolute -inset-1 w-8 h-8 bg-red-400/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
              
              {/* Icono con efecto hover mejorado */}
              <div className={`transition-all duration-300 relative ${
                view === item.target ? 'transform scale-110' : 'group-hover:scale-110'
              }`}>
                <Icon name={item.icon} className={`w-6 h-6 transition-colors duration-300 ${
                  view === item.target ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-500'
                }`} />
                {/* Efecto de brillo en el icono */}
                {view === item.target && (
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm"></div>
                )}
              </div>
              
              {/* Texto con tipografía mejorada */}
              <span className={`text-xs mt-1 font-medium transition-colors duration-300 ${
                view === item.target ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-500'
              }`} style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: view === item.target ? '600' : '500'
              }}>
                {item.name}
              </span>
              
              {/* Indicador activo mejorado */}
              {view === item.target && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                </div>
              )}
              
              {/* Efecto de hover adicional */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>
            </button>
          ))}
          
          {/* Botón de contacto mejorado */}
          <button
            onClick={() => setShowContactModal(true)}
            className="flex flex-col items-center p-3 rounded-2xl text-gray-500 hover:text-emerald-500 hover:bg-gray-50 hover:scale-105 transition-all duration-300 w-1/4 group relative"
            aria-label="Abrir soporte y contactos"
            title="Soporte y Contactos"
          >
            <div className="transition-all duration-300 group-hover:scale-110 relative">
              <Icon name="HelpCircle" className="w-6 h-6 transition-colors duration-300 group-hover:text-emerald-500" />
              {/* Indicador de notificación */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <span className="text-xs mt-1 font-medium transition-colors duration-300 group-hover:text-emerald-500" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Soporte
            </span>
            
            {/* Efecto de hover adicional */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>
          </button>
        </div>
      </div>
      
      {/* Indicador de estado de conexión */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Conectado</span>
        </div>
      </div>
    </footer>
  );
};

export default NavBar;
