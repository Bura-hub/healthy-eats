import React, { useState } from 'react';
import { SAVED_ADDRESSES } from '../data/mockData';
import Icon from '../components/Icon';

// Componente: Lugar de Entrega con diseño profesional mejorado
const DeliveryScreen = ({ setView, setAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    number: '',
    city: '',
    reference: ''
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setAddress({
      line1: addr.line1,
      city: addr.city,
      postalCode: addr.postalCode
    });
    setMessage('✅ Dirección seleccionada');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleUseAddress = () => {
    if (selectedAddress) {
      setIsLoading(true);
      setAddress({
        line1: selectedAddress.line1,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode
      });
      setMessage('✅ Dirección establecida para la entrega');
      setTimeout(() => {
        setIsLoading(false);
        setView('home');
      }, 1500);
    }
  };

  const handleMarkAsDefault = () => {
    if (selectedAddress) {
      setMessage('✅ Dirección marcada como predeterminada');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleMapSelection = () => {
    setShowMap(true);
    setIsLoading(true);
    // Simular selección en mapa
    setTimeout(() => {
      setNewAddress({
        street: 'Av. Salud',
        number: '123',
        city: 'Ciudad Verde',
        reference: 'Frente al parque'
      });
      setShowMap(false);
      setIsLoading(false);
      setMessage('✅ Ubicación seleccionada en el mapa');
      setTimeout(() => setMessage(''), 2000);
    }, 2000);
  };

  const handleSaveAddress = () => {
    if (newAddress.street && newAddress.number && newAddress.city) {
      setIsLoading(true);
      const fullAddress = `${newAddress.street} ${newAddress.number}`;
      setAddress({
        line1: fullAddress,
        city: newAddress.city,
        postalCode: '10004'
      });
      setMessage('✅ Dirección guardada y establecida');
      setTimeout(() => {
        setIsLoading(false);
        setView('home');
      }, 1500);
    } else {
      setMessage('⚠️ Por favor completa todos los campos');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleUseAsDefault = () => {
    if (newAddress.street && newAddress.number && newAddress.city) {
      setIsLoading(true);
      const fullAddress = `${newAddress.street} ${newAddress.number}`;
      setAddress({
        line1: fullAddress,
        city: newAddress.city,
        postalCode: '10004'
      });
      setMessage('✅ Dirección establecida como predeterminada');
      setTimeout(() => {
        setIsLoading(false);
        setView('home');
      }, 1500);
    } else {
      setMessage('⚠️ Por favor completa todos los campos');
      setTimeout(() => setMessage(''), 3000);
    }
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
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '900',
                letterSpacing: '-0.03em',
                textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Lugar de Entrega
              </h1>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed animate-fade-in-up" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                animationDelay: '0.2s',
                animationFillMode: 'both'
              }}>
                Selecciona una dirección guardada o usa el mapa simulado
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

        {/* Banner de tiempo estimado mejorado con animación */}
        <div className="mb-6 animate-fade-in-up" style={{
          animationDelay: '0.6s',
          animationFillMode: 'both'
        }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-xl animate-pulse-subtle">
                <Icon name="Bike" className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-slate-600 font-medium">Tiempo Estimado en tu Zona:</span>
                <span className="ml-2 font-bold text-slate-800 text-lg">30-45 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de estado con animación */}
        {message && (
          <div className="mb-6 animate-slide-in-from-top">
            <div className={`p-4 rounded-2xl text-sm font-medium shadow-lg ${
              message.startsWith('✅') 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <div className="flex items-center space-x-2">
                <Icon name={message.startsWith('✅') ? 'CheckCircle' : 'AlertTriangle'} className="w-5 h-5 animate-bounce-in" />
                <span>{message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Direcciones guardadas mejoradas con animaciones */}
        <div className="mb-8 animate-fade-in-up" style={{
          animationDelay: '0.8s',
          animationFillMode: 'both'
        }}>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <Icon name="MapPin" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
            <span>Direcciones guardadas</span>
          </h2>
          <div className="space-y-3">
            {SAVED_ADDRESSES.map((addr, index) => (
              <div
                key={addr.id}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl border-2 p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-slide-in-stagger ${
                  selectedAddress?.id === addr.id 
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-lg animate-scale-in' 
                    : addr.isDefault 
                      ? 'border-emerald-300 bg-white/95 shadow-md' 
                      : 'border-slate-200 bg-white/90 hover:border-emerald-300'
                }`}
                onClick={() => handleSelectAddress(addr)}
                style={{
                  animationDelay: `${(index * 100) + 1000}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl ${
                    addr.isDefault ? 'bg-emerald-100' : 'bg-slate-100'
                  }`}>
                    <Icon name={addr.icon} className={`w-5 h-5 ${
                      addr.isDefault ? 'text-emerald-600' : 'text-slate-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg">{addr.name}</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{addr.line1}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      {addr.isDefault && (
                        <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium border border-emerald-200">
                          Predeterminada
                        </span>
                      )}
                      <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                        {addr.deliveryTime}
                      </span>
                    </div>
                  </div>
                  <button className="bg-emerald-500 text-white text-xs px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors duration-300 hover:scale-105 font-medium">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de acción para dirección seleccionada con animaciones */}
          {selectedAddress && (
            <div className="mt-6 space-y-3 animate-fade-in-up">
              <button
                onClick={handleUseAddress}
                disabled={isLoading}
                className="w-full bg-white border-2 border-slate-300 text-slate-700 py-4 rounded-2xl font-semibold hover:bg-slate-50 hover:border-emerald-300 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-scale-in"
                style={{
                  animationDelay: '0.2s',
                  animationFillMode: 'both'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </div>
                ) : (
                  'Usar esta dirección'
                )}
              </button>
              <button
                onClick={handleMarkAsDefault}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-[1.02] shadow-lg animate-scale-in"
                style={{
                  animationDelay: '0.4s',
                  animationFillMode: 'both'
                }}
              >
                Marcar como predeterminada
              </button>
            </div>
          )}
        </div>

        {/* Opciones principales mejoradas con animaciones */}
        <div className="mb-8 animate-fade-in-up" style={{
          animationDelay: '1.2s',
          animationFillMode: 'both'
        }}>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <Icon name="Settings" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
            <span>Opciones principales</span>
          </h2>
          
          {/* Agregar nueva dirección */}
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 mb-3 cursor-pointer hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-emerald-300"
            onClick={handleAddNewAddress}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <Icon name="Plus" className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">Agregar nueva dirección</h3>
                <p className="text-sm text-slate-500">Abre formulario para guardar y usar</p>
              </div>
              <Icon name="ArrowRight" className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Seleccionar en mapa */}
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 mb-4 cursor-pointer hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-emerald-300"
            onClick={handleMapSelection}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <Icon name="Map" className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">Seleccionar en mapa (simulado)</h3>
                <p className="text-sm text-slate-500">Toca para simular coordenadas</p>
              </div>
              <Icon name="ArrowRight" className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Mapa simulado mejorado con animaciones */}
          {showMap && (
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 mb-4 text-center border border-slate-300 shadow-inner animate-scale-in-bounce">
              <div className="space-y-4">
                <Icon name="MapPin" className="w-12 h-12 text-emerald-500 mx-auto animate-bounce-in" />
                <p className="text-slate-600 font-medium text-lg animate-fade-in-up">Mapa Simulado</p>
                <p className="text-slate-500 text-sm animate-fade-in-up" style={{
                  animationDelay: '0.2s',
                  animationFillMode: 'both'
                }}>Selecciona un punto en el mapa</p>
                {isLoading && (
                  <div className="flex items-center justify-center space-x-2 animate-fade-in-up" style={{
                    animationDelay: '0.4s',
                    animationFillMode: 'both'
                  }}>
                    <div className="w-4 h-4 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
                    <span className="text-emerald-600 text-sm">Procesando ubicación...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Formulario de dirección mejorado con animaciones */}
          {(showAddressForm || showMap) && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 mb-4 shadow-lg animate-slide-down">
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center space-x-2 animate-fade-in-up">
                <Icon name="Edit" className="w-5 h-5 text-emerald-600 animate-pulse-subtle" />
                <span>Nueva Dirección</span>
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Calle"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    className="w-full p-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    placeholder="Número"
                    value={newAddress.number}
                    onChange={(e) => setNewAddress({...newAddress, number: e.target.value})}
                    className="w-full p-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Ciudad"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full p-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="Referencia (opcional)"
                  value={newAddress.reference}
                  onChange={(e) => setNewAddress({...newAddress, reference: e.target.value})}
                  className="w-full p-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
                
                {/* Toggle para guardar dirección con animación */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl animate-fade-in-up" style={{
                  animationDelay: '0.3s',
                  animationFillMode: 'both'
                }}>
                  <span className="text-sm text-slate-600 font-medium">Guardar dirección</span>
                  <button
                    onClick={() => setSaveAddress(!saveAddress)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      saveAddress ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                      saveAddress ? 'translate-x-6 animate-slide-toggle' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones CTA mejorados con animaciones */}
        {(showAddressForm || showMap) && (
          <div className="space-y-3 animate-fade-in-up" style={{
            animationDelay: '0.5s',
            animationFillMode: 'both'
          }}>
            <button
              onClick={handleSaveAddress}
              disabled={isLoading}
              className="w-full bg-white border-2 border-emerald-300 text-emerald-700 py-4 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-scale-in"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
                  <span>Guardando...</span>
                </div>
              ) : (
                'Guardar dirección'
              )}
            </button>
            <button
              onClick={handleUseAsDefault}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed animate-scale-in"
              style={{
                animationDelay: '0.2s',
                animationFillMode: 'both'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Procesando...</span>
                </div>
              ) : (
                'Usar como predeterminada'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryScreen;