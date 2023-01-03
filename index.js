#!/usr/bin/env node

const builder 	= require("./themeplify");
const { spawn } = themeplify.packages;

function callback() {
	const args = [
		...process.argv.splice(2, process.argv.length),
		"--gulpfile", themeplify.gulpFile,
		"--cwd", themeplify.themeRoot,
	];

	spawn.sync(`${themeplify.gulpPath}`, args, {
		detached: false,
		stdio: 'inherit'
	});
}

builder(callback);
