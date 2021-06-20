const files 	= buildify.files;
const { gulp, rename, svgo, plumber, through } = buildify.packages;
const path = require("path");

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
                            classNames: ['icon', '%%filename%%']
                        }
                    }
                ]
            }))
			.pipe(through.obj(function (file, enc, callback) {
				if(file === null || file.isDirectory()){
					callback(null, file);
					return;
				}

				const content = file.contents.toString('utf-8');

				file.contents = Buffer.from(content.replace("%%filename%%", path.parse(file.path.toString()).name), 'utf-8');

				callback(null, file);
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
