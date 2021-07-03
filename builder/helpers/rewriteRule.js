const fs			= require('fs');
const path			= require('path');

const { themeRoot }	= themeplify;
const fileRegex     = /(?<name>.+)\.(?<extension>(css|js))$/gm;

module.exports = function rewriteRule(rule, port = 3000) {
    return {
        match: new RegExp(rule),
        fn: function (req, res, match) {
            const regex     = new RegExp(rule);
            const result    = regex.exec(match);

            if(!result){
                return match;
            }

            const file = (new RegExp(fileRegex)).exec(result.groups.file);

            if(!file){
                return match;
            }

            const refactoredFileName = `${file.groups.name.replace(/\.min|\.scss/gi, '')}.${file.groups.extension}`;

            try{
                if(fs.existsSync(path.join(themeRoot, 'dist/assets', refactoredFileName))){
                    return `https://${req.headers.host}/assets/${refactoredFileName}`;
                }
            }catch (err) {}

            return match;
        }
    };
};
