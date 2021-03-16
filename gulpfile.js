#!/usr/bin/env node

const builder = require("./buildify");

builder(() => {});

const download 		= require("./builder/commands/download");
const build 		= require("./builder/commands/build");
const deploy 		= require("./builder/commands/deploy");
const watch 		= require("./builder/commands/watch");
const start 		= require("./builder/commands/start");
const zip 			= require("./builder/commands/zip");

exports.download 	= download;
exports.build 		= build;
exports.deploy 		= deploy;
exports.watch 		= watch;
exports.start 		= start;
exports.zip 		= zip;
