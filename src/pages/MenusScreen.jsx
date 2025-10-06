import React, { useState } from 'react';
import Icon from '../components/Icon';
import { MENU_DATA } from '../data/mockData';

// Componente: Menús del Día - Diseño Profesional
const MenusScreen = ({ setView, cart, setCart }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedDay, setSelectedDay] = useState('L');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSnackbar, setShowSnackbarLocal] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Días de la semana
  const days = [
    { key: 'L', label: 'Lun', fullLabel: 'Lunes' },
    { key: 'M', label: 'Mar', fullLabel: 'Martes' },
    { key: 'X', label: 'Mié', fullLabel: 'Miércoles' },
    { key: 'J', label: 'Jue', fullLabel: 'Jueves' },
    { key: 'V', label: 'Vie', fullLabel: 'Viernes' }
  ];

  // Filtrar menús por día y búsqueda
  const filteredMenus = MENU_DATA.filter(menu => {
    const dayMatch = menu.day.includes(selectedDay === 'L' ? 'Día 1' : 
                     selectedDay === 'M' ? 'Día 2' : 
                     selectedDay === 'X' ? 'Día 3' : 
                     selectedDay === 'J' ? 'Día 4' : 'Día 5');
    const searchMatch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       menu.description.toLowerCase().includes(searchTerm.toLowerCase());
    return dayMatch && searchMatch;
  });

  // Manejar cambio de día con animación
  const handleDayChange = (dayKey) => {
    setIsFiltering(true);
    setSelectedDay(dayKey);
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Manejar búsqueda con animación
  const handleSearchChange = (value) => {
    setIsFiltering(true);
    setSearchTerm(value);
    setTimeout(() => setIsFiltering(false), 300);
  };

  const handleAddToCart = (menu) => {
    // Buscar si ya existe en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === menu.id);

    if (existingItemIndex > -1) {
      // Si existe, actualizar cantidad
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Si es nuevo, añadir
      setCart([...cart, { ...menu, quantity: 1, extras: [] }]);
    }
    
    // Mostrar snackbar
    setShowSnackbarLocal(true);
    setTimeout(() => setShowSnackbarLocal(false), 4000);
  };

  const handleQuantityChange = (menuId, change) => {
    const newCart = cart.map(item => {
      if (item.id === menuId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean);
    
    setCart(newCart);
  };

  const getItemQuantity = (menuId) => {
    const item = cart.find(item => item.id === menuId);
    return item ? item.quantity : 0;
  };

  // Snackbar Component
  const Snackbar = () => {
    if (!showSnackbar) return null;
    
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up-snackbar">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-4 rounded-2xl shadow-xl flex items-center justify-between border-2 border-emerald-400 backdrop-blur-sm">
          <span className="font-bold" style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '700'
          }}>Añadido al carrito</span>
          <button 
            onClick={() => setView('cart')}
            className="bg-white/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/40 transition-all duration-300 transform hover:scale-105 border border-white/50"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}
          >
            Ir al carrito
          </button>
        </div>
      </div>
    );
  };

  // Vista de Detalle del Plato (Modal)
  const ModalOverlay = () => {
    if (!selectedMenu) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end animate-fade-in" onClick={() => setSelectedMenu(null)}>
        <div className="bg-white rounded-t-3xl w-full max-h-[70vh] overflow-y-auto shadow-2xl border-t border-gray-200 animate-slide-up" onClick={(e) => e.stopPropagation()}>
          {/* Indicador de arrastre profesional */}
          <div className="flex justify-center pt-4 pb-3">
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full"></div>
          </div>
          <div className="p-6">
            {/* Header profesional */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setSelectedMenu(null)}
                className="p-3 hover:bg-gray-100/80 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <Icon name="ArrowLeft" className="w-6 h-6 text-slate-600" />
              </button>
              <h2 className="text-2xl font-bold text-slate-800" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '800',
                letterSpacing: '-0.02em'
              }}>{selectedMenu.name}</h2>
              <div className="w-12"></div>
            </div>

            {/* Información nutricional profesional */}
            <p className="text-sm text-slate-500 mb-6 font-medium" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Calorías aprox. {selectedMenu.kcal} • Porción 400g
            </p>

            {/* Ingredientes profesionales */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700'
              }}>Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMenu.description.split(', ').map((ingredient, index) => (
                  <span key={index} className="px-3 py-2 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium border-2 border-emerald-300" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600'
                  }}>
                    {ingredient.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Alérgenos profesionales */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700'
              }}>Alérgenos</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium border-2 border-yellow-300" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}>
                  Frutos secos
                </span>
                <span className="px-3 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium border-2 border-yellow-300" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}>
                  Sésamo
                </span>
              </div>
            </div>

            {/* Extras profesionales */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700'
              }}>Extras</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium border-2 border-emerald-300" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}>
                  Hummus +$1
                </span>
                <span className="px-3 py-2 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium border-2 border-emerald-300" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}>
                  Queso feta +$1
                </span>
              </div>
            </div>

            {/* Botón de acción profesional */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-4 rounded-2xl shadow-lg border border-emerald-400/20">
              <button 
                onClick={() => {
                  handleAddToCart(selectedMenu);
                  setSelectedMenu(null);
                }}
                className="w-full text-center font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 py-2 rounded-xl transform hover:scale-105"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700'
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vista principal de Menús del Día
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden pb-20">
      {/* Fondo decorativo profesional */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:top-32 md:left-8 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-4 md:bottom-48 md:right-8 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-lime-200/15 to-yellow-200/15 rounded-full blur-xl"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl"></div>
      </div>

      {/* Modal Overlay */}
      <ModalOverlay />
      
      {/* Header profesional */}
      <div className="relative z-10 px-4 pt-10 pb-4 sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
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
              Menús del Día
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed" style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Descubre opciones frescas de hoy
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icon name="Settings" className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Carrusel de días profesional - Responsive */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 px-2 sm:px-0">
          <div className="flex space-x-2 sm:space-x-3 justify-center w-full max-w-md">
            {days.map(day => (
              <button
                key={day.key}
                onClick={() => handleDayChange(day.key)}
                className={`px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 rounded-[1.5rem] sm:rounded-[2rem] text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap flex-1 ${
                  selectedDay === day.key
                    ? 'bg-emerald-500 text-white shadow-lg transform scale-105 animate-pulse-slow'
                    : 'bg-white/80 text-gray-500/60 hover:bg-gray-100 hover:text-gray-500 hover:shadow-md border border-gray-300/60 hover:scale-105'
                }`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600'
                }}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de búsqueda profesional */}
        <div className="relative max-w-sm mx-auto">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar platos..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-3xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md transition-all duration-300 focus:scale-105 focus:shadow-lg"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}
          />
        </div>
      </div>

      {/* Lista de menús profesional */}
      <div className="relative z-10 px-4 space-y-3">
        {filteredMenus.map((menu, index) => {
          const itemQuantity = getItemQuantity(menu.id);
          
          return (
            <div 
              key={menu.id} 
              className={`bg-white/90 backdrop-blur-sm rounded-2xl p-3 depth-3 border-2 border-gray-200 hover:shadow-xl hover:bg-white/95 hover:scale-[1.02] hover:border-emerald-300 transition-all duration-500 transform group micro-interaction ${
                isFiltering ? 'animate-fade-out' : 'animate-slide-in-stagger'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-start space-x-3">
                {/* Imagen del plato profesional */}
                <div 
                  className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex-shrink-0 cursor-pointer flex items-center justify-center border-2 border-emerald-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group-hover:border-emerald-400"
                  onClick={() => setSelectedMenu(menu)}
                >
                  <Icon name="MenuList" className="w-8 h-8 text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300" />
                </div>

                {/* Información del plato profesional */}
                <div className="flex-grow min-w-0">
                  {/* Título y precio */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-800" style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '700',
                      letterSpacing: '-0.01em'
                    }}>{menu.name}</h3>
                    <span className="text-base font-black text-emerald-500" style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '900'
                    }}>${menu.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-xs text-slate-500 mb-2 line-clamp-2 leading-relaxed" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400'
                  }}>{menu.description}</p>
                  
                  {/* Etiquetas dietéticas profesionales */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {menu.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`px-2 py-0.5 text-xs rounded-full font-medium border-2 ${
                          tag === 'Vegetariano' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                          tag === 'Sin Gluten' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          tag === 'Proteína' ? 'bg-pink-100 text-pink-800 border-pink-300' :
                          'bg-gray-100 text-gray-800 border-gray-300'
                        }`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '600'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Selector de cantidad y botón profesional */}
                  <div className="flex items-center space-x-2">
                    {itemQuantity > 0 ? (
                      <>
                        {/* Selector de cantidad */}
                        <div className="flex items-center bg-gray-100 border-2 border-gray-300 rounded-lg px-1.5 py-0.5 shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(menu.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-all duration-200"
                          >
                            <Icon name="Minus" className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 mx-1.5 min-w-[16px] text-center" style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '700'
                          }}>{itemQuantity}</span>
                          <button
                            onClick={() => handleQuantityChange(menu.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-all duration-200"
                          >
                            <Icon name="Plus" className="w-3 h-3" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Selector de cantidad inicial */}
                        <div className="flex items-center bg-gray-100 border-2 border-gray-300 rounded-lg px-1.5 py-0.5 shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(menu.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-400 rounded opacity-50"
                            disabled
                          >
                            <Icon name="Minus" className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 mx-1.5 min-w-[16px] text-center" style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '700'
                          }}>1</span>
                          <button
                            onClick={() => handleQuantityChange(menu.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-all duration-200"
                          >
                            <Icon name="Plus" className="w-3 h-3" />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Botón Agregar profesional */}
                    <button
                      onClick={() => handleAddToCart(menu)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-lg font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-emerald-400/20 backdrop-blur-sm active:scale-95 micro-interaction animate-glow"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '700'
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Snackbar */}
      <Snackbar />
    </div>
  );
};

export default MenusScreen;