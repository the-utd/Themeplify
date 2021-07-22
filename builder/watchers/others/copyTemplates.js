const files 			= themeplify.files;
const { copy }  		= themeplify.functions.others;
const { watch } 		= themeplify.helpers;
const { gulp, clean }   = themeplify.packages;

const copyWatch = () => {
	return watch(files.copy, (copyFiles, options = {}) => {
		function copyFile() {
			return gulp.series(

			);
		}

		copyFile.displayName = "copy:file";

		return copyFile;
	}, (deleteFiles) => {
		function removeFiles() {
			return gulp.src(deleteFiles)
				.pipe(clean({
					force: true,
					allowEmpty: true
				}));
		}

		removeFiles.displayName = "remove:file";

		return removeFiles;
	});
};

copyWatch.displayName = "copy:watch";

module.exports = copyWatch;
