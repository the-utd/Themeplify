const files 	= themeplify.files;
const { copy }  = themeplify.functions.others;

const copyBuild = () => {
    return copy(files.copy);
}

copyBuild.displayName = "copy:build";

module.exports = copyBuild;
