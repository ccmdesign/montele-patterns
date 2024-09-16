module.exports = function(eleventyConfig) {
  // Add watch targets
  eleventyConfig.addWatchTarget("./_src/css/**/*.css");
  eleventyConfig.addWatchTarget("./_src/js/");
  eleventyConfig.addWatchTarget("./_src/**/*.html");

  return {
    dir: {
      input: "_src",
      output: "dist"
    }
  };
};
