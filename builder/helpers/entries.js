const { themeRoot }	= themeplify;
const glob			= require('glob');
const path  		= require("path");

module.exports = (files) => {
	const filepath = path.join(themeRoot, files);

	return glob.sync(filepath).reduce(function(entries, entry){
		return {
			...entries,
			[path.parse(entry).name]: entry
		};
	}, {});
};
