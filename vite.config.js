import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesでホスティングする場合、ベースパスを設定することがあります。
  // 今回はルート(`/`)を想定します。
  base: '/', 
});
