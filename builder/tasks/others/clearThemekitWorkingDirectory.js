const { gulp, clean }   = themeplify.packages;
const files             = themeplify.files;
const { themePath }     = themeplify.helpers;

function clearThemekitWorkingDirectory() {
    const dir = themePath(files.themekit.watch);

    return gulp.src(dir, {
        read: false,
        allowEmpty: true
    }).pipe(clean({
        force: true
    }));
}

clearThemekitWorkingDirectory.displayName = "clear:previous-build";

module.exports = clearThemekitWorkingDirectory;
