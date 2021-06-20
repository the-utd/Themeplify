module.exports = function yargsShopifyOptions(yargs) {
    return yargs
        .option("config", {
            describe: "Path to config.yml",
            default: "config.yml",
            alias: "c"
        })
		.option("password", {
			describe: "Theme password. This will override what is in your config.yml",
			type: 'string',
			alias: "s",
		})
		.option("store", {
			describe: "Your shopify domain. This will override what is in your config.yml",
			type: 'string',
			alias: "s",
		})
		.option("themeid", {
			describe: "Theme id. This will override what is in your config.yml",
			type: 'number',
			alias: "t",
		})
        .option("dir", {
            describe: "Directory that command will take effect.",
            alias: "d",
            default: `./dist`
        })
        .option("env", {
            describe: "Environment from config file",
            default: "development",
            alias: "e"
        })
		.option("timeout", {
			describe: "The timeout to kill any stalled processes. This will override what is in your config.yml",
			type: "string"
		})
        .option("allenvs", {
            describe: "Will run this command for each environment in your config file",
            default: false,
			type: "boolean",
            alias: "a"
        })
		.option("noignore", {
			describe: "Will disable config ignores so that all files can be changed",
			type: "boolean",
			default: false,
		})
		.option("preview", {
			describe: "Will use preview link as proxy source",
			type: "boolean",
			default: false,
		})
        .option("help", {
            describe: "Show command help",
            default: false,
        });
};
