import React, { useState, useEffect } from 'react';
import { formatCOPFromUSD } from '../utils/currency';
import { formatDeliveryTime } from '../utils/timeHelpers';
import Icon from '../components/Icon';

// Componente: Pantalla de Seguimiento de Pedidos
const OrdersScreen = ({ setView, orders = [], setOrderId }) => {
  const [selectedTab, setSelectedTab] = useState('activos'); // 'activos' o 'historial'
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar el tiempo cada minuto para refrescar los contadores
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  // Filtrar pedidos según el tab seleccionado
  const activosOrders = orders.filter(order => 
    ['preparando', 'listo'].includes(order.status)
  );
  
  const historialOrders = orders.filter(order => 
    ['completado', 'cancelado'].includes(order.status)
  );

  const displayedOrders = selectedTab === 'activos' ? activosOrders : historialOrders;

  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch(status) {
      case 'preparando':
        return 'En preparación';
      case 'listo':
        return 'Listo para recoger';
      case 'completado':
        return 'Completado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'preparando':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'listo':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para calcular el tiempo hasta la recogida
  const getTimeUntilPickup = (pickupTime) => {
    if (!pickupTime) return null;
    
    // Usar currentTime para que se actualice automáticamente
    const pickup = new Date(pickupTime);
    const diffMs = pickup - currentTime;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) {
      return 'Ya disponible';
    } else if (diffMins < 60) {
      return `En ${diffMins} min`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return mins > 0 ? `En ${hours}h ${mins}min` : `En ${hours}h`;
    }
  };

  // Función para obtener el mensaje de estado según el estado y tiempo
  const getStatusMessage = (status, pickupTime) => {
    if (!pickupTime) return getStatusText(status);
    
    // Usar currentTime para que se actualice automáticamente
    const pickup = new Date(pickupTime);
    const diffMs = pickup - currentTime;
    const diffMins = Math.round(diffMs / 60000);
    
    if (status === 'listo') {
      return 'Listo para recoger';
    } else if (status === 'preparando') {
      if (diffMins <= 20 && diffMins >= 15) {
        return 'Listo en 15-20 min';
      } else if (diffMins < 15 && diffMins > 0) {
        return `Listo en ${diffMins} min`;
      } else if (diffMins <= 0) {
        return 'Casi listo';
      } else {
        return 'En preparación';
      }
    }
    return getStatusText(status);
  };

  // Función para obtener el ícono del estado
  const getStatusIcon = (status) => {
    switch(status) {
      case 'preparando':
        return 'Clock';
      case 'listo':
        return 'CheckCircle';
      case 'completado':
        return 'Check';
      case 'cancelado':
        return 'X';
      default:
        return 'Info';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col animate-fade-in">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl animate-float-reverse"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight" style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Mis Pedidos
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            Seguimiento y historial de tus pedidos
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setSelectedTab('activos')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedTab === 'activos'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-emerald-300'
            }`}
          >
            Activos ({activosOrders.length})
          </button>
          <button
            onClick={() => setSelectedTab('historial')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedTab === 'historial'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-emerald-300'
            }`}
          >
            Historial ({historialOrders.length})
          </button>
        </div>

        {/* Lista de Pedidos */}
        {displayedOrders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-32 h-32 mb-6 text-slate-300">
              <Icon name="ClipboardList" className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              {selectedTab === 'activos' ? 'No tienes pedidos activos' : 'No hay pedidos en el historial'}
            </h3>
            <p className="text-slate-500 mb-6">
              {selectedTab === 'activos' 
                ? 'Haz tu primer pedido y aparecerá aquí'
                : 'Tus pedidos anteriores aparecerán aquí'}
            </p>
            <button
              onClick={() => setView('menus')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Ver Menús
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedOrders.map((order, index) => (
              <div 
                key={order.id} 
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-stagger"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Header del pedido */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Pedido #{order.id}</p>
                    <p className="text-xs text-slate-400">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                    <Icon name={getStatusIcon(order.status)} className="w-3 h-3 inline mr-1" />
                    {getStatusMessage(order.status, order.pickupTime)}
                  </span>
                </div>

                {/* Restaurante y hora */}
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{order.restaurant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {order.pickupTime && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">{formatDeliveryTime(order.pickupTime)}</span>
                      </div>
                    )}
                    {order.pickupTime && order.status === 'preparando' && (
                      <div className="flex items-center space-x-1 bg-emerald-50 px-2 py-1 rounded-lg">
                        <Icon name="Clock" className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">{getTimeUntilPickup(order.pickupTime)}</span>
                      </div>
                    )}
                    {order.pickupTime && order.status === 'listo' && (
                      <div className="flex items-center space-x-1 bg-teal-50 px-2 py-1 rounded-lg">
                        <Icon name="CheckCircle" className="w-3 h-3 text-teal-600" />
                        <span className="text-xs font-semibold text-teal-700">Disponible ahora</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">{item.quantity}x {item.name}</span>
                      <span className="font-semibold text-slate-800">{formatCOPFromUSD(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="font-black text-lg text-emerald-600">{formatCOPFromUSD(order.total)}</span>
                </div>

                {/* Acciones */}
                <div className="mt-4 flex space-x-2">
                  {order.status === 'listo' && (
                    <button
                      onClick={() => {
                        if (setOrderId) setOrderId(order.id);
                        setView('tracking');
                      }}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                    >
                      Ver Detalles
                    </button>
                  )}
                  {order.status === 'preparando' && (
                    <button
                      onClick={() => {
                        if (setOrderId) setOrderId(order.id);
                        setView('tracking');
                      }}
                      className="flex-1 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-200 transition-all duration-300"
                    >
                      Seguir Pedido
                    </button>
                  )}
                  {order.status === 'completado' && (
                    <button
                      className="flex-1 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-all duration-300"
                    >
                      Volver a Pedir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;

