import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { resolve } from 'path';


export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  base: '/762-template',
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve('src', 'index.html'),
        arsenal: resolve('src', 'pages/arsenal.html'),
        contact: resolve('src', 'pages/contact.html'),
        newsDetail: resolve('src', 'pages/newsDetail.html'),
        catalogDetail: resolve('src', 'pages/catalogDetail.html'),
        policy: resolve('src', 'pages/policy.html'),
        error: resolve('src', 'pages/error.html')
      },
      output: {
        manualChunks: false,
        entryFileNames: '[name].js',   // currently does not work for the legacy bundle
        assetFileNames: '[name].[ext]', // currently does not work for images
      },
    }
  }
});