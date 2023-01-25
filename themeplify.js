const fs 			= require("fs");
const packageJSON 	= require(`${__dirname}/package.json`);

function themeplifyRequire(packageName) {
	return require(packageName);
}

const sass 	    = themeplifyRequire("gulp-sass")(themeplifyRequire("sass"));

global.themeplify = {
	require: themeplifyRequire,
};

const { hideBin }   = themeplify.require("yargs/helpers");
const yargs         = themeplify.require("yargs")(hideBin(process.argv));

themeplify.packages = {
	autoprefixer: themeplify.require("autoprefixer"),
	ansi: themeplify.require("gulp-cli/lib/shared/ansi"),
	exit: themeplify.require("gulp-cli/lib/shared/exit"),
	axios: themeplify.require("axios"),
	browserSync: themeplify.require("browser-sync"),
	spawn: themeplify.require("cross-spawn"),
	cssnano: themeplify.require("cssnano"),
	findRoot: themeplify.require("find-root"),
	gulp: themeplify.require("gulp"),
	cached: themeplify.require("gulp-cached"),
	clean: themeplify.require("gulp-clean"),
	copy: themeplify.require("gulp-copy"),
	download: themeplify.require("gulp-download2"),
	decompress: themeplify.require("gulp-decompress"),
	filter: themeplify.require("gulp-filter"),
	gulpif: themeplify.require("gulp-if"),
	minify: themeplify.require("gulp-minify"),
	plumber: themeplify.require("gulp-plumber"),
	postcss: themeplify.require("gulp-postcss"),
	prettier: themeplify.require("gulp-prettier"),
	rename: themeplify.require("gulp-rename"),
	sass: sass,
	sassInheritance: themeplify.require("gulp-sass-inheritance"),
	sourcemaps: themeplify.require("gulp-sourcemaps"),
	svgo: themeplify.require("gulp-svgo"),
	zip: themeplify.require("gulp-zip"),
	gulplog: themeplify.require("gulplog"),
	datetime: themeplify.require("node-datetime"),
	promptConfirm: themeplify.require("prompt-confirm"),
	serveStatic: themeplify.require("serve-static"),
	through: themeplify.require("through2"),
	webpack: themeplify.require("webpack"),
	webpackDevMiddleware: themeplify.require("webpack-dev-middleware"),
	webpackDevServer: themeplify.require("webpack-dev-middleware"),
	webpackHotMiddleware: themeplify.require("webpack-hot-middleware"),
	webpackStream: themeplify.require("webpack-stream"),
	yaml: themeplify.require("yaml"),
	yargs: yargs,
	themekit: themeplify.require("@shopify/themekit"),
	translations: themeplify.require("@savchukoleksii/gulp-shopify-theme-translations-tool"),
	settings: themeplify.require("@savchukoleksii/gulp-shopify-theme-settings-tool"),
};

const { findRoot } 	        = themeplify.packages;
const { join, normalize } 	= require("path");

const workingDirectory 	= process.cwd();
const currentDirectory 	= __dirname;

function getThemeRoot() {
	try {
		return findRoot(workingDirectory);
	} catch (error) {}

	return process.cwd();
}

const themeRoot	= getThemeRoot();
function getDefaultGulpPath() {
	try {
		const defaultGulpPath = join(themeRoot, normalize('node_modules/.bin/gulp'));

		if (fs.existsSync(defaultGulpPath)) {
			return defaultGulpPath;
		}

		throw new Error();
	} catch(error){}

	return join(currentDirectory, normalize('node_modules/.bin/gulp'));
}

const defaultGulpPath 	= getDefaultGulpPath();

global.themeplify = {
	...themeplify,
	gulpFile: join(currentDirectory, 'gulpfile.js'),
	gulpPath: defaultGulpPath,
	themeRoot: themeRoot,
}

themeplify.files = {
	src: "src",
	dist: "dist",
	settingsDir: "./.themeplify/settings",
	themekit: {
		download: "src",
		watch: "dist"
	},
	webpack: {},
	svg: {
		general: "./src/icons/*.svg",
		snippets: "./src/snippets"
	},
	srcAssets: "./src/assets",
	scss: [
		"!./src/styles/_*.{scss,sass}",
		"./src/styles/*.{scss,sass}",
	],
	scssLiquid: "./src/styles/*.css.liquid",
	compileOutput: "./dist/assets",
	js: "./src/scripts/*.js",
	copy: [
		"./src/assets/*.*",
		"./src/config/*.json",
		"./src/layout/*.{liquid,json}",
		"./src/locales/*.json",
		"./src/sections/*.liquid",
		"./src/snippets/*.*",
		"./src/templates/*.liquid",
		"./src/templates/customers/*.liquid",
		"!./src/snippets/variables.liquid",
		"!./src/templates/index.settings.{liquid,json}",
		"!./src/templates/index.translations.{liquid,json}",
		"!./src/assets/*.build.{js,css}",
		"!./src/assets/*.build.min.{js,css}"
	],
	copyJsonTemplates: [
		"./src/templates/*.json",
		"./src/templates/customers/*.json"
	],
	liquid: [
		"./src/layout/*.{liquid,json}",
	],
	minify: {
		css: [
			`./dist/assets/*.build.css`,
			`!./dist/assets/*.build.min.css`
		],
		js: [
			`./dist/assets/*.build.js`,
			`!./dist/assets/*.build.min.js`
		]
	},
	lintConfigs: {
		css: "./csslintrc.json"
	},
	lintPaths: {
		css: [
			`./src/assets/*.css`,
			`!./src/assets/*.min.css`
		],
		js: [
			`./src/scripts/**/*.js`,
			`!./src/scripts/**/*.min.js`
		]
	},
	settings: `./src/config/settings_schema.json`,
	nodeModules: "node_modules",
	filePrefix: ''
};

