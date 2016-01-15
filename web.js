var port = Number(process.env.PORT || 8000);

var express = require('express');

var app = express()
    , http = require('http')
    , path = require('path')
    , socketio = require('socket.io')
    , fs = require('fs')
    , bodyParser = require('body-parser')
    , async = require('async')			// 콜백 지옥에서 벗어나기 위한 모듈
    ;

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server = app.listen(port, function () {
    console.log('Listening on port : %d', server.address().port);
});

/* 웹소켓 */
var io = socketio.listen(server);
io.on('connection', function (socket) {
});