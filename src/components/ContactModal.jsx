import React from 'react';
import Icon from '../components/Icon';

// Componente: Modal de Contactos
const ContactModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleSubmit = () => {
    onClose();
    alert('Mensaje enviado (Simulación). Te responderemos pronto.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Contactos y Soporte</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 text-2xl font-light"
            aria-label="Cerrar modal de contactos"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <a 
            href="tel:+1234567890" 
            className="flex items-center p-3 bg-primary-50 rounded-lg text-primary-700 font-medium hover:bg-primary-100 transition-colors"
            aria-label="Llamar por teléfono"
          >
            <Icon name="Settings" className="w-5 h-5 mr-3" />
            Teléfono (Tap-to-call)
          </a>
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center p-3 bg-primary-50 rounded-lg text-primary-700 font-medium hover:bg-primary-100 transition-colors"
            aria-label="Abrir WhatsApp"
          >
            <Icon name="Settings" className="w-5 h-5 mr-3" />
            WhatsApp (Chat Simulado)
          </a>
          
          <h3 className="font-bold text-lg pt-2 border-t mt-4">Formulario de Contacto (Simulado)</h3>
          <input
            type="text"
            placeholder="Tu Nombre"
            className="input-field"
            aria-label="Nombre"
          />
          <input
            type="email"
            placeholder="Tu Correo Electrónico"
            className="input-field"
            aria-label="Correo electrónico"
          />
          <textarea
            placeholder="Tu Mensaje o Reporte de Problema (ID de Pedido opcional)"
            rows="4"
            className="input-field"
            aria-label="Mensaje"
          ></textarea>
          <button 
            onClick={handleSubmit} 
            className="btn-primary w-full"
            aria-label="Enviar mensaje"
          >
            Enviar Mensaje (Simulado)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
