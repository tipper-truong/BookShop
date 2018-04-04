var express = require('express'); // middleware, router
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // logger on any requests being made

// PROXY
var httpProxy = require('http-proxy');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// PROXY TO API
const apiProxy = httpProxy.createProxyServer();

app.use('/api', function(req, res){
  apiProxy.web(req, res, {
  	target:"http://localhost:3001"
  });
})

// END PROXY

// ENDPOINT API
app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, function(){
  console.log('App is listening on port 3000');
})
