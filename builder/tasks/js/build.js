const files     = buildify.files;
const { build } = buildify.functions.js;

const buildJs = () => {
    return build(files.js);
}

buildJs.displayName = "js:build";

module.exports = buildJs;