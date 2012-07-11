var https = require('https'),
	fs = require('fs'),
	path = require('path');

var SniptClient = function(username, apiKey) {
	this.username = username;
	this.apiKey = apiKey;
	this.backup = backup;
};

module.exports.SniptClient = SniptClient;

var backup = function(backupDir, reqPath) {
	var options = {
		host: 'snipt.net',
		path: reqPath || '/api/private/snipt/?username=' + this.username + '&api_key=' + this.apiKey + '&format=json'
	};
	get(options,
		function (result) {
			var json = JSON.parse(result);
			var snipts = json.objects;
			var meta = json.meta;
			for (var i = 0; i < snipts.length; i++) {
				saveSniptToFile(snipts[i], backupDir,
					function (filePath) {
						console.log('Saved: %s', filePath);
					},
					function (filePath, err) {
						console.log('There was an error saving: %s', filePath);
						console.log(err);
					});
			}

			// recurse until all snipt's have been pulled down & saved
			if (meta.next !== null) backup(backupDir, meta.next);
		},
		function (err) {
			console.log('There was an error getting your snipts from Snipt.net');
			console.log(err);
		});
};

var get = function(options, onSuccess, onErr) {
	var result = '';
	var req = https.get(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			result += chunk;
		});
		res.on('end', function () {
			onSuccess(result);
		});
	}).on('error', function (err) {
		onErr(err);
	}).end();
}

var saveSniptToFile = function (snipt, saveDir, onSuccess, onErr) {
	var title = snipt.title;
	var filePath = path.join(saveDir, title + '.txt');

	fs.writeFile(filePath, snipt.code, function (err) {
		if (err) onErr(filePath, err);
		else onSuccess(filePath);
	});
};