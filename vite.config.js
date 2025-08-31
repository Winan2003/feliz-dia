import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: [
      'feliz-cumpleanos-angie.onrender.com', // ← CORREGIDO: "angie" en lugar de "angle"
      'feliz-cumpleanos-angle.onrender.com'  // ← También mantén el original por si acaso
    ]
  }
})