const required_in_node = typeof window === 'undefined';
if (required_in_node) {
	var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
}

function makeXhr(method, endpoint, payload, additional_headers) {
	return new Promise((resolve, reject) => {
		_makeXhr(method, endpoint, payload, (err, resp) => {
			return err ? reject(err) : resolve(resp);
		}, additional_headers);
	});
}


function _makeXhr(method, endpoint, payload, callback, additional_headers) {
	if (typeof payload === 'function') {
		callback = payload;
		payload = undefined;
	}

	let xhr = new XMLHttpRequest();
	xhr.onload = () => {
		let resp = xhr.responseText;
		try {
			resp = JSON.parse(resp);
		} catch (e) {
			console.info('Response type is not JSON.');
		}

		callback(null, { response: resp, xhr });
	};
	xhr.onerror = (err) => {
		return callback(err, null);
	}
	xhr.open(method, endpoint, true);
	// xhr.upload.onprogress = (chk) => {
	// 	if (chk.lengthComputable) {
	// 		let percentComplete = (chk.loaded / chk.total) * 100;
	// 		console.info(percentComplete + '% uploaded');
	// 	}
	// };
	if (additional_headers.length) {
		for (let header of additional_headers) {
			xhr.setRequestHeader(Object.keys(header)[0], Object.values(header)[0]);
			if (Object.keys(header)[0].toLowerCase() === 'content-type' && Object.values(header)[0].toLowerCase() === 'application/json') {
				payload = JSON.stringify(payload);
			}
		}
	}

	xhr.send(payload);
}

class Http {

	constructor() {}

	setArgs(opts) {
		this.method = opts.method;
		this.endpoint = opts.endpoint;
		this.payload = opts.payload || null;
		this.additional_headers = opts.additional_headers || [];
	}

	request(options) {
		this.setArgs(options);
		return makeXhr(this.method, this.endpoint, this.payload, this.additional_headers);
	}

	get(options) {
		options.method = 'GET';
		return this.request(options);
	}

	post(options) {
		options.method = 'POST';
		return this.request(options);
	}

	put(options) {
		options.method = 'PUT';
		return this.request(options);
	}

	options(options) {
		options.method = 'OPTIONS';
		return this.request(options);
	}

	delete(options) {
		options.method = 'DELETE';
		return this.request(options);
	}

	head(options) {
		options.method = 'HEAD';
		return this.request(options);
	}

	connect(options) {
		options.method = 'CONNECT';
		return this.request(options);
	}

	patch(options) {
		options.method = 'PATCH';
		return this.request(options);
	}

}

if (required_in_node) {
    module.exports = Http;
}