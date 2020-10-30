const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
//const usb = require("webusb").usb;
//const socketIo = require('socket.io')();
const apiPort = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '.././build');
var app = express()
.use(cors())
.use(express.static(path.join(buildPath)))
.use((req, res) => res.sendFile(path.join(buildPath, '/index.html')))
.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});
//var server = require('http').createServer(app)
//var io = require('socket.io')(server)

var io = require('socket.io')(app);

/////app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());
//app.use(bodyParser.json());
const sp = require('serialport');
const rl = require('@serialport/parser-readline');
const rd = require('@serialport/parser-ready');




const parser = new rl();
var port;
//server = require('http').createServer(app);

/*
const port = new sp("COM12", {
  autoOpen: true,
  baudRate: 9600,
})

port.pipe(parser)
parser.on("data", (line) => console.log(line))
//parser.on('readable', console.log('connected'))

*/

var getPortsList = callback => {
  sp.list().then(ports => {
    ports.forEach(function (port) {
      console.log(port.path);
    });
  });
};

/*
app.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});
*/




io.on('connection', client => {
  client.on('disconnect', () => console.log('Client disconnected'));

  client.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  /////////////////////////
  client.on('requestCOMPorts', async () => {
    console.log('client requesting COM ports');
    let COMPorts = [];
    
    sp.list()
      .then(ports => {
        ports.forEach(function (port) {
          COMPorts.push(port.path);
        });
      })
      .then(() => {
        console.log(COMPorts);
        io.sockets.emit('getCOMPorts', COMPorts);
      });
  });
  /////////////////////////

  client.on('connectToCOMPort', COMPort => {
    console.log(`client trying to connect to ${COMPort}`);
       
       port = new sp(COMPort, {
        autoOpen: true,
        baudRate: 9600,
      }, (err => {
        console.log(err)
        if (err) {
          io.emit('connectCOMError', `${err}`)
        }
        else {
          io.emit('connectCOMSuccess', `Successfully connected to ${COMPort}`)
        }
      }))
      
      
  });
});

/*
app.use(express.static(path.join(buildPath)));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'));
});
*/