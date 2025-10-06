import React from 'react';
import Icon from './Icon';

// Componente de navegación inferior
const NavBar = ({ view, setView, cart, setShowContactModal }) => {
  const navItems = [
    { name: 'Inicio', target: 'home', icon: 'Home' },
    { name: 'Menús', target: 'menus', icon: 'MenuList' },
    { name: 'Carrito', target: 'cart', icon: 'ShoppingCart', hasBadge: true },
    { name: 'Entrega', target: 'delivery', icon: 'MapPin' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-20 border-t border-gray-100 p-2">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => setView(item.target)}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              view === item.target ? 'text-primary-600 font-semibold' : 'text-gray-500 hover:text-primary-500'
            } relative w-1/4`}
            aria-label={`Ir a ${item.name}`}
          >
            {item.hasBadge && cartCount > 0 && (
              <span className="absolute top-0 right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
            <Icon name={item.icon} className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
        <button
          onClick={() => setShowContactModal(true)}
          className="flex flex-col items-center p-2 rounded-xl text-gray-500 hover:text-primary-500 w-1/4"
          aria-label="Abrir contactos"
        >
          <Icon name="Settings" className="w-6 h-6" />
          <span className="text-xs mt-1">Contactos</span>
        </button>
      </div>
    </footer>
  );
};

export default NavBar;
