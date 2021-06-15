const { themeRoot }	= buildify;
const fs 			= require("fs");
const path 			= require("path");

const {
    yaml,
    ansi,
    exit,
} = buildify.packages;

const argv 		= buildify.args;

const options = {
    env: argv.env || "development",
    dir: argv.dir,
    config: argv.config || "config.yml",
    force: argv.force || false,
	allenvs: argv.allenvs || false,
};

try {
	const configFilePath = path.join(themeRoot, options.config);
	if (!fs.existsSync(configFilePath)) {
		throw new Error(`"${options.config} does not exist"`);
	}

    const environments = yaml.parse(fs.readFileSync(configFilePath, "utf8"));
    if(!Object.keys(environments).includes(options.env)) {
        throw new Error(`environment "${options.env}" not exist`);
    }

    const config = environments[options.env];
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

    config["timeout"] = config["timeout"] || "120s";

    buildify.options.themekit = {
        ...options,
        ...config
    };
} catch (error) {
	console.warn(ansi.red(`Error: ${error.message}`));

    exit(0);
}
