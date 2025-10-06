# 🥗 Healthy Eats - Menús Saludables

Una aplicación web progresiva (PWA) moderna para pedidos de comida saludable, desarrollada con React y Tailwind CSS.

## ✨ Características

- **🎨 Diseño Profesional**: Interfaz moderna y elegante con animaciones suaves
- **📱 PWA**: Aplicación web progresiva instalable en dispositivos móviles
- **🍽️ Menús del Día**: Sistema de menús diarios con filtros por día
- **🛒 Carrito Inteligente**: Gestión de pedidos con cantidades y totales
- **📍 Entrega**: Configuración de direcciones de entrega
- **💳 Checkout**: Proceso de pago simulado
- **📦 Seguimiento**: Sistema de seguimiento de pedidos en tiempo real
- **🎭 Animaciones**: Transiciones profesionales y microinteracciones
- **♿ Accesibilidad**: Diseño accesible con navegación por teclado

## 🚀 Tecnologías

- **React 18** - Framework de JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Vite** - Herramienta de construcción rápida
- **PWA** - Service Worker y Manifest
- **ESLint** - Linter de código

## 📱 Pantallas

### 🏠 Inicio
- Imagen circular con efectos de anillo
- Tarjetas de acción principales
- Botón CTA dinámico según estado del carrito
- Animaciones de entrada escalonadas

### 🍽️ Menús del Día
- Carrusel de días de la semana
- Barra de búsqueda
- Tarjetas de menú con información nutricional
- Modal de detalles con ingredientes y alérgenos
- Sistema de cantidades con controles +/-

### 🛒 Carrito
- Lista de items con miniaturas
- Controles de cantidad
- Cálculo automático de totales
- Botón de checkout

### 📍 Entrega
- Lista de direcciones guardadas
- Formulario para nueva dirección
- Selección en mapa
- Estimación de tiempo de entrega

### 💳 Checkout
- Resumen del pedido
- Selección de método de pago
- Simulación de procesamiento
- Confirmación de pedido

### 📦 Seguimiento
- Timeline de estados del pedido
- Actualizaciones automáticas
- Tiempo estimado de entrega

## 🎨 Diseño

### Paleta de Colores
- **Primario**: Verde esmeralda (`emerald-500`)
- **Secundario**: Azul (`blue-500`)
- **Neutros**: Grises (`slate-*`, `gray-*`)
- **Acentos**: Amarillo (`yellow-*`)

### Tipografía
- **Principal**: Inter (sans-serif)
- **Pesos**: 300, 400, 500, 600, 700, 800, 900
- **Espaciado**: Letter-spacing optimizado

### Animaciones
- **Entrada**: `fade-in-up` con delays escalonados
- **Escala**: `scale-in` para elementos principales
- **Hover**: Transiciones suaves con `scale` y `shadow`
- **Microinteracciones**: Feedback visual en botones

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/healthy-eats.git

# Navegar al directorio
cd healthy-eats/healthy-eats-demo

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 📁 Estructura del Proyecto

```
healthy-eats-demo/
├── src/
│   ├── components/
│   │   ├── Icon.jsx          # Componente de iconos SVG
│   │   ├── NavBar.jsx        # Barra de navegación inferior
│   │   └── ContactModal.jsx  # Modal de contacto
│   ├── pages/
│   │   ├── HomeScreen.jsx    # Pantalla de inicio
│   │   ├── MenusScreen.jsx   # Pantalla de menús
│   │   ├── CartScreen.jsx    # Pantalla de carrito
│   │   ├── DeliveryScreen.jsx # Pantalla de entrega
│   │   ├── CheckoutScreen.jsx # Pantalla de checkout
│   │   ├── ConfirmationScreen.jsx # Confirmación
│   │   └── TrackingScreen.jsx # Seguimiento
│   ├── data/
│   │   └── mockData.js       # Datos de prueba
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales y animaciones
├── public/
│   └── vite.svg             # Icono de Vite
├── package.json
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
└── README.md
```

## 🎯 Funcionalidades Principales

### 🍽️ Sistema de Menús
- Menús diarios con información nutricional
- Filtros por día de la semana
- Búsqueda por nombre o ingredientes
- Modal de detalles con ingredientes y alérgenos

### 🛒 Gestión de Carrito
- Agregar/quitar items
- Control de cantidades
- Cálculo automático de totales
- Persistencia durante la sesión

### 📍 Sistema de Entrega
- Múltiples direcciones guardadas
- Formulario de nueva dirección
- Estimación de tiempo de entrega
- Validación de direcciones

### 💳 Proceso de Pago
- Simulación de procesamiento
- Múltiples métodos de pago
- Manejo de errores
- Confirmación de pedido

### 📦 Seguimiento de Pedidos
- Estados en tiempo real
- Timeline visual
- Actualizaciones automáticas
- Notificaciones de estado

## 🎨 Animaciones y UX

### Animaciones de Entrada
- **Escalonadas**: Elementos aparecen uno tras otro
- **Suaves**: Transiciones con `ease-out`
- **Profesionales**: Efectos de escala y deslizamiento

### Microinteracciones
- **Hover**: Escala y sombras
- **Active**: Feedback de presión
- **Focus**: Estados de enfoque accesibles

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a tablet y desktop
- **Touch Targets**: Áreas táctiles de 44px mínimo

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Subir carpeta dist/ a Vercel
```

### Netlify
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### GitHub Pages
```bash
npm run build
# Configurar GitHub Actions para despliegue automático
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- [React](https://reactjs.org/) - Framework de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Vite](https://vitejs.dev/) - Herramienta de construcción
- [Heroicons](https://heroicons.com/) - Iconos SVG

---

⭐ **¡Dale una estrella si te gusta el proyecto!**