"use strict";
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var score = 0;
var commentary = '';
var msg = '';
var overs = 0;
var balls = 0;
var over_counter = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  setInterval(function(){
  	io.emit('updates',msg);
  },3000); 
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

let runsArray = [4,6];
let commentaryArray = ["Good Shot", "Missed to field", "Classic Text Book Shot", "Classical Shot", "Unbelievable miss", "Very good catch by mid-on player"];
var interval = setInterval(function(){
	score += runsArray[parseInt(Math.random()*2)];
	commentary = commentaryArray[parseInt(Math.random()*5)];
	balls++;
	overs = Math.floor(balls / 6);
	var overflow_balls = balls % 6;
	msg = ''+commentary + '~' + score + '~' + overs + '~' + overflow_balls;
	console.log(score);
	console.log(commentary);
}, 3000);