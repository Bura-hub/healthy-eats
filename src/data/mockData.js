// Datos simulados de menús (Mock Data de alta fidelidad)
export const MENU_DATA = [
  { 
    id: 1, 
    day: 'Día 1', 
    name: 'Menú A', 
    kcal: 525, 
    description: 'Ensalada tibia de garbanzos con verduras, pollo a la plancha, arroz integral y mandarina.', 
    price: 12.50, 
    tags: ['Proteína', 'Bajo en Grasa'],
    image: '/images/menu-a.jpg'
  },
  { 
    id: 2, 
    day: 'Día 1', 
    name: 'Menú B', 
    kcal: 455, 
    description: 'Wrap integral con atún y aguacate, bastones de zanahoria y apio, yogur natural.', 
    price: 10.00, 
    tags: ['Sin Gluten', 'Vegetariano'],
    image: '/images/menu-b.jpg'
  },
  { 
    id: 3, 
    day: 'Día 2', 
    name: 'Menú C', 
    kcal: 610, 
    description: 'Lentejas estofadas con verduras y cúrcuma, salmón al horno y una rebanada de pan integral.', 
    price: 14.50, 
    tags: ['Proteína', 'Fibra'],
    image: '/images/menu-c.jpg'
  },
  { 
    id: 4, 
    day: 'Día 2', 
    name: 'Menú D', 
    kcal: 490, 
    description: 'Sopa de tomate y albahaca, bocadillo de pavo y aguacate en pan de centeno.', 
    price: 9.50, 
    tags: ['Bajo en Grasa'],
    image: '/images/menu-d.jpg'
  },
  { 
    id: 5, 
    day: 'Día 3', 
    name: 'Menú E', 
    kcal: 540, 
    description: 'Tazón de quinoa con pollo, espinacas, nueces y aderezo de limón.', 
    price: 13.00, 
    tags: ['Proteína', 'Sin Gluten'],
    image: '/images/menu-e.jpg'
  },
  { 
    id: 6, 
    day: 'Día 3', 
    name: 'Menú F', 
    kcal: 410, 
    description: 'Crema de calabaza, tortilla de claras con champiñones y una pieza de fruta.', 
    price: 8.50, 
    tags: ['Vegetariano', 'Bajo en Carbohidratos'],
    image: '/images/menu-f.jpg'
  },
  { 
    id: 7, 
    day: 'Día 4', 
    name: 'Menú G', 
    kcal: 580, 
    description: 'Curry de verduras y tofu con arroz basmati integral, acompañado de té verde.', 
    price: 11.50, 
    tags: ['Vegetariano', 'Vegano'],
    image: '/images/menu-g.jpg'
  },
  { 
    id: 8, 
    day: 'Día 4', 
    name: 'Menú H', 
    kcal: 470, 
    description: 'Pechuga de pavo rellena de espárragos y queso fresco, con puré de brócoli.', 
    price: 13.50, 
    tags: ['Proteína', 'Sin Gluten'],
    image: '/images/menu-h.jpg'
  },
  { 
    id: 9, 
    day: 'Día 5', 
    name: 'Menú I', 
    kcal: 650, 
    description: 'Pasta integral con salsa boloñesa de lentejas y una ensalada pequeña de rúcula.', 
    price: 12.00, 
    tags: ['Fibra', 'Vegano'],
    image: '/images/menu-i.jpg'
  },
  { 
    id: 10, 
    day: 'Día 5', 
    name: 'Menú J', 
    kcal: 515, 
    description: 'Brochetas de pollo y pimientos, patatas asadas con hierbas y agua de limón.', 
    price: 14.00, 
    tags: ['Proteína', 'Bajo en Grasa'],
    image: '/images/menu-j.jpg'
  },
];

// Direcciones predeterminadas
export const SAVED_ADDRESSES = [
  { 
    id: 1,
    line1: 'Calle Falsa 123', 
    city: 'Ciudad Modelo', 
    postalCode: '10001',
    isDefault: false
  },
  { 
    id: 2,
    line1: 'Avenida Principal #45', 
    city: 'Zona Centro', 
    postalCode: '10002',
    isDefault: true
  },
];

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Healthy Eats',
  description: 'Menús saludables a domicilio',
  version: '1.0.0',
  deliveryFee: 5.00,
  estimatedDeliveryTime: '30-45 min',
  currency: 'USD',
  currencySymbol: '$',
};
