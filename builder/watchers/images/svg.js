const path		= require("path");
const files 	= themeplify.files;
const {
	svg,
}   = themeplify.functions.images;

const {
	gulp,
	clean
} = themeplify.packages;

const {
	watch,
} = themeplify.helpers;

const svgWatch = async () => {
	return watch(files.svg.general, (svgFiles) => {
		function buildSvg() {
			return svg(svgFiles);
		}

		buildSvg.displayName = "build:svg";

		return buildSvg;
	}, (deleteFiles) => {
		const file = path.parse(deleteFiles).name;

		function deleteSvgFromAssets() {
			return gulp.src(`./dist/assets/${file}.svg`)
				.pipe(clean({
					force: true,
					allowEmpty: true
				}));
		}

		deleteSvgFromAssets.displayName = "delete:svg:from:assets";

		function deleteSvgFromSnippets() {
			return gulp.src(`./dist/snippets/${file}.liquid`)
				.pipe(clean({
					force: true,
					allowEmpty: true
				}));
		}

		deleteSvgFromSnippets.displayName = "delete:svg:from:snippets";

		const deleteSvg = gulp.parallel(
			deleteSvgFromAssets,
			deleteSvgFromSnippets,
		);

		deleteSvg.displayName = "delete:svg";

		return deleteSvg;
	});
};

svgWatch.displayName = "svg:watch";

module.exports = svgWatch;
