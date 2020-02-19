/*server.js*/

const http = require('http');

const hostname = '10.199.14.46';
const port = 8024;

const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\nThis isn\'t Nadhif');
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});