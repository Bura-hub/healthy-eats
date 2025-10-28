# Documentación Técnica - Healthy Eats

## Resumen Ejecutivo
Healthy Eats es una aplicación web progresiva (PWA) para pedidos de menús saludables con recogida en restaurantes. Permite a los usuarios explorar menús, seleccionar restaurantes, programar hora de recogida y hacer seguimiento de pedidos en tiempo real.

## Metodología de Desarrollo

### Enfoque de Desarrollo

El proyecto se desarrolló utilizando una **metodología ágil iterativa**, dividida en seis fases principales que permitieron construir la aplicación de manera progresiva y ordenada. Este enfoque facilitó la identificación temprana de problemas y la adaptación continua a nuevos requisitos durante el proceso de desarrollo.

#### Fase 1: Análisis y Diseño

La primera fase del proyecto consistió en la definición clara de requisitos y el diseño de la experiencia de usuario. Se identificaron las necesidades principales de los usuarios: poder explorar menús saludables, realizar pedidos de forma intuitiva y hacer seguimiento en tiempo real de sus órdenes. Con base en estas necesidades, se diseñó un flujo de navegación centrado en el usuario que prioriza la simplicidad y la eficiencia.

La arquitectura de información se estructuró en ocho pantallas principales, cada una con un propósito específico dentro del flujo de compra. El diseño visual adoptó una paleta de colores verde esmeralda que transmite frescura y salud, complementada con la tipografía Inter para garantizar legibilidad en todos los dispositivos. Se definió un sistema de componentes reutilizables que aseguraría consistencia visual en toda la aplicación.

#### Fase 2: Configuración del Entorno

Una vez definido el diseño, se procedió a configurar el entorno de desarrollo. Se eligió Vite como herramienta de construcción por su velocidad y simplicidad, junto con React 19 como librería principal para construir la interfaz de usuario. Tailwind CSS se integró para facilitar el desarrollo de estilos mediante clases utilitarias, mientras que el plugin Vite PWA permitiría posteriormente convertir la aplicación en una PWA instalable.

La estructura de carpetas se organizó de forma modular, separando claramente las páginas (views), componentes reutilizables, utilidades y datos. Esta organización facilita el mantenimiento y la escalabilidad del proyecto. Adicionalmente, se configuró ESLint con reglas específicas para React, garantizando la calidad y consistencia del código desde el inicio.

#### Fase 3: Desarrollo por Capas

El desarrollo de la aplicación siguió un enfoque por capas, comenzando desde los componentes más básicos hasta llegar a las funcionalidades más complejas. En la primera capa se construyó un sistema robusto de iconos SVG personalizados, junto con componentes UI fundamentales como botones, inputs y tarjetas. La barra de navegación se diseñó como componente reutilizable con un sistema de badges para mostrar el contador del carrito.

La segunda capa se enfocó en las utilidades y servicios necesarios para la aplicación. Se crearon funciones para el manejo de moneda con conversión automática de USD a COP, calculadoras de tiempo para determinar horarios de recogida, y un archivo de datos simulados que permite probar todas las funcionalidades sin necesidad de un backend real.

En la tercera capa se desarrollaron las ocho pantallas principales de la aplicación. Cada pantalla se construyó como un componente independiente pero conectado al flujo general. HomeScreen sirve como punto de entrada, MenusScreen presenta el catálogo de productos, CartScreen gestiona el carrito de compras, DeliveryScreen permite seleccionar el restaurante, CheckoutScreen procesa el pago, ConfirmationScreen confirma el pedido, OrdersScreen muestra el historial, y TrackingScreen permite hacer seguimiento en tiempo real.

La cuarta capa integró todo mediante App.jsx, que actúa como contenedor principal y gestor del estado global. Aquí se implementó el sistema de navegación por vistas y se centralizó el manejo del estado compartido entre componentes, incluyendo el carrito, los pedidos y la información de entrega.

#### Fase 4: Integración de Funcionalidades

Con todos los componentes individuales desarrollados, se procedió a conectarlos para crear el flujo completo de usuario. Se implementó un sistema de notificaciones mediante snackbars que proporciona feedback inmediato en acciones como agregar productos al carrito o seleccionar un restaurante. La gestión de tiempos dinámicos se integró en el proceso de checkout, calculando automáticamente las opciones de horario disponibles basándose en el momento actual y las restricciones del negocio.

#### Fase 5: Optimización y PWA

