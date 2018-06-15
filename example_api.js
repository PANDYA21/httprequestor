const express = require('express');
let app = express();

app.get('/get', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method GET successfully completed!'
	});
});

app.post('/post', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method POST successfully completed!'
	});
});

app.put('/put', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method PUT successfully completed!'
	});
});

app.delete('/delete', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method DELETE successfully completed!'
	});
});

app.patch('/patch', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method PATCH successfully completed!'
	});
});

app.head('/head', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method HEAD successfully completed!'
	});
});

app.options('/options', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'Method OPTIONS successfully completed!'
	});
});

app.get('/exit', (req, res, next) => {
	res.status(200).json({
		sucess: true,
		messege: 'API will now shut down.'
	});
	process.exit(0);
});


app.listen(8081);
