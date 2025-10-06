import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Icon from './components/Icon';
import OfflineScreen from './components/OfflineScreen';
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
  const [isOffline, setIsOffline] = useState(false);
  const [fromCheckout, setFromCheckout] = useState(false);

  // Efecto para controlar el snackbar
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  // Efecto para detectar estado offline
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Verificar estado inicial
    setIsOffline(!navigator.onLine);

    // Agregar listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Función para manejar reintento de conexión
  const handleRetryConnection = () => {
    setIsOffline(false);
    // Simular verificación de conexión
    setTimeout(() => {
      if (!navigator.onLine) {
        setIsOffline(true);
      }
    }, 1000);
  };

  // Función personalizada para navegación que detecta si viene desde checkout
  const navigateToView = (newView) => {
    if (newView === 'delivery' && view === 'checkout') {
      setFromCheckout(true);
    } else if (newView !== 'delivery') {
      setFromCheckout(false);
    }
    setView(newView);
    
    // Scroll hacia arriba cuando cambie la vista
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para renderizar la vista actual
  const renderView = () => {
    switch (view) {
      case 'menus':
        return <MenusScreen setView={navigateToView} cart={cart} setCart={setCart} setShowSnackbar={setShowSnackbar} />;
      case 'cart':
        return <CartScreen setView={navigateToView} cart={cart} setCart={setCart} address={address} />;
      case 'delivery':
        return <DeliveryScreen setView={navigateToView} setAddress={setAddress} cart={cart} fromCheckout={fromCheckout} />;
      case 'checkout':
        return <CheckoutScreen setView={navigateToView} cart={cart} address={address} setCart={setCart} setOrderId={setOrderId} />;
      case 'confirmation':
        return <ConfirmationScreen setView={navigateToView} orderId={orderId} cart={cart} address={address} setCart={setCart} />;
      case 'tracking':
        return <TrackingScreen setView={navigateToView} orderId={orderId} setOrderId={setOrderId} />;
      case 'home':
      default:
        return <HomeScreen setView={navigateToView} cart={cart} address={address} setShowContactModal={setShowContactModal} />;
    }
  };

  // Si está offline, mostrar pantalla offline
  if (isOffline) {
    return <OfflineScreen onRetry={handleRetryConnection} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-xl min-h-screen relative">
        <main className="pb-16">{renderView()}</main>
        
        <NavBar 
          view={view} 
          setView={navigateToView} 
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
                onClick={() => navigateToView('cart')} 
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