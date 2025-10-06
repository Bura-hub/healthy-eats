import React, { useState } from 'react';
import { SAVED_ADDRESSES } from '../data/mockData';

// Componente: Lugar de Entrega
const DeliveryScreen = ({ setView, address, setAddress }) => {
  const [newAddress, setNewAddress] = useState(address.line1 ? address : { line1: '', city: '', postalCode: '' });
  const [message, setMessage] = useState('');

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (newAddress.line1 && newAddress.city) {
      setAddress(newAddress);
      setMessage('✅ Dirección guardada y establecida para la entrega.');
      setTimeout(() => setView('home'), 1500);
    } else {
      setMessage('⚠️ Por favor, completa la dirección y la ciudad.');
    }
  };

  const handleSelectSaved = (selected) => {
    setNewAddress(selected);
    setAddress(selected);
    setMessage('✅ Dirección predeterminada seleccionada.');
    setTimeout(() => setView('home'), 1500);
  };

  return (
    <div className="p-4 pt-10 pb-20 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Lugar de Entrega</h1>

      {message && (
        <div className={`p-3 rounded-xl mb-4 font-medium ${message.startsWith('✅') ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'}`}>
          {message}
        </div>
      )}

      {/* Direcciones Guardadas */}
      <div className="space-y-3 mb-8">
        <h2 className="text-xl font-bold text-gray-800">Direcciones Guardadas</h2>
        {SAVED_ADDRESSES.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 rounded-xl shadow-md border cursor-pointer hover:bg-primary-50 transition-colors ${
              address.line1 === addr.line1 ? 'bg-primary-100 border-primary-500' : 'bg-white border-gray-100'
            }`}
            onClick={() => handleSelectSaved(addr)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelectSaved(addr);
              }
            }}
            aria-label={`Seleccionar dirección: ${addr.line1}`}
          >
            <p className="font-semibold">{addr.line1}</p>
            <p className="text-sm text-gray-500">{addr.city}, C.P. {addr.postalCode}</p>
            {address.line1 === addr.line1 && <span className="text-xs text-primary-600 font-bold mt-1 block">Seleccionada</span>}
          </div>
        ))}
      </div>

      <div className="border-t pt-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Agregar Nueva Dirección</h2>
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <input
            type="text"
            placeholder="Calle, Número, Apto/Casa"
            value={newAddress.line1}
            onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
            className="input-field"
            aria-label="Dirección"
          />
          <input
            type="text"
            placeholder="Ciudad / Localidad"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className="input-field"
            aria-label="Ciudad"
          />
          <input
            type="text"
            placeholder="Código Postal (Simulado)"
            value={newAddress.postalCode}
            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            className="input-field"
            aria-label="Código postal"
          />
          {/* Simulación de Mapa */}
          <div className="h-48 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-medium border-2 border-dashed border-blue-300">
            [Seleccionar en Mapa: Funcionalidad Simulada]
          </div>

          <button
            type="submit"
            className="w-full bg-secondary-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-secondary-600 transition-colors active:scale-[0.98]"
            aria-label="Guardar dirección"
          >
            Guardar y Usar como Predeterminada
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryScreen;
