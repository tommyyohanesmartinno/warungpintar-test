const socketIO = require('socket.io');
let { io } = require('../../server');

module.exports.listen = function(app){
    io = socketIO.listen(app)
    io.on('connection', function() {
        console.log("Made socket connection");
    });

    return io;
}