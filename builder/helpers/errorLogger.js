const { ansi, gulplog } = themeplify.packages;

module.exports = function (error) {
    if(!error) {
        return;
    }

    gulplog.error(ansi.red(error.message));
};
