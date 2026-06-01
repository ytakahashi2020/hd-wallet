import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages repo name: https://<user>.github.io/hd-wallet/
export default defineConfig({
  base: '/hd-wallet/',
  plugins: [react()],
})
