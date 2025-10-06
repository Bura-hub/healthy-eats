import React from 'react';
import Icon from '../components/Icon';

// Componente profesional de la pantalla de inicio
const HomeScreen = ({ setView, cart, address, setShowContactModal }) => {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalFormatted = total.toFixed(2);
  const isCartEmpty = cartCount === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20 flex flex-col">
      {/* Fondo responsive */}
      <div className="absolute inset-0">
        {/* Elementos decorativos responsive */}
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
        {/* Contenido principal con distribución vertical optimizada */}
        <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 min-h-0 flex-1 py-4 sm:py-6 md:py-8">
          {/* Texto curvado profesional - NO TÁCTIL */}
          <div className="relative pointer-events-none text-center">
            <div className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.3em] uppercase" style={{
              fontFamily: 'Inter, sans-serif',
              transform: 'perspective(120px) rotateX(15deg)',
              letterSpacing: '0.3em',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              fontWeight: '300'
            }}>
              Healthy eating
            </div>
          </div>

          {/* Título principal profesional */}
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight leading-tight" style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Inicio
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
              <div className="w-8 h-px bg-gradient-to-r from-teal-500 to-emerald-500"></div>
            </div>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg font-medium px-4 md:px-8 lg:px-12 max-w-2xl mx-auto leading-relaxed">
              Bienvenido a tu experiencia culinaria saludable
            </p>
          </div>

        {/* Hero Section responsive */}
        <div className="flex flex-col items-center space-y-4 md:space-y-6 lg:space-y-8">
          {/* Imagen principal con efectos de anillo profesional */}
          <div className="relative group scale-in">
            {/* Anillo exterior profesional con múltiples capas */}
            <div className="absolute -inset-4 md:-inset-6 lg:-inset-8 bg-gradient-to-r from-slate-200 via-gray-100 to-slate-200 rounded-full opacity-30 group-hover:opacity-40 transition-all duration-700 blur-md animate-spin" style={{animationDuration: '20s'}}></div>
            
            {/* Anillo intermedio con gradiente sofisticado */}
            <div className="absolute -inset-2 md:-inset-3 lg:-inset-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 rounded-full opacity-60 group-hover:opacity-70 transition-all duration-500 blur-sm border border-white/20 animate-pulse" style={{animationDuration: '3s'}}></div>
            
            {/* Anillo interior con efecto de profundidad */}
            <div className="absolute -inset-1 md:-inset-2 lg:-inset-3 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 rounded-full opacity-40 group-hover:opacity-50 transition-all duration-300 shadow-inner animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
            
            {/* Imagen con bordes profesionales */}
            <div 
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden cursor-pointer transform group-hover:scale-[1.02] transition-all duration-500 shadow-2xl border-4 border-white/80 backdrop-blur-sm"
              onClick={() => setView('menus')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setView('menus');
                }
              }}
              aria-label="Explorar menús del día"
            >
              <img 
                src="/src/assets/images/fondo_inicio.jpeg" 
                alt="Comida saludable"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback a diseño CSS si la imagen no se encuentra
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              {/* Fallback CSS responsive */}
              <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full relative overflow-hidden hidden flex items-center justify-center">
                <div className="text-center text-slate-600">
                  <Icon name="MenuList" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-2" />
                  <p className="text-sm md:text-base lg:text-lg">Imagen no encontrada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Texto descriptivo responsive */}
          <div className="text-center space-y-1 md:space-y-2 fade-in-up">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700">Menús Frescos del Día</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 px-4 md:px-8 lg:px-12">Descubre opciones saludables con ingredientes naturales</p>
          </div>
        </div>
        
        {/* Sección de acciones principales - Responsive */}
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-700 text-center mb-4 md:mb-6 lg:mb-8 fade-in-up">¿Qué necesitas hoy?</h3>
          
          {/* Tarjeta Menús del Día - Responsive */}
          <div className="group fade-in-up-delay-1">
            <button 
              onClick={() => setView('menus')} 
              className="w-full bg-white/90 p-4 md:p-6 lg:p-8 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] shadow-md md:shadow-lg border border-slate-200/50 hover:shadow-lg md:hover:shadow-xl hover:bg-white transition-all duration-200 active:scale-[0.98] hover:border-emerald-200/50 min-h-[72px] md:min-h-[80px] lg:min-h-[88px]"
              aria-label="Ver menús del día"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
                  {/* Icono responsive */}
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Icon name="MenuList" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                   {/* Contenido responsive */}
                   <div className="text-left">
                     <h4 className="font-semibold text-slate-800 text-base md:text-lg lg:text-xl mb-1">Menús del Día</h4>
                     <p className="text-slate-500 text-sm md:text-base lg:text-lg font-medium leading-relaxed">Descubre opciones frescas de hoy</p>
                   </div>
                </div>
                
                {/* Flecha responsive */}
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 group-hover:bg-emerald-100 transition-colors duration-200">
                  <Icon name="ArrowRight" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-slate-400 group-hover:text-emerald-600 transition-colors duration-200" />
                </div>
              </div>
            </button>
          </div>

          {/* Tarjeta Lugar de Entrega - Responsive */}
          <div className="group fade-in-up-delay-2">
            <button 
              onClick={() => setView('delivery')} 
              className="w-full bg-white/90 p-4 md:p-6 lg:p-8 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] shadow-md md:shadow-lg border border-slate-200/50 hover:shadow-lg md:hover:shadow-xl hover:bg-white transition-all duration-200 active:scale-[0.98] hover:border-blue-200/50 min-h-[72px] md:min-h-[80px] lg:min-h-[88px]"
              aria-label="Configurar dirección de entrega"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
                  {/* Icono responsive */}
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Icon name="MapPin" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                   {/* Contenido responsive */}
                   <div className="text-left">
                     <h4 className="font-semibold text-slate-800 text-base md:text-lg lg:text-xl mb-1">Lugar de Entrega</h4>
                     <p className="text-slate-500 text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                       {address.line1 || "Configura tu dirección"}
                     </p>
                   </div>
                </div>
                
                {/* Flecha responsive */}
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors duration-200">
                  <Icon name="ArrowRight" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-slate-400 group-hover:text-blue-600 transition-colors duration-200" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Botón CTA Principal - Responsive */}
        <div className="space-y-3 md:space-y-4 fade-in-up-delay-3">
          {isCartEmpty ? (
            <button 
              onClick={() => setView('menus')} 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
              aria-label="Carrito vacío - elige un plato para empezar"
            >
              <div className="flex items-center justify-center space-x-2 md:space-x-3">
                <Icon name="ShoppingCart" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-base md:text-lg lg:text-xl">Carrito vacío</span>
                <Icon name="ArrowRight" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </button>
          ) : (
            <button 
              onClick={() => setView('cart')} 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-200 active:scale-[0.98] group min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
              aria-label={`Programar pedido por ${totalFormatted}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Icon name="ShoppingCart" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:rotate-12 transition-transform duration-200" />
                  <span className="text-base md:text-lg lg:text-xl">Programar Pedido</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <span className="bg-white/20 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-full text-sm md:text-base lg:text-lg font-semibold">
                    ${totalFormatted}
                  </span>
                  <Icon name="ArrowRight" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </button>
          )}
          
          {/* Información adicional responsive */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 md:space-x-6 lg:space-x-8 text-xs md:text-sm lg:text-base text-slate-500">
              <div className="flex items-center space-x-1 md:space-x-2">
                <Icon name="Clock" className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                <span>30-45 min</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <Icon name="Truck" className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                <span>Entrega gratis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer ligero responsive - Solo Contactos según guía */}
        <div className="pt-4 md:pt-6 lg:pt-8 border-t border-slate-200/50 mt-auto">
          <div className="flex justify-center">
            <button 
              onClick={() => setShowContactModal(true)} 
              className="text-xs md:text-sm lg:text-base text-slate-500 hover:text-emerald-600 transition-colors font-medium underline"
              aria-label="Abrir información de contacto"
            >
              Contactos
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
