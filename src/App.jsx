import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Icon from './components/Icon';
import HomeScreen from './pages/HomeScreen';
import MenusScreen from './pages/MenusScreen';
import CartScreen from './pages/CartScreen';
import DeliveryScreen from './pages/DeliveryScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import ConfirmationScreen from './pages/ConfirmationScreen';
import TrackingScreen from './pages/TrackingScreen';
import ContactModal from './components/ContactModal';

// Componente principal de la aplicación
const App = () => {
  // Estados principales de la aplicación
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({ line1: '', city: '', postalCode: '' });
  const [orderId, setOrderId] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Efecto para controlar el snackbar
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  // Función para renderizar la vista actual
  const renderView = () => {
    switch (view) {
      case 'menus':
        return <MenusScreen setView={setView} cart={cart} setCart={setCart} setShowSnackbar={setShowSnackbar} />;
      case 'cart':
        return <CartScreen setView={setView} cart={cart} setCart={setCart} address={address} />;
      case 'delivery':
        return <DeliveryScreen setView={setView} address={address} setAddress={setAddress} />;
      case 'checkout':
        return <CheckoutScreen setView={setView} cart={cart} address={address} setCart={setCart} setOrderId={setOrderId} />;
      case 'confirmation':
        return <ConfirmationScreen setView={setView} orderId={orderId} address={address} />;
      case 'tracking':
        return <TrackingScreen setView={setView} orderId={orderId} />;
      case 'home':
      default:
        return <HomeScreen setView={setView} cart={cart} address={address} setShowContactModal={setShowContactModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-xl min-h-screen relative">
        <main className="pb-16">{renderView()}</main>
        
        <NavBar 
          view={view} 
          setView={setView} 
          cart={cart} 
          setShowContactModal={setShowContactModal} 
        />
        
        {/* Snackbar para confirmaciones */}
        {showSnackbar && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-gray-800 text-white p-3 rounded-xl shadow-lg flex items-center space-x-3">
              <Icon name="CheckCircle" className="w-5 h-5 text-primary-400" />
              <span>Añadido al carrito (Simulado).</span>
              <button 
                onClick={() => setView('cart')} 
                className="underline text-primary-300 font-medium text-sm ml-2"
              >
                Ir al Carrito
              </button>
            </div>
          </div>
        )}

        <ContactModal 
          isVisible={showContactModal} 
          onClose={() => setShowContactModal(false)} 
        />
      </div>
    </div>
  );
};

export default App;