// .eleventy.js

module.exports = function(eleventyConfig) {
  // Add watch targets
  eleventyConfig.addWatchTarget("./_src/css/**/*.css");
  eleventyConfig.addWatchTarget("./_src/js/");
  eleventyConfig.addWatchTarget("./_src/**/*.html");
  eleventyConfig.addWatchTarget("./_src/**/*.njk");

  // Copy the ds.css file to the output directory
  eleventyConfig.addPassthroughCopy("./_src/assets/**/*.*");
  eleventyConfig.addPassthroughCopy("./_src/css/ds.css");

  return {
    dir: {
      input: "_src",
      output: "dist",
      includes: "_includes", // Keep includes directory for templates and partials
    },
    templateFormats: ["html", "njk", "md"],
  };
};

// Isso pode facilitar o build
// https://www.npmjs.com/package/eleventy-postcss-extension

// Isso pode ser legal pro DS
// https://www.npmjs.com/package/eleventy-plugin-code-demo
// https://www.npmjs.com/package/eleventy-plugin-code-style-hooks

// Isso pode ajudar com o contexto que vem o Django
// https://www.11ty.dev/docs/data-custom/
// https://www.npmjs.com/package/@aaashur/eleventy-plugin-add-remote-data

// Será?
// https://www.npmjs.com/package/eleventy-plugin-purgecss
