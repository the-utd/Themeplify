const files         = buildify.files;
const { minify }    = buildify.functions.js;

const minifyJs = () => {
    return minify(files.minify.js);
}

minifyJs.displayName = "js:minify:build";

module.exports = minifyJs;