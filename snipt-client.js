var https = require('https');

var SniptClient = function(username, apiKey) {
	this.test = function() {
		console.log('username=%s', username);
		console.log('apiKey=%s', apiKey);
	};
};

module.exports.SniptClient = SniptClient;