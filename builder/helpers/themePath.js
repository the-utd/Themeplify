const path 			= require("path");
const { themeRoot } = themeplify;

module.exports = (themePath) => {
	return path.resolve(themeRoot, themePath);
};
