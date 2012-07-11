var path = require('path'),
	file = require(path.join(__dirname, 'config.json'));

var config = {};
config.file = file;
config.defaults = {
	"apiKey": "",
	"username": "",
	"backup": {
		"backupDir": "."
	}
};

module.exports.apiKey = config.file.apiKey || config.defaults.apiKey;
module.exports.username = config.file.username || config.defaults.username;

module.exports.backup = {};
module.exports.backup.backupDir = config.file.backup.backupDir || config.defaults.backup.backupDir;