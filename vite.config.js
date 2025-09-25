import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to './' so built assets use relative paths. This helps when
// Vercel serves the site from the filesystem or a subpath.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
