const build = require("./build");
const themekitDeploy = require("../tasks/themekit/deploy");

const { gulp }      = buildify.packages;
const deploy        = gulp.series(build, themekitDeploy);
deploy.displayName  = "deploy";

module.exports = deploy;
