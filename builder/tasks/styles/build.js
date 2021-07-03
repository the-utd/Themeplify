const files         = themeplify.files;
const { build }     = themeplify.functions.styles;

const buildScss = () => {
    return build(files.scss);
};

buildScss.displayName = "scss:build";

module.exports = buildScss;
