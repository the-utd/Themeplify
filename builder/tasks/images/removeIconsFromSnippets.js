const { gulp, clean } = themeplify.packages;

const removeIconsFromSnippets = () => {
    return gulp.src("./src/snippets/icon-*.liquid")
        .pipe(clean({
            force: true
        }));
}

removeIconsFromSnippets.displayName = "remove:snippets:icons";

module.exports = removeIconsFromSnippets;
