# Imágenes de Menús - Healthy Eats

Esta carpeta contiene las imágenes de los menús de la aplicación Healthy Eats.

## 📁 Estructura de Archivos

Las imágenes deben seguir esta nomenclatura:

```
menu-a.jpg  - Menú A (Día 1)
menu-b.jpg  - Menú B (Día 1)
menu-c.jpg  - Menú C (Día 2)
menu-d.jpg  - Menú D (Día 2)
menu-e.jpg  - Menú E (Día 3)
menu-f.jpg  - Menú F (Día 3)
menu-g.jpg  - Menú G (Día 4)
menu-h.jpg  - Menú H (Día 4)
menu-i.jpg  - Menú I (Día 5)
menu-j.jpg  - Menú J (Día 5)
```

## 🖼️ Especificaciones de Imagen

- **Formato**: JPG o PNG
- **Tamaño recomendado**: 400x400px (cuadrado)
- **Peso máximo**: 500KB por imagen
- **Calidad**: Alta resolución para dispositivos retina

## 🔧 Cómo Agregar Imágenes

1. Coloca las imágenes en esta carpeta (`public/images/`)
2. Nombra los archivos según la nomenclatura indicada
3. Las imágenes se mostrarán automáticamente en la aplicación
4. Si una imagen no se encuentra, se mostrará un ícono de respaldo

## 📱 Uso en la Aplicación

Las imágenes se muestran en:
- Lista de menús (thumbnail 80x80px)
- Modal de detalle del menú (imagen completa 400x200px)
- Carrito de compras (thumbnail pequeño)

## ⚠️ Notas Importantes

- Las rutas están definidas en `src/data/mockData.js`
- Las imágenes se sirven desde la carpeta `public/` (accesibles directamente)
- Si cambias el nombre de un archivo, actualiza también la ruta en `mockData.js`
