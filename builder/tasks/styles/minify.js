const files         = buildify.files;
const { minify }    = buildify.functions.styles;

const buildScssMinify = () => {
    return minify(files.minify.css);
}

buildScssMinify.displayName = "scss:minify:build";

module.exports = buildScssMinify;