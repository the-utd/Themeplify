const files         = themeplify.files;
const { minify }    = themeplify.functions.js;

const minifyJs = () => {
    return minify(files.minify.js);
}

minifyJs.displayName = "js:minify:build";

module.exports = minifyJs;
