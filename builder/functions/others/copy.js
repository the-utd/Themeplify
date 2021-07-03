const { gulp, copy, plumber } = themeplify.packages;
const files 	= themeplify.files;

module.exports = (copyFiles = files.copy, options = {}) => {
    return gulp.src(copyFiles, options)
        .pipe(plumber())
        .pipe(copy(files.dist, {
            prefix: 1
        }));
};
