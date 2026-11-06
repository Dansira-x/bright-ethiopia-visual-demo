import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  base: '/bright-ethiopia-visual-demo/',
  publicDir: false,
  plugins: [
    react(),
    {
      name: 'copy-public-assets-without-pdfs',
      closeBundle() {
        const source = path.resolve('public');
        const destination = path.resolve('dist');

        fs.cpSync(source, destination, {
          recursive: true,
          filter: (filePath) => {
            const relativePath = path.relative(source, filePath);
            const firstFolder = relativePath.split(path.sep)[0];

            if (firstFolder === 'books') return false;
            if (path.extname(filePath).toLowerCase() === '.pdf') return false;

            return true;
          },
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});