#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var SniptClient = require('./snipt-client').SniptClient;
var config = require('./config/config.js');
var version = require(path.join(__dirname, 'package.json')).version;

var isValidRequiredOption = function (option) {
	return (typeof option !== 'undefined' &&
			option !== null &&
			option !== '');
};

var tryRunCommand = function (command) {
	var requiredOps = { username: program.username, apiKey: program.apiKey };
	for (op in requiredOps) {
		if (!isValidRequiredOption(requiredOps[op])) {
			console.log('\nERROR: Required option "%s" is not set\n', op);
			return;
		}
	}
	command();
};

program
	.version(version)
	.option('-a, --api-key [key]', 'your Snipt API key')
	.option('-u, --username [name]', 'your Snipt username');

program
	.command('backup')
	.description('do a full backup of all your snippets')
	.option('-d, --backup-dir [dir]', 'directory to use for backup')
	.action(function(options) {
		program.username = options.parent.username || config.username;
		program.apiKey = options.parent.apiKey || config.apiKey;
		program.backupDir = options.backupDir || config.backup.backupDir;

		tryRunCommand(function () {
			var client = new SniptClient(program.username, program.apiKey);
			client.backup(program.backupDir);
		});
	});

program.parse(process.argv);