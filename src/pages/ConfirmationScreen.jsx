import React, { useEffect, useState } from 'react';
import Icon from '../components/Icon';

// Componente: Confirmación de Pedido - Diseño Profesional Mejorado
const ConfirmationScreen = ({ setView, orderId, cart, address, setCart }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Trigger success animation on mount with staggered timing
    const timer1 = setTimeout(() => setShowAnimation(true), 100);
    const timer2 = setTimeout(() => setShowContent(true), 600);
    const timer3 = setTimeout(() => setShowOrderDetails(true), 1000);
    const timer4 = setTimeout(() => setShowItems(true), 1300);
    const timer5 = setTimeout(() => setShowContact(true), 1600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // Calculate order summary with detailed breakdown
  const orderSummary = cart.reduce((acc, item) => {
    acc.subtotal += item.price * item.quantity;
    acc.items += item.quantity;
    acc.itemsList.push({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    });
    return acc;
  }, { subtotal: 0, items: 0, itemsList: [] });

  const deliveryFee = 5.00;
  const taxes = orderSummary.subtotal * 0.08; // 8% tax
  const total = orderSummary.subtotal + deliveryFee + taxes;

  // Generate estimated delivery time
  const estimatedTime = new Date();
  estimatedTime.setMinutes(estimatedTime.getMinutes() + 45);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col animate-fade-in">
      {/* Fondo responsive con animación mejorada */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl animate-float-reverse"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl animate-float-slow"></div>
        {/* Partículas de celebración */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping opacity-60" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header profesional con animación mejorada */}
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
                ¡Pedido Confirmado!
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                Todo listo. Enfócate en tus próximos pasos.
              </p>
            </div>
            <div className="w-8 h-8"></div>
          </div>
        </div>

        {/* Success Animation Mejorada */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className={`relative transition-all duration-700 ${showAnimation ? 'scale-110' : 'scale-100'}`}>
            {/* Anillo exterior con gradiente mejorado */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
            
            {/* Anillo intermedio con efecto de pulso */}
            <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 rounded-full opacity-60 animate-pulse" style={{animationDuration: '3s'}}></div>
            
            {/* Círculo principal con efecto de brillo */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white/80 backdrop-blur-sm relative overflow-hidden">
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" style={{animationDuration: '2s'}}></div>
              <Icon name="CheckCircle" className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 relative z-10" />
            </div>
            
            {/* Partículas de celebración alrededor del check */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-0 -left-3 w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Success Message Mejorada */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4 leading-tight" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '800'
            }}>
              ¡Gracias por tu pedido!
            </h2>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 md:px-8">
              Tu comida saludable está en preparación
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-600 font-medium">Procesando tu pedido</span>
            </div>
          </div>

          {/* Order ID Badge Mejorado */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 md:px-8 md:py-4 rounded-2xl border border-emerald-200/50 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-green-200/20 animate-pulse"></div>
              <span className="text-emerald-800 font-bold text-sm md:text-base relative z-10">ID Pedido: {orderId}</span>
            </div>
          </div>

          {/* Order Summary Card - Detallado */}
          <div className={`bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-all duration-500 ${showOrderDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-800">Resumen del Pedido</h3>
              <div className="flex items-center text-emerald-600">
                <Icon name="CheckCircle" className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Confirmado</span>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-slate-500 font-medium">Número de pedido</span>
                  <span className="text-sm md:text-base font-bold text-slate-800">{orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm md:text-base text-slate-500 font-medium mr-2">Llegada estimada</span>
                    <Icon name="Clock" className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-slate-800">
                    {estimatedTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Dirección de entrega */}
              {address && address.line1 && (
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-start">
                    <Icon name="MapPin" className="w-5 h-5 text-slate-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Dirección de entrega</p>
                      <p className="text-sm md:text-base text-slate-800 font-medium">{address.line1}</p>
                      <p className="text-xs text-slate-400">{address.city}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Desglose de precios */}
              <div className="border-t border-slate-200 pt-4 md:pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 font-medium">Subtotal</span>
                    <span className="text-sm md:text-base font-medium text-slate-800">${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 font-medium">Entrega</span>
                    <span className="text-sm md:text-base font-medium text-slate-800">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 font-medium">Impuestos</span>
                    <span className="text-sm md:text-base font-medium text-slate-800">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg md:text-xl text-slate-800 font-semibold">Total</span>
                      <span className="text-lg md:text-xl font-bold text-emerald-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items del Pedido */}
          <div className={`bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-all duration-700 ${showItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-6">Items del Pedido</h3>
            <div className="space-y-4">
              {orderSummary.itemsList.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                      <Icon name="Bowl" className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-medium text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm md:text-base font-semibold text-slate-800">${item.total.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">${item.price.toFixed(2)} c/u</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip Card */}
          <div className={`bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-8 md:mb-10 shadow-sm transition-all duration-700 ${showOrderDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                <Icon name="Bowl" className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold text-amber-800 mb-1">Consejo de entrega</h3>
                <p className="text-sm md:text-base text-amber-700 font-medium leading-relaxed">
                  Revisa la dirección y timbre para una entrega sin contratiempos
                </p>
              </div>
            </div>
          </div>

          {/* Order Timeline Mejorado */}
          <div className={`bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg transition-all duration-700 ${showOrderDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-800">Estado del Pedido</h3>
              <div className="flex items-center text-emerald-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm md:text-base font-medium">En preparación</span>
        </div>
      </div>

            {/* Timeline mejorado */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
              
              {/* Paso 1: Confirmado */}
              <div className="relative flex items-center mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center z-10">
                  <Icon name="CheckCircle" className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm md:text-base font-semibold text-emerald-700">Pedido Confirmado</p>
                  <p className="text-xs text-slate-500">Tu pedido ha sido recibido y confirmado</p>
                  <p className="text-xs text-slate-400">{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              {/* Paso 2: En preparación */}
              <div className="relative flex items-center mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center z-10 animate-pulse">
                  <Icon name="Clock" className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm md:text-base font-semibold text-emerald-700">En Preparación</p>
                  <p className="text-xs text-slate-500">Tu comida saludable se está preparando</p>
                  <p className="text-xs text-slate-400">Tiempo estimado: 15-20 min</p>
                </div>
              </div>

              {/* Paso 3: En camino */}
              <div className="relative flex items-center mb-6">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center z-10">
                  <Icon name="Truck" className="w-5 h-5 text-slate-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm md:text-base font-medium text-slate-500">En Camino</p>
                  <p className="text-xs text-slate-400">El repartidor saldrá hacia tu ubicación</p>
                </div>
              </div>

              {/* Paso 4: Entregado */}
              <div className="relative flex items-center">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center z-10">
                  <Icon name="Check" className="w-5 h-5 text-slate-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm md:text-base font-medium text-slate-500">Entregado</p>
                  <p className="text-xs text-slate-400">Tu pedido llegará a tu puerta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-sm transition-all duration-700 ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                <Icon name="HelpCircle" className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-3">¿Necesitas Ayuda?</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Icon name="Clock" className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Tiempo de entrega</p>
                      <p className="text-xs text-blue-600">45 minutos promedio</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Icon name="HelpCircle" className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Soporte al cliente</p>
                      <p className="text-xs text-blue-600">Disponible 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Truck" className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Seguimiento en tiempo real</p>
                      <p className="text-xs text-blue-600">Recibe notificaciones del estado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-4 md:space-y-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button
          onClick={() => setView('tracking')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
          aria-label="Seguir pedido en tiempo real"
        >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Icon name="Truck" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-base md:text-lg lg:text-xl">Seguir pedido</span>
              <Icon name="ArrowRight" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
        </button>
          
        <button
            onClick={() => setView('menus')}
            className="w-full bg-white/90 backdrop-blur-sm border border-slate-200/50 hover:border-emerald-200/50 text-emerald-600 hover:text-emerald-700 font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-lg transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
          aria-label="Hacer otro pedido"
        >
            <div className="flex items-center justify-center space-x-2 md:space-x-3">
              <Icon name="Plus" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-90 transition-transform duration-200" />
              <span className="text-base md:text-lg lg:text-xl">Hacer otro pedido</span>
            </div>
        </button>
        </div>

        {/* Footer con información adicional */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200/50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 md:space-x-8 text-xs md:text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" className="w-3 h-3 md:w-4 md:h-4" />
                <span>Entrega rápida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Leaf" className="w-3 h-3 md:w-4 md:h-4" />
                <span>100% saludable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" className="w-3 h-3 md:w-4 md:h-4" />
                <span>Garantía</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
