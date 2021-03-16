const files         = buildify.files;
const { build }     = buildify.functions.styles;

const buildScss = () => {
    return build(files.scss);
};

buildScss.displayName = "scss:build";

module.exports = buildScss;