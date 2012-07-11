var path = require('path'),
	file = require(path.join(__dirname, 'config.json'));

var config = {};
config.file = file;
config.defaults = {
	"backup": {
		"backupDir": "."
	}
};

module.exports.apiKey = config.file.apiKey;
module.exports.username = config.file.username;

module.exports.backup = {};
module.exports.backup.backupDir = config.file.backup.backupDir || config.defaults.backup.backupDir;