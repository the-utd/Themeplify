const files 	= themeplify.files;
const { svg }   = themeplify.functions.images;

const svgBuild = () => {
    return svg(files.svg.general);
}

svgBuild.displayName = "svg:build";

module.exports = svgBuild;
