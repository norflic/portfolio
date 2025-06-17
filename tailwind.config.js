// tailwind.config.js

import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                very_dark: "#111827", // nom de ton choix
                customblack: "#000000", // nom de ton choix

            },
        },
    },
    plugins: [aspectRatio],
}
