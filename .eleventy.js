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
