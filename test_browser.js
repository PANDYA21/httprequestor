// imports
const http = require('http');
const express = require('express');
let app = express();

// endpoints and routes
app.use('/', express.static('.')); // to test the index.js through index.html served through this webapp

// unhandled exception
process.on('uncaughtException', function(err) {
	console.error('uncaughtException: ' + err.message);
	console.error(err.stack);
	process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
	console.error(reason);
	console.error('Occurred at: ', p);
});

// server
http.createServer(app).listen(8080, (d) => {
	console.info('Server started at: ', 8080);
});