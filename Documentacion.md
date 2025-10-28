# Documentación Técnica - Healthy Eats

## Resumen Ejecutivo
Healthy Eats es una aplicación web progresiva (PWA) para pedidos de menús saludables con recogida en restaurantes. Permite a los usuarios explorar menús, seleccionar restaurantes, programar hora de recogida y hacer seguimiento de pedidos en tiempo real.

## Metodología de Desarrollo

### Enfoque de Desarrollo
El proyecto se desarrolló utilizando una **metodología ágil iterativa**, con las siguientes fases:

#### 1. Fase de Análisis y Diseño
- **Definición de requisitos**: Identificación de necesidades del usuario (explorar menús, hacer pedidos, seguimiento)
- **Diseño de experiencia de usuario (UX)**: Flujo de navegación centrado en el usuario
- **Arquitectura de información**: Estructura de 8 pantallas principales con navegación intuitiva
- **Diseño visual (UI)**: Sistema de diseño con paleta verde esmeralda, tipografía Inter, componentes reutilizables

#### 2. Fase de Configuración Inicial
- Configuración de entorno de desarrollo con Vite
- Instalación de dependencias (React 19, Tailwind CSS, PWA Plugin)
- Estructura de carpetas modular (pages, components, utils, data)
- Configuración de ESLint para calidad de código

#### 3. Fase de Desarrollo por Componentes
Se utilizó un **enfoque de desarrollo por capas**:

**Capa 1: Componentes Base**
- Sistema de iconos (Icon.jsx)
- Componentes UI reutilizables (Button, Input, Card)
- Barra de navegación (NavBar)
- Modales (ContactModal, CancelOrderModal)

**Capa 2: Utilidades y Servicios**
- Manejo de moneda (currency.js)
- Cálculos de tiempo (timeHelpers.js)
- Datos simulados (mockData.js)

**Capa 3: Pantallas Principales**
- HomeScreen (landing page)
- MenusScreen (catálogo)
- CartScreen (carrito)
- DeliveryScreen (selección de restaurante)
- CheckoutScreen (proceso de pago)
- ConfirmationScreen (confirmación)
- OrdersScreen (historial y seguimiento)
- TrackingScreen (seguimiento en tiempo real)

**Capa 4: Gestión de Estado Global**
- App.jsx como contenedor principal
- Sistema de navegación por vistas
- Estado compartido (carrito, pedidos, dirección)

#### 4. Fase de Integración
- Conexión de todos los componentes
- Flujo completo de usuario (explorar → agregar → pagar → confirmar → seguir)
- Sistema de notificaciones (snackbar)
- Gestión de tiempos dinámicos

#### 5. Fase de Optimización
- Implementación de PWA (offline, instalable)
- Optimización de imágenes (WebP)
- Mejoras de accesibilidad (ARIA labels)
- Ajustes de UX (animaciones, feedback)

#### 6. Fase de Refinamiento
- Conversión de precios a COP
- Cambio de modelo delivery a pickup
- Implementación de tiempos programados
- Sistema de seguimiento de pedidos mejorado

### Principios de Desarrollo Aplicados

1. **Component-Driven Development**: Construcción modular de UI
2. **Mobile First**: Diseño responsive desde móvil
3. **Progressive Enhancement**: Funcionalidad básica → características avanzadas
4. **DRY (Don't Repeat Yourself)**: Componentes y utilidades reutilizables
5. **Single Responsibility**: Cada componente con propósito único
6. **Props Drilling**: Paso de estado por jerarquía de componentes
7. **Separation of Concerns**: Separación de lógica, presentación y datos

### Herramientas de Desarrollo

- **Editor**: Visual Studio Code
- **Control de versiones**: Git
- **Gestor de paquetes**: npm
- **Servidor de desarrollo**: Vite Dev Server
- **Linter**: ESLint con reglas React
- **Estilos**: Tailwind CSS con PostCSS

### Metodología de Testing (Propuesta)

**Testing Manual Realizado:**
- Pruebas de navegación entre pantallas
- Validación de flujo completo de pedido
- Verificación de cálculos de tiempo
- Pruebas de responsividad en múltiples dispositivos
- Verificación de funcionalidad offline

**Testing Automatizado Sugerido:**
- Unit testing: Jest + React Testing Library
- Integration testing: Pruebas de flujos completos
- E2E testing: Cypress o Playwright
- Accessibility testing: axe-core

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

