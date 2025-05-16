module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      config: './tailwind.config.js', // optional if using default
    }),
    require('autoprefixer'),
  ]
}