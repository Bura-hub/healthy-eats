import React, { useState, useMemo } from 'react';
import { formatCOPFromUSD } from '../utils/currency';
import { generateTimeSlots, formatDeliveryTime, isValidDeliveryTime } from '../utils/timeHelpers';
import Icon from '../components/Icon';

// Componente: Checkout / Pago y Confirmación - Diseño Profesional
const CheckoutScreen = ({ setView, cart, address, setOrderId, setDeliveryTime, setOrders }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [cardDigits, setCardDigits] = useState('4242');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
  
  // Generar slots de tiempo disponibles (se recalcula dinámicamente)
  const timeSlots = useMemo(() => {
    // Forzar recálculo incluyendo timestamp para que sea reactivo
    return generateTimeSlots(12);
  }, []); // Mantenemos [] pero la función genera nuevas fechas cada vez

  const calculateTotals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const deliveryFee = 0.00; // sin envío en modo recogida
    const discount = subtotal > 0 ? 0.20 : 0.00;
    const total = subtotal - discount; // envío 0
    return { subtotal, deliveryFee, discount, total };
  }, [cart]);

  // SIMULACIÓN DE PROCESAMIENTO DE PAGO
  const simulateOrderPlacement = () => {
    if (!address.line1) {
      setError('Restaurante requerido. Por favor, selecciona un restaurante.');
      return;
    }

    if (!selectedDeliveryTime) {
      setError('Hora de recogida requerida. Por favor, selecciona cuándo recogerás tu pedido.');
      return;
    }

    if (!isValidDeliveryTime(selectedDeliveryTime)) {
      setError('La hora de recogida debe ser al menos 45 minutos después de ahora.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulación de latencia de red (2 segundos)
    setTimeout(() => {
      setIsLoading(false);

      // Simular un error aleatorio (15% de probabilidad)
      if (Math.random() < 0.15) {
        setError('¡Pago Rechazado! Por favor, verifica la información o reintenta.');
        return;
      }

      // Éxito: Guardar datos simulados y navegar a confirmación
      const newOrderId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
      setOrderId(newOrderId);
      if (setDeliveryTime) {
        setDeliveryTime(selectedDeliveryTime);
      }
      
      // Crear el nuevo pedido
      if (setOrders) {
        const newOrder = {
          id: newOrderId,
          date: new Date().toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          restaurant: address.line1,
          pickupTime: selectedDeliveryTime,
          items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: calculateTotals.total,
          status: 'preparando' // Estados: preparando, listo, completado, cancelado
        };
        
        setOrders(prevOrders => [...prevOrders, newOrder]);
      }
      
      // No vaciar el carrito aquí - se vaciará después de mostrar la confirmación
      setView('confirmation');

    }, 2000);
  };

  const getItemIcon = (itemName) => {
    if (itemName.toLowerCase().includes('bowl') || itemName.toLowerCase().includes('verde')) return 'Bowl';
    if (itemName.toLowerCase().includes('kombucha') || itemName.toLowerCase().includes('bebida')) return 'Coffee';
    if (itemName.toLowerCase().includes('cookie') || itemName.toLowerCase().includes('galleta')) return 'Cookie';
    return 'Utensils';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col animate-fade-in">
      {/* Fondo decorativo profesional con animaciones */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl animate-float-reverse"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header profesional con animaciones */}
        <div className="mb-6 md:mb-8 animate-slide-in-from-bottom">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight animate-fade-in-up" style={{
                fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Pago y Confirmación
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed animate-fade-in-up" style={{
                fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                fontWeight: '400',
                animationDelay: '0.2s',
                animationFillMode: 'both'
              }}>
                Verifica tu pedido y confirma el pago
              </p>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-all duration-300 hover:scale-110 animate-scale-in" style={{
              animationDelay: '0.4s',
              animationFillMode: 'both'
            }}>
              <Icon name="HelpCircle" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in-up" style={{
          animationDelay: '0.6s',
          animationFillMode: 'both'
        }}>
          {/* Sección 1: Resumen de Pedido */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Icon name="ShoppingBag" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
              <span>Resumen de Pedido</span>
            </h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <Icon name="ShoppingBag" className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-lg" style={{
                      fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '600'
                    }}>{cart.length} ítems seleccionados</p>
                    <p className="text-sm text-slate-500 font-medium" style={{
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '400'
                    }}>Toca para ver detalles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-emerald-600 font-semibold" style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '500'
                  }}>Ver detalles del carrito</span>
                  <Icon 
                    name={showOrderSummary ? "ChevronUp" : "ChevronDown"} 
                    className="w-4 h-4 text-slate-400 transition-transform duration-300" 
                  />
                </div>
              </button>
              
              {showOrderSummary && (
                <div className="border-t border-slate-200/50 p-4 space-y-3 animate-slide-down">
                  {cart.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between animate-fade-in-up" style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}>
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-slate-100 rounded-lg">
                          <Icon name={getItemIcon(item.name)} className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800" style={{
                            fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                            fontWeight: '500'
                          }}>{item.name}</p>
                          <p className="text-sm text-slate-500" style={{
                            fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                            fontWeight: '400'
                          }}>
                            {item.quantity} porción{item.quantity > 1 ? 'es' : ''} • 
                            {item.tags && item.tags.length > 0 ? ` ${item.tags[0]}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800" style={{
                        fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                        fontWeight: '600'
                      }}>{formatCOPFromUSD(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sección 2: Restaurante */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Icon name="MapPin" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
              <span>Restaurante</span>
            </h2>
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl border p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
              !address.line1 ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${
                    !address.line1 ? 'bg-amber-100' : 'bg-emerald-100'
                  }`}>
                    <Icon name="MapPin" className={`w-5 h-5 ${
                      !address.line1 ? 'text-amber-600' : 'text-emerald-600'
                    }`} />
                  </div>
                  <div>
                    {address.line1 ? (
                      <>
                        <p className="font-bold text-slate-800 text-lg" style={{
                          fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '600'
                        }}>{address.line1}</p>
                      </>
                    ) : (
                      <p className="text-slate-600 text-sm font-medium" style={{
                        fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                        fontWeight: '400'
                      }}>
                        Selecciona un restaurante
                      </p>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setView('delivery')} 
                  className={`flex items-center space-x-1 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl border ${
                    !address.line1 
                      ? 'text-amber-600 hover:text-amber-700 bg-amber-50 border-amber-200' 
                      : 'text-emerald-600 hover:text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <Icon name={!address.line1 ? "Plus" : "Edit"} className="w-4 h-4" />
                  <span className="text-sm font-semibold" style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '500'
                  }}>
                    {!address.line1 ? 'Seleccionar' : 'Cambiar'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Sección 2.5: Hora de Recogida */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Icon name="Clock" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
              <span>Hora de Recogida</span>
            </h2>
            <div className={`bg-white/90 backdrop-blur-sm rounded-2xl border p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
              !selectedDeliveryTime ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl mt-1 ${
                    !selectedDeliveryTime ? 'bg-amber-100' : 'bg-emerald-100'
                  }`}>
                    <Icon name="Clock" className={`w-5 h-5 ${
                      !selectedDeliveryTime ? 'text-amber-600' : 'text-emerald-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="delivery-time" className="block text-sm font-semibold text-slate-700 mb-2" style={{
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '600'
                    }}>
                      Selecciona cuándo recogerás tu pedido
                    </label>
                    <select
                      id="delivery-time"
                      value={selectedDeliveryTime}
                      onChange={(e) => setSelectedDeliveryTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      style={{
                        fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                        fontWeight: '500'
                      }}
                    >
                      <option value="">Selecciona una hora...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-slate-500 flex items-center" style={{
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '400'
                    }}>
                      <Icon name="Info" className="w-3 h-3 mr-1" />
                      Tiempo mínimo de preparación: 45 minutos
                    </p>
                  </div>
                </div>
                
                {selectedDeliveryTime && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl animate-slide-down">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <p className="text-sm font-semibold text-emerald-800" style={{
                        fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                        fontWeight: '600'
                      }}>
                        Recoge tu pedido: {formatDeliveryTime(selectedDeliveryTime)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sección 3: Método de Pago */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Icon name="CreditCard" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
              <span>Método de Pago</span>
            </h2>
            <div className="space-y-3">
              {/* Tarjeta */}
              <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                paymentMethod === 'card' 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-lg' 
                  : 'border-slate-200 hover:bg-slate-50 hover:border-emerald-300'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl">
                        <Icon name="CreditCard" className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg" style={{
                          fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '600'
                        }}>Tarjeta</p>
                        <p className="text-sm text-slate-500 font-medium" style={{
                          fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '400'
                        }}>Visa •••• 4242</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200" style={{
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '600'
                    }}>
                      Recomendado
                    </span>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="mt-4 animate-slide-down">
                      <label className="block text-sm font-semibold text-slate-700 mb-2" style={{
                        fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                        fontWeight: '500'
                      }}>
                        Últimos 4 dígitos
                      </label>
                      <input
                        type="text"
                        value={cardDigits}
                        onChange={(e) => setCardDigits(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-lg font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="•••• 4242"
                        maxLength="4"
                        style={{
                          fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '600'
                        }}
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Efectivo */}
              <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                paymentMethod === 'cash' 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-lg' 
                  : 'border-slate-200 hover:bg-slate-50 hover:border-emerald-300'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl">
                        <Icon name="DollarSign" className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg" style={{
                          fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '600'
                        }}>Efectivo</p>
                        <p className="text-sm text-slate-500 font-medium" style={{
                          fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '400'
                        }}>Paga al repartidor</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200" style={{
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '600'
                    }}>
                      Sin cambio
                    </span>
                  </div>
                </div>
              </label>

              {/* Transferencia */}
              <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                paymentMethod === 'transfer' 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-lg' 
                  : 'border-slate-200 hover:bg-slate-50 hover:border-emerald-300'
              }`}>
              <input
                type="radio"
                name="payment"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl">
                        <Icon name="Building" className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg" style={{
                          fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '600'
                        }}>Transferencia</p>
                        <p className="text-sm text-slate-500 font-medium" style={{
                          fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                          fontWeight: '400'
                        }}>Banco Saludable</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200" style={{
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '600'
                    }}>
                      24/7
                    </span>
                  </div>
                </div>
            </label>
        </div>
      </div>

          {/* Sección 4: Resumen Final */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Icon name="CheckCircle" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
              <span>Resumen Final</span>
        </h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium" style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '400'
                  }}>Subtotal</span>
                  <span className="font-bold text-slate-800" style={{
                    fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '600'
                  }}>{formatCOPFromUSD(calculateTotals.subtotal)}</span>
                </div>
                {/* Envío eliminado en modo recogida */}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium" style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '400'
                  }}>Descuento</span>
                  <span className="font-bold text-slate-800" style={{
                    fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '600'
                  }}>-{formatCOPFromUSD(calculateTotals.discount)}</span>
                </div>
                <div className="border-t-2 border-slate-200 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-slate-800 text-lg" style={{
                      fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '700'
                    }}>Total a pagar</span>
                    <span className="text-2xl font-black text-emerald-600" style={{
                      fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: '800'
                    }}>{formatCOPFromUSD(calculateTotals.total)}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 font-medium" style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '400'
                  }}>
                    <Icon name="Clock" className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>
                      {selectedDeliveryTime 
                        ? `Listo para recoger: ${formatDeliveryTime(selectedDeliveryTime)}`
                        : 'Selecciona tu hora de recogida'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
      </div>

      {/* Error Message */}
      {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 animate-slide-in-from-top">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon name="X" className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800" style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '500'
                  }}>{error}</p>
                </div>
          <button 
            onClick={simulateOrderPlacement} 
                  className="text-sm font-bold text-red-600 hover:text-red-700 underline transition-colors duration-300"
                  style={{
                    fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
                    fontWeight: '600'
                  }}
          >
            Reintentar
          </button>
              </div>
        </div>
      )}
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 space-y-3 animate-fade-in-up" style={{
          animationDelay: '0.8s',
          animationFillMode: 'both'
        }}>
        <button
          onClick={simulateOrderPlacement}
          disabled={isLoading}
            className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isLoading 
                ? 'bg-slate-400 text-white cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl border-2 border-emerald-400/20 backdrop-blur-sm'
            }`}
            style={{
              fontFamily: '"SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
              fontWeight: '600'
            }}
        >
          {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
                <span>Procesando Pago...</span>
            </div>
          ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Confirmar y Pagar</span>
                <Icon name="ArrowRight" className="w-5 h-5" />
              </div>
          )}
        </button>
          
          <button
            onClick={() => setView('cart')}
            className="w-full py-3 sm:py-4 rounded-2xl font-semibold text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{
              fontFamily: '"SF Pro Text", "Helvetica Neue", "Arial", sans-serif',
              fontWeight: '500'
            }}
          >
            Volver al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;