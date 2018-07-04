const Http = require('.');
const http = new Http();

http.get({ endpoint: 'https://www.google.com' })
	.catch(console.error)
	.then(res => console.log(res.response));