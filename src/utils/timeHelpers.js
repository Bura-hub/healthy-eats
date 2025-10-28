// Utilidades para manejo de tiempo de entrega

/**
 * Calcula la hora mínima de entrega (45 minutos después de ahora - EXACTO, sin redondear)
 * @returns {Date} Fecha/hora mínima de entrega
 */
export const getMinDeliveryTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  // NO redondeamos aquí - dejamos la hora exacta
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
};

/**
 * Genera opciones de horario: primera opción exacta (45 min), luego intervalos de 10 min
 * @param {number} hoursAhead - Cuántas horas adelante generar opciones
 * @returns {Array} Array de objetos con value y label
 */
export const generateTimeSlots = (hoursAhead = 12) => {
  const minTime = getMinDeliveryTime(); // Hora exacta 45 min después
  const slots = [];
  
  // 1. Agregar la primera opción EXACTA (45 minutos después)
  const hour = minTime.getHours();
  if (hour >= 7 && hour < 18) {
    slots.push({
      value: minTime.toISOString(),
      label: formatTimeSlot(minTime),
      date: new Date(minTime)
    });
  }
  
  // 2. Calcular la siguiente opción redondeada al siguiente intervalo de 10 min
  const nextSlotTime = new Date(minTime);
  const currentMinutes = nextSlotTime.getMinutes();
  const nextRoundedMinutes = Math.ceil((currentMinutes + 1) / 10) * 10; // +1 para asegurar que es después
  nextSlotTime.setMinutes(nextRoundedMinutes);
  nextSlotTime.setSeconds(0);
  nextSlotTime.setMilliseconds(0);
  
  // 3. Generar las siguientes opciones cada 10 minutos
  const numberOfSlots = hoursAhead * 6;
  
  for (let i = 0; i < numberOfSlots; i++) {
    const time = new Date(nextSlotTime);
    time.setMinutes(time.getMinutes() + (i * 10));
    
    // Solo opciones dentro del horario de servicio (7 AM - 6 PM)
    const slotHour = time.getHours();
    const slotMinute = time.getMinutes();
    
    // Aceptar hasta las 6 PM (18:00)
    if (slotHour >= 7 && (slotHour < 18 || (slotHour === 18 && slotMinute === 0))) {
      slots.push({
        value: time.toISOString(),
        label: formatTimeSlot(time),
        date: time
      });
    }
  }
  
  return slots;
};

/**
 * Formatea un slot de tiempo para mostrar
 * @param {Date} date - Fecha a formatear
 * @returns {string} Tiempo formateado
 */
export const formatTimeSlot = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  // Agregar indicador de día si es diferente a hoy
  const today = new Date();
  const isToday = date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();
  
  const dayLabel = isToday ? 'Hoy' : 'Mañana';
  
  return `${dayLabel} - ${displayHours}:${displayMinutes} ${period}`;
};

/**
 * Valida que una hora de entrega sea válida (al menos 45 min después)
 * @param {string|Date} deliveryTime - Hora de entrega a validar
 * @returns {boolean} true si es válida
 */
export const isValidDeliveryTime = (deliveryTime) => {
  if (!deliveryTime) return false;
  
  const selectedTime = new Date(deliveryTime);
  const minTime = getMinDeliveryTime();
  
  return selectedTime >= minTime;
};

/**
 * Formatea hora de entrega para mostrar en resumen
 * @param {string|Date} deliveryTime - Hora de entrega
 * @returns {string} Formato legible
 */
export const formatDeliveryTime = (deliveryTime) => {
  if (!deliveryTime) return '';
  
  const date = new Date(deliveryTime);
  return formatTimeSlot(date);
};