La quinta fase se centró en optimizar la aplicación y convertirla en una Progressive Web App. Se implementó la funcionalidad offline mediante service workers, permitiendo que la aplicación funcione incluso sin conexión a internet. Las imágenes se optimizaron al formato WebP para reducir los tiempos de carga, y se agregaron etiquetas ARIA en todos los elementos interactivos para mejorar la accesibilidad. Las animaciones y transiciones se refinaron para proporcionar una experiencia de usuario fluida y moderna.

#### Fase 6: Refinamiento del Modelo de Negocio

La fase final implicó ajustes importantes en el modelo de negocio. Se realizó la conversión completa de precios de dólares a pesos colombianos con una tasa fija de conversión. El modelo de negocio cambió de delivery tradicional a pickup en restaurantes, lo que requirió modificar múltiples componentes y flujos. Se implementó un sistema sofisticado de programación de horarios que calcula el primer slot disponible exactamente 45 minutos después del pedido, con opciones subsecuentes cada 10 minutos hasta las 6 PM. Finalmente, se mejoró el sistema de seguimiento de pedidos con actualización automática de estados cada minuto.

### Principios de Desarrollo Aplicados

Durante todo el proceso de desarrollo se aplicaron principios fundamentales de ingeniería de software. El desarrollo guiado por componentes (Component-Driven Development) permitió crear elementos reutilizables y mantener una arquitectura modular. El enfoque Mobile First aseguró que la aplicación funcionara perfectamente en dispositivos móviles antes de adaptarse a pantallas más grandes.

