const path 			= require("path");
const { themeRoot } = buildify;

module.exports = (themePath) => {
	return path.resolve(themeRoot, themePath);
};
