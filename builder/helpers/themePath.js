const path 			= require("path");
const { themeRoot } = global.buildify;

module.exports = (themePath) => {
	return path.resolve(themeRoot, themePath);
};
