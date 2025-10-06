import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

// Componente: Modal de Contactos Profesional
const ContactModal = ({ isVisible, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    orderId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
      setTimeout(() => setShowModal(false), 300);
    }
  }, [isVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    onClose();
    alert('Mensaje enviado exitosamente. Te responderemos pronto.');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!showModal) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
      isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
    }`}>
      <div className={`bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl transform transition-all duration-300 flex flex-col ${
        showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Header con gradiente */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-t-3xl p-6 text-white overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Icon name="HelpCircle" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '800'
                }}>
                  Soporte y Contacto
                </h2>
                <p className="text-emerald-100 text-sm font-medium">
                  Estamos aquí para ayudarte
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 group"
              aria-label="Cerrar modal de contactos"
            >
              <Icon name="X" className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Métodos de contacto rápidos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Icon name="Phone" className="w-5 h-5 text-emerald-600 mr-2" />
              Contacto Rápido
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="tel:+1234567890" 
                className="group flex items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                aria-label="Llamar por teléfono"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon name="Phone" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 group-hover:text-emerald-700">Llamada Directa</p>
                  <p className="text-sm text-slate-500">+1 (234) 567-890</p>
                </div>
              </a>
              
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                aria-label="Abrir WhatsApp"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon name="MessageCircle" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 group-hover:text-green-700">WhatsApp</p>
                  <p className="text-sm text-slate-500">Chat en tiempo real</p>
                </div>
              </a>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
              <Icon name="Mail" className="w-5 h-5 text-emerald-600 mr-2" />
              Envíanos un Mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                    aria-label="Nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                    aria-label="Correo electrónico"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-slate-700 mb-2">
                  ID de Pedido (Opcional)
                </label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  placeholder="ORD-123456789"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                  aria-label="ID de pedido"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe tu consulta, problema o sugerencia..."
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-slate-50 focus:bg-white resize-none"
                  aria-label="Mensaje"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <Icon name="Clock" className="w-8 h-8 text-emerald-600 mb-2" />
                <p className="text-sm font-semibold text-slate-800">Respuesta Rápida</p>
                <p className="text-xs text-slate-500">Menos de 2 horas</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <Icon name="Shield" className="w-8 h-8 text-emerald-600 mb-2" />
                <p className="text-sm font-semibold text-slate-800">100% Seguro</p>
                <p className="text-xs text-slate-500">Datos protegidos</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <Icon name="Heart" className="w-8 h-8 text-emerald-600 mb-2" />
                <p className="text-sm font-semibold text-slate-800">Soporte 24/7</p>
                <p className="text-xs text-slate-500">Siempre disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
