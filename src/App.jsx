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
import OrdersScreen from './pages/OrdersScreen';
import ContactModal from './components/ContactModal';

// Componente principal de la aplicación
const App = () => {
  // Estados principales de la aplicación
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({ line1: '', city: '', postalCode: '' });
  const [orderId, setOrderId] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [orders, setOrders] = useState([]);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', action: null });
  const [showContactModal, setShowContactModal] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [fromCheckout, setFromCheckout] = useState(false);

  // Función helper para mostrar snackbar
  const showSnackbarMessage = (message, action = null) => {
    setSnackbar({ show: true, message, action });
  };

  // Efecto para controlar el snackbar
  useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => setSnackbar({ show: false, message: '', action: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.show]);

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
        return <MenusScreen setView={navigateToView} cart={cart} setCart={setCart} showSnackbar={showSnackbarMessage} />;
      case 'cart':
        return <CartScreen setView={navigateToView} cart={cart} setCart={setCart} address={address} />;
      case 'delivery':
        return <DeliveryScreen setView={navigateToView} setAddress={setAddress} cart={cart} fromCheckout={fromCheckout} showSnackbar={showSnackbarMessage} />;
      case 'checkout':
        return <CheckoutScreen setView={navigateToView} cart={cart} address={address} setOrderId={setOrderId} setDeliveryTime={setDeliveryTime} setOrders={setOrders} />;
      case 'confirmation':
        return <ConfirmationScreen setView={navigateToView} orderId={orderId} cart={cart} address={address} setCart={setCart} deliveryTime={deliveryTime} orders={orders} setOrders={setOrders} />;
      case 'tracking':
        return <TrackingScreen setView={navigateToView} orderId={orderId} setOrderId={setOrderId} orders={orders} deliveryTime={deliveryTime} />;
      case 'orders':
        return <OrdersScreen setView={navigateToView} orders={orders} setOrderId={setOrderId} />;
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
        {snackbar.show && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-24 pointer-events-none px-4 animate-fade-in">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center space-x-3 sm:space-x-4 pointer-events-auto max-w-md w-full border border-gray-700/50 backdrop-blur-sm animate-slide-up">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircle" className="w-6 h-6 sm:w-7 sm:h-7 text-primary-400" />
              </div>
              <span className="flex-1 font-medium text-sm sm:text-base leading-relaxed">{snackbar.message}</span>
              {snackbar.action && (
                <button 
                  onClick={() => {
                    snackbar.action.onClick();
                    setSnackbar({ show: false, message: '', action: null });
                  }}
                  className="bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap border border-primary-500/30"
                >
                  {snackbar.action.label}
                </button>
              )}
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