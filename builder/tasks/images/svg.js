const files 	= buildify.files;
const { svg }   = buildify.functions.images;

const svgBuild = () => {
    return svg(files.svg.general);
}

svgBuild.displayName = "svg:build";

module.exports = svgBuild;