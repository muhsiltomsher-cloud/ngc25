// postcss.config.mjs
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config = {
  plugins: [
    tailwindcss,  // Tailwind CSS plugin
    autoprefixer, // Autoprefixer plugin
  ],
};

export default config;
