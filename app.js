var program = require('commander');
var path = require('path');
var SniptClient = require('./snipt-client').SniptClient;
var config = require('./config/config.js');
var version = require(path.join(__dirname, 'package.json')).version;

program
	.version(version)
	.option('-a, --api-key [key]', 'your Snipt API key')
	.option('-u, --username [name]', 'your Snipt username');

program
	.command('backup')
	.description('do a full backup of all your snippets')
	.option('-d, --backup-dir [dir]', 'directory to use for backup')
	.action(function(options) {
		var username = options.parent.username || config.username,
			apiKey = options.parent.apiKey || config.apiKey,
			backupDir = options.backupDir || config.backup.backupDir,
			client = new SniptClient(username, apiKey);
		client.backup(backupDir);
	});

program.parse(process.argv);