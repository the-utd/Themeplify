const files 	= buildify.files;
const { copy }  = buildify.functions.others;
const { watch } = buildify.helpers;

const copyWatch = () => {
	return watch(files.copy, (copyFiles, options = {}) => {
		function copyFile() {
			return copy(copyFiles, options);
		}

		copyFile.displayName = "copy:file";

		return copyFile;
	});
};

copyWatch.displayName = "copy:watch";

module.exports = copyWatch;
