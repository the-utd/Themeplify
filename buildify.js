const fs 			= require("fs");
const packageJSON 	= require(`${__dirname}/package.json`);

function buildifyRequire(packageName) {
	// some additional logic for require

	return require(packageName);
}

const sass 	    = buildifyRequire("gulp-sass");
sass.compiler 	= buildifyRequire("sass");

global.buildify = {
	require: buildifyRequire,
};

const { hideBin }   = buildify.require("yargs/helpers");
const yargs         = buildify.require("yargs")(hideBin(process.argv));

buildify.packages = {
	autoprefixer: buildify.require("autoprefixer"),
	ansi: buildify.require("gulp-cli/lib/shared/ansi"),
	exit: buildify.require("gulp-cli/lib/shared/exit"),
	axios: buildify.require("axios"),
	browserSync: buildify.require("browser-sync"),
	spawn: buildify.require("cross-spawn"),
	cssnano: buildify.require("cssnano"),
	fibers: buildify.require("fibers"),
	findRoot: buildify.require("find-root"),
	gulp: buildify.require("gulp"),
	cached: buildify.require("gulp-cached"),
	clean: buildify.require("gulp-clean"),
	copy: buildify.require("gulp-copy"),
	download: buildify.require("gulp-download2"),
	decompress: buildify.require("gulp-decompress"),
	filter: buildify.require("gulp-filter"),
	gulpif: buildify.require("gulp-if"),
	minify: buildify.require("gulp-minify"),
	plumber: buildify.require("gulp-plumber"),
	postcss: buildify.require("gulp-postcss"),
	prettier: buildify.require("gulp-prettier"),
	rename: buildify.require("gulp-rename"),
	sass: sass,
	sassInheritance: buildify.require("gulp-sass-inheritance"),
	sourcemaps: buildify.require("gulp-sourcemaps"),
	svgo: buildify.require("gulp-svgo"),
	zip: buildify.require("gulp-zip"),
	gulplog: buildify.require("gulplog"),
	datetime: buildify.require("node-datetime"),
	promptConfirm: buildify.require("prompt-confirm"),
	serveStatic: buildify.require("serve-static"),
	through: buildify.require("through2"),
	webpack: buildify.require("webpack"),
	webpackDevMiddleware: buildify.require("webpack-dev-middleware"),
	webpackDevServer: buildify.require("webpack-dev-middleware"),
	webpackHotMiddleware: buildify.require("webpack-hot-middleware"),
	webpackStream: buildify.require("webpack-stream"),
	yaml: buildify.require("yaml"),
	yargs: yargs,
	themekit: buildify.require("@shopify/themekit")
};

const { findRoot } 	        = buildify.packages;
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

global.buildify = {
	...buildify,
	gulpFile: join(currentDirectory, 'gulpfile.js'),
	gulpPath: defaultGulpPath,
	themeRoot: themeRoot,
}

buildify.files = {
	src: "src",
	dist: "dist",
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
		"./src/layout/*.liquid",
		"./src/locales/*.json",
		"./src/sections/*.liquid",
		"./src/snippets/*.*",
		"./src/templates/*.liquid",
		"./src/templates/customers/*.liquid",
		"!./src/snippets/variables.liquid",
		"!./src/templates/index.settings.liquid",
		"!./src/templates/index.translations.liquid",
		"!./src/assets/*.build.{js,css}",
		"!./src/assets/*.build.min.{js,css}"
	],
	liquid: [
		"./src/layout/*.liquid"
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

buildify.helpers = {
	entries: require("./builder/helpers/entries"),
	themePath: require("./builder/helpers/themePath"),
	errorLogger: require("./builder/helpers/errorLogger"),
	watch: require("./builder/helpers/watch"),
	yargsShopifyOptions: yargsShopifyOptions,
	rewriteRule: require("./builder/helpers/rewriteRule"),
};

buildify.options = {
	postcss: {
		plugins: {
			autoprefixer: buildify.require("autoprefixer"),
			cssImport: buildify.require("postcss-import"),
		}
	},
	webpack: require("./builder/webpack.config"),
};

buildify.functions = {
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
		translations: require("./builder/functions/others/translations"),
		settings: require("./builder/functions/others/settings"),
		copy: require("./builder/functions/others/copy"),
	}
};

module.exports = function (callback) {
	const composedCallback = (args) => {
		buildify.args       = args;
		buildify.command    = args["_"][0];

		if(["start", "watch", "deploy", "download"].includes(buildify.command)) {
			require("./builder/config/themekit");
		}

		callback(args);
	};

	return yargs
		.scriptName("buildify")
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
