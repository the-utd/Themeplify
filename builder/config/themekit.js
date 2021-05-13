const { themeRoot }	= buildify;
const fs 			= require("fs");
const path 			= require("path");

const {
    yaml,
    ansi,
    exit
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
    const environments = yaml.parse(fs.readFileSync(path.join(themeRoot, options.config), "utf8"));
    if(!Object.keys(environments).includes(options.env)) {
        throw new Error("environment not exist");
    }

    const config = environments[options.env];

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
    console.log(ansi.red(error.message));

    exit(0);
}
