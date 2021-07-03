const { themeRoot }	= themeplify;
const fs 			= require("fs");
const path 			= require("path");

const {
	yaml,
	ansi,
	exit,
} = themeplify.packages;

const argv 		= themeplify.args;

const options = {
	env: argv.env || "development",
	dir: argv.dir,
	config: argv.config || "config.yml",
	force: argv.force || false,
	allenvs: argv.allenvs || false,
	password: argv.password,
	theme_id: argv.themeid,
	store: argv.store,
	noIgnore: argv.noignore || false,
	timeout: argv.timeout || "120s",
};

try {
	let config = {};

	if(options.password) {
		config = {
			...config,
			password: options.password
		};
	}

	if(options.theme_id) {
		config = {
			...config,
			theme_id: options.theme_id
		};
	}

	if(options.store) {
		config = {
			...config,
			store: options.store
		};
	}

	const configRequired = !options.password || !options.theme_id || !options.store;
	if(configRequired) {
		const configFilePath = path.join(themeRoot, options.config);
		if (!fs.existsSync(configFilePath)) {
			throw new Error(`"${options.config} does not exist"`);
		}

		const environments = yaml.parse(fs.readFileSync(configFilePath, "utf8"));
		if(!Object.keys(environments).includes(options.env)) {
			throw new Error(`environment "${options.env}" not exist`);
		}

		config = {
			...environments[options.env],
			...config
		};
	}

	if(!config.theme_id) {
		throw new Error("theme_id param is empty");
	}

	if(!config.password) {
		throw new Error("password param is empty");
	}

	if(!config.store) {
		throw new Error("store param is empty");
	}

	delete options["config"];

	config["ignore_files"] = [
		...new Set([
			...(config["ignore_files"] || []),
			"settings_data.json",
			"config/settings_data.json"
		])
	];

	config["timeout"] = options.timeout || config["timeout"] || "120s";

	themeplify.options.themekit = {
		...options,
		...config
	};
} catch (error) {
	console.warn(ansi.red(`Error: ${error.message}`));

	exit(0);
}
