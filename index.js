#!/usr/bin/env node

const builder 	= require("./themeplify");
const { spawn } = buildify.packages;

function callback() {
	const args = [
		...process.argv.splice(2, process.argv.length),
		"--gulpfile", buildify.gulpFile,
		"--cwd", buildify.themeRoot,
	];

	spawn.sync(`${buildify.gulpPath}`, args, {
		detached: false,
		stdio: 'inherit'
	});
}

builder(callback);
