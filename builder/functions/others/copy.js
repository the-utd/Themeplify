const { gulp, copy, plumber } = buildify.packages;
const files 	= buildify.files;

module.exports = (copyFiles = files.copy, options = {}) => {
    return gulp.src(copyFiles, options)
        .pipe(plumber())
        .pipe(copy(files.dist, {
            prefix: 1
        }));
};