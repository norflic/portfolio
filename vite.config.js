import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    base: '/portfolio/', // Assure-toi que c'est le bon nom de ton repo
    plugins: [
        react(),
        tailwindcss(),
    ],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
    }
})