const required_in_node = typeof window === 'undefined';
if (required_in_node) {
	var XMLHttpRequest = eval('require("xmlhttprequest").XMLHttpRequest');
	var Promise = eval('require("bluebird")');
}

export interface Header {
	[key: string]: string | number
}

export function makeXhr(method: string, endpoint: string, payload: any, additional_headers: Header[]) {
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
	if (additional_headers) {
		for (let header in additional_headers) {
			xhr.setRequestHeader(header, additional_headers[header]);
			if (header.toLowerCase() === 'content-type' && additional_headers[header].toLowerCase() === 'application/json') {
				payload = JSON.stringify(payload);
			}
		}
	}

	xhr.send(payload);
}