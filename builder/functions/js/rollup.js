"use strict";

const path = require('path');
const findRoot = require("find-root");

const themeRoot = findRoot(process.cwd());
const config = {themeRoot}

let rollup = {};

const rollupPath = path.join(config.themeRoot, 'node_modules/rollup');

try {
	rollup = require(rollupPath);
} catch {
	rollup = require('rollup');
}

function rollScripts(config) {
	return build(config);
}

async function build(config) {
	for (const configChunk of config) {
		try {
			const bundle = await rollup.rollup(configChunk);
			await Promise.all(configChunk.output.map(bundle.write));
		} catch (error) {
			console.error(error)
		}
	}
}

module.exports.roll = rollScripts;
