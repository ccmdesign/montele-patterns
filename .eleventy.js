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

  eleventyConfig.addPlugin(require('@jgarber/eleventy-plugin-postcss'));

  eleventyConfig.addFilter("groupByFolder", function(components) {
    return components.reduce((grouped, component) => {
      const parts = component.inputPath.split('/');
      parts.pop(); // Remove the file name
      
      // Define the desired hierarchy
      const hierarchy = {
        'pages': 1,
        'prototype': 2,
        'elements': 3,
        'components': 4
      };
      
      // Sort folder parts based on the hierarchy
      const sortedParts = parts.sort((a, b) => {
        const aOrder = hierarchy[a] || Infinity;
        const bOrder = hierarchy[b] || Infinity;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.localeCompare(b);
      });
      
      // Create the path with the desired format
      let formattedPath = sortedParts.map((part, index) => {
        if (part === 'elements') return '1 - elements';
        if (part === 'components') return '2 - components';

        return part;
      });
      
      if(formattedPath.indexOf('_src') == 1 && !formattedPath.includes('1-elements') && !formattedPath.includes('2-components')) {
        formattedPath = [formattedPath[0]];
      } else if(formattedPath.indexOf('prototype') === 1) {
        formattedPath = [formattedPath[1]];
      } else if(formattedPath.indexOf('1-elements') === 3) {
        formattedPath = [formattedPath[3]];
      } else if(formattedPath.indexOf('2-components') === 3) {
        formattedPath = [formattedPath[3]];
      }

      if (!grouped[formattedPath]) {
        grouped[formattedPath] = [];
      }
      
      grouped[formattedPath].push(component);
      return grouped;
    }, {});
  });

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
