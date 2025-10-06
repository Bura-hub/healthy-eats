import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compressImages() {
  console.log('🔄 Comprimiendo imágenes...');
  
  try {
    // Comprimir imágenes del menú (PNG)
    const menuImages = await imagemin(['public/images/*.png'], {
      destination: 'public/images/compressed',
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8], // Calidad entre 60% y 80%
          speed: 4
        })
      ]
    });
    
    console.log(`✅ Comprimidas ${menuImages.length} imágenes PNG del menú`);
    
    // Comprimir imagen de fondo (PNG)
    const backgroundImage = await imagemin(['src/assets/images/fondo_inicio.png'], {
      destination: 'src/assets/images/compressed',
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8], // Calidad entre 60% y 80%
          speed: 4
        })
      ]
    });
    
    console.log(`✅ Comprimida imagen de fondo PNG`);
    
    // Crear versiones WebP (opcional, mejor compresión)
    const webpImages = await imagemin(['public/images/*.png', 'src/assets/images/fondo_inicio.png'], {
      destination: 'public/images/webp',
      plugins: [
        imageminWebp({
          quality: 80
        })
      ]
    });
    
    console.log(`✅ Creadas ${webpImages.length} versiones WebP`);
    
    // Mostrar estadísticas de compresión
    console.log('\n📊 Estadísticas de compresión:');
    
    // Verificar tamaños de imágenes comprimidas
    const compressedDir = 'public/images/compressed';
    
    if (fs.existsSync(compressedDir)) {
      const compressedFiles = fs.readdirSync(compressedDir).filter(f => f.endsWith('.png'));
      
      console.log('\n📊 Tamaños de imágenes comprimidas:');
      compressedFiles.forEach(file => {
        const compressedPath = path.join(compressedDir, file);
        const compressedSize = fs.statSync(compressedPath).size;
        console.log(`  ${file}: ${(compressedSize/1024).toFixed(1)}KB`);
      });
    }
    
    // Verificar tamaño de imagen de fondo comprimida
    const backgroundCompressedPath = 'src/assets/images/compressed/fondo_inicio.png';
    if (fs.existsSync(backgroundCompressedPath)) {
      const backgroundSize = fs.statSync(backgroundCompressedPath).size;
      console.log(`\n📊 Imagen de fondo comprimida:`);
      console.log(`  fondo_inicio.png: ${(backgroundSize/1024).toFixed(1)}KB`);
    }
    
    console.log('\n🎉 Compresión completada!');
    console.log('📁 Imágenes comprimidas guardadas en:');
    console.log('   - public/images/compressed/ (PNG comprimidos)');
    console.log('   - src/assets/images/compressed/ (PNG comprimido)');
    console.log('   - public/images/webp/ (versiones WebP)');
    
  } catch (error) {
    console.error('❌ Error durante la compresión:', error);
  }
}

// Ejecutar compresión
compressImages();
