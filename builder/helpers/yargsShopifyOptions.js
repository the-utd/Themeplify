module.exports = function yargsShopifyOptions(yargs) {
    return yargs
        .option("config", {
            describe: "Path to config.yml",
            default: "config.yml",
            alias: "c"
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
        .option("allenvs", {
            describe: "Will run this command for each environment in your config file",
            default: false,
            alias: "a"
        })
        .option("help", {
            describe: "Show command help",
            default: false,
        });
};