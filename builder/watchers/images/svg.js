const files 	= buildify.files;
const { svg }   = buildify.functions.images;
const { watch } = buildify.helpers;

const svgWatch = async () => {
    return watch(files.svg.general, (svgFiles) => {
    	function buildSvg() {
    		return svg(svgFiles);
		}

		buildSvg.displayName = "build:svg";

		return buildSvg;
	});
};

svgWatch.displayName = "svg:watch";

module.exports = svgWatch;
