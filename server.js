var express = require('express');
var app = express();
var r = require('rethinkdbdash')();
var server = app.listen(3000, function(){
	console.log('listening on :3000');
})
var io = require('socket.io').listen(server);
var attachSocket = require('./src/server/eventEmitters.js')
var databaseSetup = require('./src/server/database.js');
var activeConnections = 0;

app.use(express.static('src/client'));
databaseSetup.prepareForLaunch(function(row){
	io.emit('updateClient', {action: 'likesCount', value: row.new_val.likeCount});
});
attachSocket(io, activeConnections);

app.use('/', require('./src/server/routes'))