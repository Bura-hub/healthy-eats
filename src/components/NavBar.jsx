import React from 'react';
import Icon from './Icon';

// Componente de navegación inferior profesional
const NavBar = ({ view, setView, cart, setShowContactModal }) => {
  const navItems = [
    { name: 'Inicio', target: 'home', icon: 'Home' },
    { name: 'Menús', target: 'menus', icon: 'MenuList' },
    { name: 'Carrito', target: 'cart', icon: 'ShoppingCart', hasBadge: true },
    { name: 'Entrega', target: 'delivery', icon: 'MapPin' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl z-20 border-t border-gray-200/50">
      {/* Indicador de seguridad */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
      
      <div className="px-4 py-2">
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
              aria-label={`Ir a ${item.name}`}
            >
              {/* Badge de carrito mejorado */}
              {item.hasBadge && cartCount > 0 && (
                <div className="absolute -top-1 -right-1 z-10">
                  <div className="relative">
                    <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                      <span className="text-xs font-black text-white" style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '900'
                      }}>
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    </div>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-75 animate-ping"></div>
                  </div>
                </div>
              )}
              
              {/* Icono con efecto hover */}
              <div className={`transition-all duration-300 ${
                view === item.target ? 'transform scale-110' : 'group-hover:scale-110'
              }`}>
                <Icon name={item.icon} className={`w-6 h-6 transition-colors duration-300 ${
                  view === item.target ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-500'
                }`} />
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
              
              {/* Indicador activo */}
              {view === item.target && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              )}
            </button>
          ))}
          
          {/* Botón de contacto mejorado */}
          <button
            onClick={() => setShowContactModal(true)}
            className="flex flex-col items-center p-3 rounded-2xl text-gray-500 hover:text-emerald-500 hover:bg-gray-50 hover:scale-105 transition-all duration-300 w-1/4 group"
            aria-label="Abrir contactos"
          >
            <div className="transition-all duration-300 group-hover:scale-110">
              <Icon name="Settings" className="w-6 h-6 transition-colors duration-300 group-hover:text-emerald-500" />
            </div>
            <span className="text-xs mt-1 font-medium transition-colors duration-300 group-hover:text-emerald-500" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Contactos
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default NavBar;
