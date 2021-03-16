const files 	= buildify.files;
const { gulp, rename, svgo, plumber } = buildify.packages;

module.exports = (svgFiles = files.svg.general, options = {}) => {
    return new Promise((resolve, reject) => {
        return gulp.src(svgFiles, options)
            .pipe(plumber())
            .pipe(svgo({
                plugins: [
                    {
                        removeViewBox: false,
                    },
                    {
                        addClassesToSVGElement: {
                            classNames: ['icon']
                        }
                    }
                ]
            }))
            .pipe(gulp.dest(`./dist/assets`))
            .pipe(rename({
                extname: ".liquid",
                dirname: ''
            }))
            .pipe(gulp.dest(`./dist/snippets`))
            .on("end", resolve)
            .on("error", reject);
    });
};
