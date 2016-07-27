var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
  res.send('Hello Channels!');
});

var channelsPath = __dirname + '/channels';
function getChannelFile(channelName) {
	var channelFile = `${channelsPath}/${channelName}.channel.json`;
	try {
		fs.statSync(channelFile);
		return path.normalize(channelFile);
	} catch(e) {
		return false;
	}
}

function sendNotFound(channelName, res) {
	console.log(`- channel "${channelName}" not found`);
	res
		.status(404)
		.send({error: 'Channel not found'});
}

app.get('/channels/:channelName', function (req, res) {
	var channelName = req.params.channelName;
	var channelFile = getChannelFile(channelName);

	// channel not found
	if (!channelFile) return sendNotFound(channelName, res);

	// channel found
	console.log(`- sending channel "${channelName}"`);
	res.sendFile(channelFile);
});
 
app.listen(port)
console.log(`
--------------------------------------------------------------------------------
SERVING WEBTORRENT CHANNELS ON http:\/\/localhost:${port}
--------------------------------------------------------------------------------	
`);