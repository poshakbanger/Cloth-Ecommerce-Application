// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {port: 5174},
//   optimizeDeps: {
//     include: ['react-router-dom']
//   },
//   build: {
//     rollupOptions: {
//       external: ['react-router-dom']
//     }
//   }
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {port: 5174},
  optimizeDeps: {
    include: ['react-router-dom']
  },
  build: {
    commonjsOptions: {
      include: [/react-router-dom/, /node_modules/]
    }
  }
})