const yargsShopifyOptions = require("./builder/helpers/yargsShopifyOptions");

themeplify.helpers = {
	entries: require("./builder/helpers/entries"),
	themePath: require("./builder/helpers/themePath"),
	errorLogger: require("./builder/helpers/errorLogger"),
	watch: require("./builder/helpers/watch"),
	yargsShopifyOptions: yargsShopifyOptions,
	rewriteRule: require("./builder/helpers/rewriteRule"),
};

themeplify.options = {
	postcss: {
		plugins: {
			autoprefixer: themeplify.require("autoprefixer"),
			cssImport: themeplify.require("postcss-import"),
		}
	},
	webpack: require("./builder/webpack.config"),
};

const configPath = themeplify.helpers.themePath("./builder.config.js");
let customConfig = {};

if(fs.existsSync(configPath)) {
	customConfig = require(configPath);
}

themeplify.customConfig = customConfig || {};

themeplify.functions = {
	images: {
		svg: require("./builder/functions/images/svg"),
	},
	js: {
		build: require("./builder/functions/js/build"),
		minify: require("./builder/functions/js/minify"),
	},
	styles: {
		build: require("./builder/functions/styles/build"),
		variables: require("./builder/functions/styles/variables"),
		minify: require("./builder/functions/styles/minify"),
	},
	others: {
		copy: require("./builder/functions/others/copy"),
		removeSettingsFromJsonTemplates: require("./builder/functions/others/removeSettingsFromJsonTemplates"),
		mergeSettingsFromDeploymentTheme: require("./builder/functions/others/mergeSettingsFromDeploymentTheme"),
		downloadSettings: require("./builder/functions/others/downloadSettings"),
	}
};

module.exports = function (callback) {
	const composedCallback = (args) => {
		themeplify.args       = args;
		themeplify.command    = args["_"][0];

		if(["start", "watch", "deploy", "download"].includes(themeplify.command)) {
			require("./builder/config/themekit");
		}

		callback(args);
	};

	return yargs
		.scriptName("themeplify")
		.command("build", "build project files", () => {}, composedCallback)
		.command("zip", "create production ready archive", () => {}, composedCallback)
		.command(
			"watch",
			"watch files and upload into Shopify",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.option("port", {
						describe: 'Development server port',
						type: 'number',
						alias: "p",
						default: 3000
					})
					.option("serverless", {
						describe: "Will run this command without dev server",
						type: 'boolean',
						default: false
					});
			},
			composedCallback
		)
		.command(
			"start",
			"deploy files into Shopify and run watch",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.option("force", {
						describe: "Deploy force with deleting files on Shopify",
						type: "boolean",
						default: false
					})
					.option("port", {
						describe: 'Development server port',
						type: 'number',
						alias: "p",
						default: 3000
					})
					.option("serverless", {
						describe: "Will run this command without dev server",
						default: false
					});
			},
			composedCallback
		)
		.command(
			"deploy [files..]",
			"deploy files into Shopify",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.option("force", {
						describe: "Deploy force with deleting files on Shopify",
						type: "boolean",
						default: false
					})
					.positional('files', {
						describe: 'Files to download from Shopify',
						type: 'array',
						default: []
					});
			},
			composedCallback
		)
		.command(
			"download [files..]",
			"download files from Shopify",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.positional('files', {
						describe: 'Files to download from Shopify',
						type: 'array',
						default: []
					})
					.option("dir", {
						default: `./src`
					});
			},
			composedCallback
		)
		.command(
			"create [archive]",
			"create new project",
			(yargs) => {
				return yargs
					.option("archive", {
						describe: "Url or path to zip archive",
						default: "https://github.com/the-utd/Themeplify-Theme/archive/refs/heads/main.zip"
					});
			},
			composedCallback
		)
		.help()
		.wrap(null)
		.demandCommand(1)
		.version(`v${packageJSON.version}`)
		.argv;
};
