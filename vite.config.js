import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesでホスティングする場合、ベースパスを設定することがあります。
  base: '/kids-image-book',
  resolve: {
    alias: {
      'swiper/react': path.resolve(__dirname, 'src/lib/swiper/react.jsx'),
      'swiper/css': path.resolve(__dirname, 'src/lib/swiper/swiper.css'),
    },
  },
});
