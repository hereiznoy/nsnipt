var https = require('https');

var httpsOptions = { };

var SniptClient = function(username, apiKey) {
	httpsOptions.host = 'snipt.net';
	httpsOptions.path = '/api/private/snipt/?username=' + username + '&api_key=' + apiKey + '&format=json';
};

SniptClient.prototype.backup = function(backupDir) {
	console.log('backup dir = %s', backupDir);
	//var req = https.get(httpsOptions, function (res) {

	//};
};

module.exports.SniptClient = SniptClient;