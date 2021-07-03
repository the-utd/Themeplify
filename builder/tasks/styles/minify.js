const files         = themeplify.files;
const { minify }    = themeplify.functions.styles;

const buildScssMinify = () => {
    return minify(files.minify.css);
}

buildScssMinify.displayName = "scss:minify:build";

module.exports = buildScssMinify;
