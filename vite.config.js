import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Baris di bawah ini adalah kunci agar GitHub Pages tidak error 404
  base: "/My-Portofolio/", 
  server: {
    // Pengaturan ngrok kamu tetap dipertahankan di sini
    allowedHosts: true 
  }
})