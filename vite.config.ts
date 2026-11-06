import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const basePath = '/bright-ethiopia-visual-demo/';
const assetFolders = 'lesson-image|thumbnails|books|books-thumbnails|icons';

function fixGitHubPagesAssetPaths() {
  return {
    name: 'fix-github-pages-asset-paths',
    apply: 'build' as const,
    enforce: 'pre' as const,

    transform(code: string, id: string) {
      const file = id.split('?')[0];

      if (
        file.includes('node_modules') ||
        !/\.(tsx?|jsx?|css|html)$/.test(file)
      ) {
        return null;
      }

      const quotedPattern = new RegExp(
        `(["'\`])\\/(${assetFolders})\\/`,
        'g'
      );

      let updated = code.replace(
        quotedPattern,
        (_match, quote, folder) => `${quote}${basePath}${folder}/`
      );

      const cssPattern = new RegExp(
        `url\\(\\s*\\/(${assetFolders})\\/`,
        'g'
      );

      updated = updated.replace(
        cssPattern,
        (_match, folder) => `url(${basePath}${folder}/`
      );

      return updated === code ? null : { code: updated, map: null };
    },
  };
}

export default defineConfig({
  base: basePath,
  publicDir: false,

  plugins: [
    react(),
    fixGitHubPagesAssetPaths(),

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