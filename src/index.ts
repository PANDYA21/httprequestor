const required_in_node = typeof window === 'undefined';
if (required_in_node) {
	eval('var XMLHttpRequest= require("xmlhttprequest").XMLHttpRequest');
	var Promise = eval('require("bluebird")');
}

interface Header {
	[key: string]: string | number
}

function makeXhr(method: string, endpoint: string, payload: any, additional_headers: Header[]) {
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

interface Opts {
	method?: string,
	endpoint: string,
	payload?: any,
	additional_headers?: Header[]
}

class Http {
	public method: string;
	public endpoint: string;
	public payload: any;
	public additional_headers: Header[];

	constructor() {}

	private setArgs(opts: Opts): void {
		this.method = opts.method;
		this.endpoint = opts.endpoint;
		this.payload = opts.payload || null;
		this.additional_headers = opts.additional_headers || [];
	}

	public request(options: Opts): Promise<any> {
		this.setArgs(options);
		return makeXhr(this.method, this.endpoint, this.payload, this.additional_headers);
	}

	public get(options: Opts): Promise<any> {
		options.method = 'GET';
		return this.request(options);
	}

	public post(options: Opts): Promise<any> {
		options.method = 'POST';
		return this.request(options);
	}

	public put(options: Opts): Promise<any> {
		options.method = 'PUT';
		return this.request(options);
	}

	public options(options: Opts): Promise<any> {
		options.method = 'OPTIONS';
		return this.request(options);
	}

	public delete(options: Opts): Promise<any> {
		options.method = 'DELETE';
		return this.request(options);
	}

	public head(options: Opts): Promise<any> {
		options.method = 'HEAD';
		return this.request(options);
	}

	public connect(options: Opts): Promise<any> {
		options.method = 'CONNECT';
		return this.request(options);
	}

	public patch(options: Opts): Promise<any> {
		options.method = 'PATCH';
		return this.request(options);
	}

}

if (required_in_node) {
	eval('module.exports = Http');
}