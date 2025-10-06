import React, { useMemo } from 'react';
import Icon from '../components/Icon';

// Componente: Carrito / Resumen de Pedido
const CartScreen = ({ setView, cart, setCart, address }) => {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const calculateTotals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const deliveryFee = subtotal > 0 ? 5.00 : 0.00; // Tarifa simulada
    const taxes = subtotal > 0 ? 3.00 : 0.00; // Impuestos simulados
    
    // Descuentos profesionales
    const discount = subtotal > 30 ? subtotal * 0.1 : 0; // 10% descuento si gastas más de $30
    
    const total = subtotal + deliveryFee + taxes - discount;
    const savings = discount;
    
    return { 
      subtotal, 
      deliveryFee, 
      taxes, 
      discount, 
      savings,
      total
    };
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

  const handleRemoveItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col animate-fade-in">
        {/* Fondo responsive con animación */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl animate-float-reverse"></div>
          <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
          {/* Header profesional con animación */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
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
                  Tu Carrito
                </h1>
                <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Revisa y programa tu pedido
                </p>
              </div>
              <div className="w-8 h-8"></div>
            </div>
          </div>

          {/* Empty State con animaciones profesionales */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Ilustración principal del carrito vacío */}
            <div className="mb-6 sm:mb-8 md:mb-10 animate-scale-in">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 text-emerald-500/20 animate-pulse-slow">
                <Icon name="EmptyCart" className="w-full h-full" />
              </div>
            </div>
            
            {/* Mensaje profesional con diseño mejorado */}
            <div className="text-center space-y-4 sm:space-y-6 animate-fade-in-up">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 leading-tight" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '800',
                  letterSpacing: '-0.02em'
                }}>
                  Tu carrito está vacío
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-md mx-auto leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Descubre nuestros menús saludables y comienza a armar tu pedido perfecto
                </p>
              </div>
              
              {/* Botón CTA profesional */}
              <div className="pt-2 animate-fade-in-up-delay">
                <button
                  onClick={() => setView('menus')}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-2xl font-bold text-lg sm:text-xl md:text-2xl shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-emerald-500/30 backdrop-blur-sm group relative overflow-hidden"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700'
                  }}
                  aria-label="Explorar menús saludables"
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <div className="relative z-10 flex items-center space-x-3 sm:space-x-4">
                    <Icon name="MenuList" className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Explorar Menús</span>
                    <Icon name="ArrowRight" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
              
              {/* Información adicional profesional */}
              <div className="pt-4 animate-fade-in-up-delay-2">
                <div className="flex items-center justify-center space-x-6 text-sm sm:text-base text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Icon name="Leaf" className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
                      100% Saludable
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
                      Entrega Rápida
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos animados */}
            <div className="mt-8 flex space-x-2 animate-fade-in-up-delay-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col">
      {/* Fondo responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header profesional */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
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
                Tu Carrito
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                Revisa y programa tu pedido
              </p>
            </div>
            <button
              onClick={handleClearCart}
              className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Vaciar carrito"
            >
              <Icon name="Trash" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Banner de Dirección Faltante */}
        {!address.line1 && (
          <div className="mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-gray-200 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Icon name="AlertTriangle" className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 font-medium text-sm sm:text-base" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600'
                  }}>
                    Selecciona Lugar de entrega para continuar.
                  </p>
                </div>
                <button
                  onClick={() => setView('delivery')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg border border-emerald-400/20"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700'
                  }}
                >
                  Configurar Dirección
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Items */}
        <div className="flex-1 space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {cart.map((item, index) => {
            // Generar información dietética basada en los tags del item
            const dietaryInfo = item.tags ? item.tags.join(' • ') : '';
            const weight = item.kcal < 500 ? '350g' : '400g';
            const description = `${weight}${dietaryInfo ? ` • ${dietaryInfo}` : ''}`;
            
            return (
              <div 
                key={item.id} 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 sm:p-4 depth-3 border border-gray-200 hover:shadow-xl hover:bg-white/95 hover:scale-[1.02] hover:border-emerald-300 transition-all duration-500 transform group micro-interaction animate-slide-in-stagger"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {/* Imagen del Plato con Badge de Cantidad */}
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden relative">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 ${item.image ? 'hidden' : 'flex'}`}
                        style={{ display: item.image ? 'none' : 'flex' }}
                      >
                        <Icon name="MenuList" className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                      </div>
                    </div>
                    {/* Badge de Cantidad */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <span className="text-xs font-black" style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '900'
                      }}>
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Detalles del Item */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-1 truncate" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '700'
                        }}>
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500'
                        }}>
                          {description}
                        </p>
                      </div>
                      
                      {/* Precios */}
                      <div className="flex flex-col items-end ml-2">
                        {/* Precio por Unidad */}
                        <p className="text-xs sm:text-sm text-gray-500" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500'
                        }}>
                          ${item.price.toFixed(2)} c/u
                        </p>
                        {/* Precio Total */}
                        <span className="text-base sm:text-lg font-black text-emerald-500" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '900'
                        }}>
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Control de Cantidad - Estilo Pill Mejorado */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-full px-2 sm:px-3 py-1 hover:border-emerald-300 hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md">
              <button
                onClick={() => handleUpdateQuantity(item.id, -1)}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md min-h-[44px] min-w-[44px]"
                aria-label={`Disminuir cantidad de ${item.name}`}
              >
                <Icon name="Minus" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-emerald-600 transition-colors" />
              </button>
                        <span className="text-xs sm:text-sm font-black text-slate-800 mx-2 sm:mx-3 min-w-[20px] text-center" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '900'
                        }}>
                          {item.quantity}
                        </span>
              <button
                onClick={() => handleUpdateQuantity(item.id, 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md min-h-[44px] min-w-[44px]"
                aria-label={`Aumentar cantidad de ${item.name}`}
              >
                <Icon name="Plus" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-emerald-600 transition-colors" />
              </button>
                      </div>
                      
                      {/* Botón Eliminar Mejorado */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-red-50 rounded-full border border-transparent hover:border-red-200 shadow-sm hover:shadow-md min-h-[44px] min-w-[44px]"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Icon name="X" className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
            </div>
          </div>
      </div>
        </div>
            );
          })}
        </div>

        {/* Resumen Financiero Mejorado */}
        <div className="mb-4 sm:mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 depth-3 border border-gray-200 hover:shadow-xl hover:bg-white/95 transition-all duration-500 transform hover:scale-[1.01]">
            {/* Indicador de Ahorro */}
            {calculateTotals.savings > 0 && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-green-800" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700'
                  }}>
                    ¡Ahorras ${calculateTotals.savings.toFixed(2)} en este pedido!
                  </span>
        </div>
      </div>
            )}
            

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium text-sm sm:text-base" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Subtotal
                </span>
                <span className="text-slate-800 font-black text-sm sm:text-base" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '900'
                }}>
                  ${calculateTotals.subtotal.toFixed(2)}
                </span>
              </div>
              
              {/* Descuento */}
              {calculateTotals.discount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium text-sm sm:text-base" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500'
                  }}>
                    Descuento (10%)
                  </span>
                  <span className="text-green-600 font-black text-sm sm:text-base" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '900'
                  }}>
                    -${calculateTotals.discount.toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium text-sm sm:text-base" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Costo de envío
                </span>
                <span className="text-slate-800 font-black text-sm sm:text-base" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '900'
                }}>
                  ${calculateTotals.deliveryFee.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium text-sm sm:text-base" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Impuestos
                </span>
                <span className="text-slate-800 font-black text-sm sm:text-base" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '900'
                }}>
                  ${calculateTotals.taxes.toFixed(2)}
                </span>
              </div>
              
              <div className="border-t-2 border-gray-200 pt-2 sm:pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-slate-800" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '800'
                  }}>
                    Total
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-500" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '900'
                  }}>
                    ${calculateTotals.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor Elegante */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="mx-4 w-2 h-2 bg-emerald-400 rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Botón Principal Mejorado */}
        <div className="pb-4 sm:pb-6">
          <button
            onClick={() => setView('checkout')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 sm:py-5 rounded-3xl font-bold text-base sm:text-lg shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-emerald-400/20 backdrop-blur-sm animate-glow relative overflow-hidden"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}
            aria-label={`Programar pedido por ${calculateTotals.total.toFixed(2)}`}
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Programar pedido</span>
              <Icon name="ArrowRight" className="w-5 h-5" />
            </span>
          </button>
          
          {/* Información adicional */}
          <div className="mt-3 text-center space-y-1">
            <p className="text-xs sm:text-sm text-gray-500" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Se validará tu dirección y disponibilidad al continuar
            </p>
            <p className="text-xs text-emerald-600 font-medium" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}>
              Tiempo estimado de entrega: 30-45 min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