Se siguió el principio de mejora progresiva (Progressive Enhancement), donde primero se implementó la funcionalidad básica y luego se agregaron características avanzadas. El principio DRY (Don't Repeat Yourself) evitó la duplicación de código mediante la creación de componentes y utilidades compartidas. Cada componente se diseñó con una única responsabilidad clara, facilitando su mantenimiento y testing.

El paso de estado entre componentes se manejó mediante Props Drilling, donde el estado global fluye desde el componente principal hacia los componentes hijos. La separación de responsabilidades (Separation of Concerns) se mantuvo estricta, dividiendo claramente la lógica de negocio, la presentación visual y los datos.

### Herramientas de Desarrollo

El desarrollo se realizó utilizando Visual Studio Code como editor principal, aprovechando sus extensiones para React y Tailwind CSS. El control de versiones se gestionó con Git, permitiendo rastrear cambios y mantener un historial completo del proyecto. npm se utilizó como gestor de paquetes para instalar y mantener todas las dependencias del proyecto.

Vite Dev Server proporcionó un entorno de desarrollo rápido con hot module replacement, permitiendo ver cambios instantáneamente sin recargar la página. ESLint con reglas específicas para React garantizó la calidad del código mediante análisis estático. Tailwind CSS, junto con PostCSS, permitió un desarrollo ágil de estilos mediante clases utilitarias predefinidas.

### Metodología de Testing

El testing de la aplicación se realizó en dos niveles. A nivel manual, se ejecutaron pruebas exhaustivas de navegación entre todas las pantallas, validando el flujo completo desde la exploración de menús hasta la confirmación del pedido. Se verificaron los cálculos de tiempo en diferentes escenarios, se probó la responsividad en dispositivos móviles, tablets y desktop, y se validó la funcionalidad offline desconectando la red.

Para futuras iteraciones, se propone implementar testing automatizado utilizando Jest junto con React Testing Library para pruebas unitarias de componentes individuales. Las pruebas de integración verificarían flujos completos de usuario, mientras que herramientas como Cypress o Playwright permitirían ejecutar tests end-to-end simulando interacciones reales. Finalmente, axe-core podría utilizarse para garantizar el cumplimiento de estándares de accesibilidad.

## Tecnologías Utilizadas

### Frontend
- **React 19** - Librería principal para construir la interfaz
- **Vite** - Herramienta de construcción rápida y servidor de desarrollo
- **Tailwind CSS** - Framework de estilos utilitarios para diseño moderno
- **Vite PWA Plugin** - Convierte la app en PWA con funcionalidad offline

### Funcionalidades Clave
- PWA instalable en dispositivos
- Funciona sin conexión a internet
- Diseño responsive (móvil primero)
- Calculadora de tiempos dinámicos
- Sistema de gestión de pedidos

## Estructura del Proyecto

### 1. Componente Principal (App.jsx)
El corazón de la aplicación que maneja:
- Estado global (carrito, pedidos, dirección, vista actual)
- Navegación entre pantallas
- Sistema de notificaciones (snackbar)
- Detección de conexión offline

### 2. Páginas (src/pages/)
Cada pantalla de la aplicación:

**HomeScreen** - Pantalla inicial
- Muestra información general
- Acceso rápido a menús y restaurante
- Resumen del carrito

**MenusScreen** - Catálogo de menús
- 10 menús diferentes con información nutricional
- Sistema de etiquetas (Proteína, Vegetariano, Sin Gluten)
- Agregar al carrito con notificación

**DeliveryScreen** - Selección de restaurante
- 4 restaurantes disponibles: Punto Verde, Embarca, Mesón, Living
- Notificación al seleccionar restaurante
- Información de tiempo de preparación

**CheckoutScreen** - Proceso de pago
- Selección de hora de recogida (mínimo 45 min después)
- Intervalos de tiempo cada 10 minutos hasta las 6 PM
- Resumen del pedido con precios en COP
- Simulación de procesamiento de pago

**ConfirmationScreen** - Confirmación de pedido
- Muestra ID único del pedido
- Hora de recogida programada
- Timeline del estado del pedido
- Tiempo calculado dinámicamente

**OrdersScreen** - Historial y pedidos activos
- Tabs: Activos / Historial
- Tiempos dinámicos que se actualizan cada minuto
- Estados: Preparando, Listo, Completado, Cancelado
- Acceso directo al tracking

**TrackingScreen** - Seguimiento en tiempo real
- 3 pasos: Confirmado → En Preparación → Listo para Recoger
- Tiempo estimado actualizado dinámicamente
- Opción de cancelar pedido

**CartScreen** - Carrito de compras
- Modificar cantidades de productos
- Eliminar items
- Ver total en pesos colombianos
- Mensaje de ahorro en descuentos

### 3. Componentes Reutilizables (src/components/)

**NavBar** - Barra de navegación inferior
- 4 botones principales: Inicio, Menús, Carrito, Pedidos
- Badge del carrito con cantidad de items
- Indicador de estado de conexión
- Botón de soporte

**Icon** - Sistema de iconos
- Más de 40 iconos SVG personalizados
- Tamaños y colores configurables
- Optimizados para rendimiento

**ContactModal** - Modal de contacto
- Información de soporte
- Enlaces a redes sociales
- Horarios de atención

**OfflineScreen** - Pantalla sin conexión
- Mensaje amigable cuando no hay internet
- Botón para reintentar conexión

### 4. Utilidades (src/utils/)

**currency.js** - Manejo de moneda
- Conversión USD a COP (tasa: 1 USD = 4,000 COP)
- Formato de precios en pesos colombianos
- Funciones: `formatCOP()`, `formatCOPFromUSD()`

**timeHelpers.js** - Cálculos de tiempo
- `getMinDeliveryTime()` - Calcula 45 min exactos después de ahora
- `generateTimeSlots()` - Genera opciones de horario cada 10 min hasta las 6 PM
- `formatTimeSlot()` - Formatea tiempo para mostrar (ej: "Hoy - 2:30 PM")
- `isValidDeliveryTime()` - Valida que el tiempo sea válido
- `formatDeliveryTime()` - Formatea hora de entrega

### 5. Datos (src/data/)

**mockData.js** - Datos simulados
- 10 menús con información nutricional completa
- 4 restaurantes para recogida
- Configuración de la app (nombre, versión, moneda)
- Todos los menús a $18,500 COP

## Flujo de la Aplicación

### 1. Usuario entra a la app
→ Ve HomeScreen con información general

### 2. Explora menús
→ MenusScreen muestra 10 opciones
→ Puede filtrar por etiquetas
→ Ve detalles nutricionales
→ Agrega items al carrito

### 3. Selecciona restaurante
→ DeliveryScreen muestra 4 restaurantes
→ Recibe notificación al seleccionar
→ Ve tiempo estimado de preparación

### 4. Procede al pago
→ CheckoutScreen muestra resumen
→ Selecciona hora de recogida (mínimo 45 min)
→ Opciones cada 10 minutos hasta las 6 PM
→ Simula procesamiento de pago

### 5. Confirma pedido
→ ConfirmationScreen muestra éxito
→ Genera ID único de pedido
→ Muestra hora exacta de recogida
→ Timeline con estados del pedido

### 6. Hace seguimiento
→ OrdersScreen lista todos los pedidos
→ Ver activos o historial
→ Tiempos actualizados cada minuto
→ Acceso a tracking detallado

### 7. Recoge pedido
→ TrackingScreen muestra estado en tiempo real
→ Notifica cuando está listo
→ Opción de cancelar si es necesario

## Características Especiales

### Sistema de Tiempos Dinámicos
- Calcula automáticamente 45 minutos después del pedido
- Primera opción: tiempo exacto (ej: 2:37 PM)
- Siguientes opciones: redondeadas a 10 min (2:40, 2:50, 3:00...)
- Límite: hasta las 6:00 PM
- Actualización automática cada minuto

### Gestión de Pedidos
- Estado global en App.jsx
- Cada pedido tiene:
  - ID único
  - Fecha y hora
  - Restaurante
  - Items con cantidades
  - Hora de recogida
  - Estado (preparando/listo/completado/cancelado)
- Simulación de cambio de estado (preparando → listo en 30 seg)

### Sistema de Notificaciones
- Snackbar centralizado en App.jsx
- Mensajes contextuales:
  - "Añadido al carrito" al agregar menú
  - "Restaurante seleccionado" con acción rápida
  - Posición: centrado abajo, sobre navbar
- Duración: 3 segundos
- Auto-dismissible

### Precios en Pesos Colombianos
- Conversión automática USD → COP
- Tasa fija: 1 USD = 4,000 COP
- Formato: $18.500 (con punto de miles)
- Todos los menús: $18,500 COP
- Sin costo de envío (recogida en local)

### PWA (Progressive Web App)
- Instalable en dispositivos móviles
- Funciona offline
- Atajos de app:
  - Ver Menús
  - Mi Carrito
- Caché inteligente de recursos
- Actualización automática

## Diseño y UX

### Principios de Diseño
- **Mobile First**: Diseñado primero para móviles
- **Responsive**: Se adapta a tablets y desktop
- **Accesible**: Etiquetas ARIA, contraste adecuado
- **Moderno**: Gradientes, sombras, animaciones suaves

### Paleta de Colores
- Verde esmeralda (#16a34a) - Principal
- Verde azulado (#14b8a6) - Secundario
- Gris pizarra - Textos y fondos
- Gradientes verde-azul - Botones y acentos

### Tipografía
- Inter - Fuente principal
- SF Pro Display/Text - Textos especiales
- Pesos: 400 (normal), 500 (medio), 600 (semibold), 900 (black)

### Animaciones
- Fade in al cargar pantallas
- Slide up para elementos
- Scale en hover de botones
- Pulse para elementos activos
- Transiciones de 300ms

## Patrones de Código

### Gestión de Estado
```javascript
// Estado centralizado en App.jsx
const [cart, setCart] = useState([]);
const [orders, setOrders] = useState([]);
const [deliveryTime, setDeliveryTime] = useState(null);

// Props drilling para pasar estado
<CheckoutScreen setOrders={setOrders} />
```

### Navegación
```javascript
// Sistema de vistas con switch
const [view, setView] = useState('home');

// Función de navegación
const navigateToView = (newView) => {
  setView(newView);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### Cálculos de Tiempo
```javascript
// Tiempo mínimo (exacto)
const now = new Date();
now.setMinutes(now.getMinutes() + 45);

// Slots cada 10 minutos
const minutes = Math.ceil(now.getMinutes() / 10) * 10;
```

### Formateo de Moneda
```javascript
// USD a COP
const USD_TO_COP = 4000;
const cop = usdAmount * USD_TO_COP;

// Formato
new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
}).format(cop);
```

## Optimizaciones

### Rendimiento
- Uso de `useMemo` para cálculos costosos
- Lazy loading de componentes (potencial)
- Imágenes optimizadas en WebP
- Caché de Service Worker

### UX
- Feedback inmediato en todas las acciones
- Estados de carga claros
- Mensajes de error amigables
- Navegación intuitiva

### Accesibilidad
- Etiquetas ARIA en todos los elementos interactivos
- Navegación por teclado
- Contraste WCAG AA
- Focus visible

## Próximas Mejoras Potenciales

1. **Backend real**: Conexión a API para pedidos reales
2. **Autenticación**: Login de usuarios
3. **Pagos reales**: Integración con pasarela de pago
4. **Notificaciones push**: Avisar cuando el pedido está listo
5. **Geolocalización**: Mostrar restaurantes cercanos
6. **Historial detallado**: Más información de pedidos pasados
7. **Reordenar**: Repetir pedidos anteriores con un clic
8. **Favoritos**: Guardar menús favoritos
9. **Personalización**: Modificar ingredientes
10. **Chat de soporte**: Comunicación en tiempo real

## Conclusión

Healthy Eats es una PWA moderna y funcional que demuestra:
- Arquitectura React bien estructurada
- Gestión de estado efectiva
- UX cuidada y accesible
- Diseño responsive y atractivo
- Funcionalidades avanzadas (PWA, tiempos dinámicos)

La aplicación está lista para ser desplegada y puede ser fácilmente conectada a un backend real para convertirse en una solución de producción completa.

