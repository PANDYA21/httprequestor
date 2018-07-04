// Run example_api.js before running this test
const Http = require('.');
const http = new Http();

async function tests() {
	const tests = [
		{ method: 'GET', endpoint: 'http://localhost:8081/get' },
		{ method: 'POST', endpoint: 'http://localhost:8081/post' },
		{ method: 'PUT', endpoint: 'http://localhost:8081/put' },
		{ method: 'PATCH', endpoint: 'http://localhost:8081/patch' },
		{ method: 'DELETE', endpoint: 'http://localhost:8081/delete' },
		{ method: 'HEAD', endpoint: 'http://localhost:8081/head' },
		{ method: 'OPTIONS', endpoint: 'http://localhost:8081/options' }
	];

	let ans = [];
	for (let test of tests) {
		const opts = {
			endpoint: test.endpoint
		};
		let makereq = await http[test.method.toLowerCase()](opts);
		ans.push({
			method: test.method,
			status: makereq.xhr.status,
			response: makereq.response
		});
	}

	let temp = await http.get({ endpoint: 'http://localhost:8081/exit' });
	console.info(temp.response);

	return ans;
}

tests()
	.catch(console.error)
	.then(x => console.log(JSON.stringify(x, null, 2)));