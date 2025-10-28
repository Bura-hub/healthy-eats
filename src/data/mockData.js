// Datos simulados de menús (Mock Data de alta fidelidad) - CORREGIDOS según especificaciones
export const MENU_DATA = [
  // DÍA 1
  { 
    id: 1, 
    day: 'Día 1', 
    name: 'Menú A', 
    kcal: 525, 
    description: 'Ensalada tibia de garbanzos con verduras, pechuga de pollo a la plancha, arroz integral y mandarina.', 
    price: 4.625, 
    tags: ['Proteína', 'Bajo en Grasa'],
    image: '/images/menu-a.png',
    nutritionalValues: {
      protein: '32g',
      carbs: '45g',
      fat: '12g',
      fiber: '8g'
    }
  },
  { 
    id: 2, 
    day: 'Día 1', 
    name: 'Menú B', 
    kcal: 455, 
    description: 'Wrap integral con atún y aguacate, bastones de zanahoria y apio, y yogur natural.', 
    price: 4.625, 
    tags: ['Sin Gluten', 'Vegetariano'],
    image: '/images/menu-b.png',
    nutritionalValues: {
      protein: '28g',
      carbs: '38g',
      fat: '18g',
      fiber: '6g'
    }
  },
  
  // DÍA 2
  { 
    id: 3, 
    day: 'Día 2', 
    name: 'Menú A', 
    kcal: 425, 
    description: 'Lentejas guisadas con verduras, huevo duro, ensalada fresca y manzana verde.', 
    price: 4.625, 
    tags: ['Proteína', 'Fibra'],
    image: '/images/menu-c.png',
    nutritionalValues: {
      protein: '24g',
      carbs: '52g',
      fat: '8g',
      fiber: '12g'
    }
  },
  { 
    id: 4, 
    day: 'Día 2', 
    name: 'Menú B', 
    kcal: 480, 
    description: 'Ensalada de quinua con pollo y verduras, pan integral y uvas.', 
    price: 4.625, 
    tags: ['Proteína', 'Sin Gluten'],
    image: '/images/menu-d.png',
    nutritionalValues: {
      protein: '35g',
      carbs: '42g',
      fat: '14g',
      fiber: '7g'
    }
  },
  
  // DÍA 3
  { 
    id: 5, 
    day: 'Día 3', 
    name: 'Menú A', 
    kcal: 435, 
    description: 'Arroz con verduras, tortilla de huevo con espinaca y banano.', 
    price: 4.625, 
    tags: ['Vegetariano', 'Bajo en Grasa'],
    image: '/images/menu-e.png',
    nutritionalValues: {
      protein: '18g',
      carbs: '58g',
      fat: '9g',
      fiber: '5g'
    }
  },
  { 
    id: 6, 
    day: 'Día 3', 
    name: 'Menú B', 
    kcal: 400, 
    description: 'Arepa integral rellena de pollo, ensalada de repollo y zanahoria, y piña.', 
    price: 4.625, 
    tags: ['Proteína', 'Sin Gluten'],
    image: '/images/menu-f.png',
    nutritionalValues: {
      protein: '26g',
      carbs: '38g',
      fat: '12g',
      fiber: '6g'
    }
  },
  
  // DÍA 4
  { 
    id: 7, 
    day: 'Día 4',
    name: 'Menú A', 
    kcal: 380, 
    description: 'Sopa de verduras ligera, filete de pescado al horno, puré de papa y naranja.', 
    price: 4.625, 
    tags: ['Proteína', 'Bajo en Grasa'],
    image: '/images/menu-g.png',
    nutritionalValues: {
      protein: '28g',
      carbs: '35g',
      fat: '8g',
      fiber: '6g'
    }
  },
  { 
    id: 8, 
    day: 'Día 4', 
    name: 'Menú B', 
    kcal: 630, 
    description: 'Ensalada de pasta integral con atún y espinaca, pera y frutos secos.', 
    price: 4.625, 
    tags: ['Proteína', 'Fibra'],
    image: '/images/menu-h.png',
    nutritionalValues: {
      protein: '38g',
      carbs: '52g',
      fat: '22g',
      fiber: '9g'
    }
  },
  
  // DÍA 5
  { 
    id: 9, 
    day: 'Día 5', 
    name: 'Menú A', 
    kcal: 460, 
    description: 'Bowl de arroz integral con pollo y verduras, salsa ligera y mango.', 
    price: 4.625, 
    tags: ['Proteína', 'Sin Gluten'],
    image: '/images/menu-i.png',
    nutritionalValues: {
      protein: '30g',
      carbs: '48g',
      fat: '12g',
      fiber: '7g'
    }
  },
  { 
    id: 10, 
    day: 'Día 5', 
    name: 'Menú B', 
    kcal: 445, 
    description: 'Wrap integral de huevo, aguacate y espinaca, yogur griego natural y kiwi.', 
    price: 4.625, 
    tags: ['Vegetariano', 'Proteína'],
    image: '/images/menu-j.png',
    nutritionalValues: {
      protein: '22g',
      carbs: '42g',
      fat: '18g',
      fiber: '8g'
    }
  },
];

// Direcciones predeterminadas (restaurantes para recogida)
export const SAVED_ADDRESSES = [
  { 
    id: 1,
    name: 'Punto Verde',
    line1: 'Punto Verde',
    city: '',
    postalCode: '',
    isDefault: true,
    deliveryTime: 'Mínimo 45 min',
    icon: 'Utensils'
  },
  { 
    id: 2,
    name: 'Embarca',
    line1: 'Embarca',
    city: '',
    postalCode: '',
    isDefault: false,
    deliveryTime: 'Mínimo 45 min',
    icon: 'Utensils'
  },
  { 
    id: 3,
    name: 'Mesón',
    line1: 'Mesón',
    city: '',
    postalCode: '',
    isDefault: false,
    deliveryTime: 'Mínimo 45 min',
    icon: 'Utensils'
  },
  { 
    id: 4,
    name: 'Living',
    line1: 'Living',
    city: '',
    postalCode: '',
    isDefault: false,
    deliveryTime: 'Mínimo 45 min',
    icon: 'Utensils'
  },
];

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'Healthy Eats',
  description: 'Menús saludables a domicilio',
  version: '1.0.0',
  deliveryFee: 0.00,
  estimatedDeliveryTime: '15-20 min',
  currency: 'COP',
  currencySymbol: '$',
};
