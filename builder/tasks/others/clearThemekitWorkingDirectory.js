const { gulp, clean }   = buildify.packages;
const files             = buildify.files;
const { themePath }     = buildify.helpers;

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
