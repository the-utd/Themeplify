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
	}, (deleteFiles) => {
		function deleteSvg() {
			return gulp.src(deleteFiles)
				.pipe(clean({
					force: true,
					allowEmpty: true
				}));
		}

		deleteSvg.displayName = "delete:svg";

		return deleteSvg;
	});
};

svgWatch.displayName = "svg:watch";

module.exports = svgWatch;