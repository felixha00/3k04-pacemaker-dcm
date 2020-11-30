/* eslint-disable prettier/prettier */
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
var t = 0;

let buffer = new ArrayBuffer(33);
let int8View = new Uint8Array(buffer);

let LRL = 61;


// state
int8View[2] = 6;

//LRL
int8View[3] = 61

// VPW
int8View[5] = 10;

int8View[13] = 10;

int8View[21] = 5;

int8View[25] = 5;

int8View[29] = 200;

int8View[32] = 200 ;

/*
for (let i = 6; i < 13; i++){
  int8View[i] = 61;
}
*/

/*
for (let i = 0; i < int8View.length; i++) {
  console.log('Entry ' + i + ': ' + int8View[i]);
}
*/

/////app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());
//app.use(bodyParser.json());
const sp = require('serialport');
const rl = require('@serialport/parser-readline');
const rd = require('@serialport/parser-ready');
const bl = require('@serialport/parser-byte-length');

const parser = new bl({ length: 1 });
var port;
//server = require('http').createServer(app);

/*
port = new sp("COM3", {
  autoOpen: true,
  baudRate: 115200,
})



parser.on("data", (byte) => {
  console.log(parseInt(byte.toString("hex"), 16))
})
//parser.on('readable', console.log('connected'))
*/
//parser.write(int8View)

/*
port.write(int8View, function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})
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

          COMPorts.push({path: port.path, serial: port.serialNumber});
        });
      })
      .then(() => {
        console.log(COMPorts);
        io.sockets.emit('getCOMPorts', JSON.stringify(COMPorts));
      });
  });
  /////////////////////////

  client.on('subscribeToVentricle', () => {
    // on single data
    parser.on("data", (byte) => {
     
      let str = parseInt(byte.toString("hex"), 16)
      console.log(str, t, '| Type: ', typeof str )
      io.emit('sendData', str, t)
      t++
    })
  })

  client.on('writeData', (data) => {

    let hexData = data.toString(16);
    let writeBuffer = new ArrayBuffer(1);
    let write_int8View = new Uint8Array(writeBuffer);

    write_int8View[0] = data

    port.write(write_int8View, function(err){
      if (err){
        return console.log('Error on write:', err.message)
        io.emit('sentData', false)
      }
      console.log('Wrote [Decimal:', data, 'Hex:', write_int8View,']')
      io.emit('sentData', true)
    })

 
  })


  client.on('connectToCOMPort', COMPort => {
    console.log(`client trying to connect to ${COMPort}`);
    
    console.log('Existing Port?: ', port == undefined ? 'No Port Previously Selected' : port.path);
    

    /*
    if (port) {
      port.close(err => {
        if (err) {
          console.log(err)
        }
        else {
          console.log('Closing previous port: ', port.path);
        }
      });
    }
    */
    
    port = new sp(
      COMPort,
      {
        autoOpen: true,
        baudRate: 115200,
      },
      err => {
        
        if (err) {
          console.log(err)
          io.emit('connectCOMError', `${err}`);
        } else {
          port.pipe(parser)
          console.log('Successfully connected to', port.path )
          io.emit('connectCOMSuccess', `Successfully connected to ${port.path}`);
        }
      },
    );
  });
});

/*
app.use(express.static(path.join(buildPath)));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'));
});
*/
