module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-import-ext-glob'),
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 0, // Enables all modern CSS features
      features: {
        'color-functional-notation': true,  // Enable modern color functions
        'relative-color-syntax': true, // Enable relative color functions
        'nesting-rules': true, // Enable nesting
      }
    }),
    require('@csstools/postcss-relative-color-syntax')({ preserve: true }),
    require('cssnano')({
      preset: 'default',
    }),
  ]
};

