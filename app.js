var program = require('commander');
var path = require('path');
var config = require(path.join(__dirname, 'config', 'config.json'));
var version = require(path.join(__dirname, 'package.json')).version;

config.defaults = {
	"apiKey": "",
	"username": "",
	"backup": {
		"backupDir": "."
	}
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
		var backupDir = options.backupDir 
			|| config.backup.backupDir
			|| config.defaults.backupDir;
		console.log('Doing a backup to %s', backupDir);
	});

program.parse(process.argv);