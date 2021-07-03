const files     = themeplify.files;
const { build } = themeplify.functions.js;

const buildJs = () => {
    return build(files.js);
}

buildJs.displayName = "js:build";

module.exports = buildJs;
