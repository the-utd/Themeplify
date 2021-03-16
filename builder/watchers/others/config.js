const fs    = require("fs");
const path  = require("path");

const { themeRoot }	    = buildify;
const { gulp, exit }    = buildify.packages;
const {
    errorLogger,
} = buildify.helpers;

const args = buildify.args;

const configWatch = (cb) => {
    try {
        const config 		= args.config || "config.yml";
        const configPath 	= path.join(themeRoot, config);
        try {
            fs.readFileSync(configPath, "utf8");
        } catch (error) {
            throw new Error("Config file not exist");
        }

        const configStream = gulp.watch(configPath, function configWatch() {
            configStream.close();

            throw new Error("The config file has been changed");
        });
    } catch (error) {
        errorLogger(error);

        exit(1);
    }

    cb();
};

configWatch.displayName = "config:watch";

module.exports = configWatch;