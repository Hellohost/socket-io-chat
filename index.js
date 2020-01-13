let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
let bodyParser = require('body-parser');
// const User = require("./models/user");


// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/tododo', { useNewUrlParser: true,  useUnifiedTopology: true  });

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req,res){
    res.sendFile(__dirname +"/index.html")
});

// app.get('/log',urlencodedParser, (req,res)=>{
//     res.sendFile(__dirname+"/log.html")
// });
// app.post('/log', urlencodedParser, function (req, res){
//     if(!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.send(`${req.body.userName} - ${req.body.password}`);
// });




users = [];
connections = [];


io.sockets.on('connection', function(socket){
    console.log("successful connection ");
    
    connections.push(socket);
    
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1)
        console.log("Off");
        
    });
    
    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name:data.name, className: data.className});
    }) 
});
server.listen(3000);