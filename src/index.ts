import { Header, makeXhr } from './core';

interface Opts {
	method?: string,
	endpoint: string,
	payload?: any,
	additional_headers?: Header[]
}

export class Http {
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

	public request(options) {
		this.setArgs(options);
		return makeXhr(this.method, this.endpoint, this.payload, this.additional_headers);
	}

	public get(options) {
		options.method = 'GET';
		return this.request(options);
	}

	public post(options) {
		options.method = 'POST';
		return this.request(options);
	}

	public put(options) {
		options.method = 'PUT';
		return this.request(options);
	}

	public options(options) {
		options.method = 'OPTIONS';
		return this.request(options);
	}

	public delete(options) {
		options.method = 'DELETE';
		return this.request(options);
	}

	public head(options) {
		options.method = 'HEAD';
		return this.request(options);
	}

	public connect(options) {
		options.method = 'CONNECT';
		return this.request(options);
	}

	public patch(options) {
		options.method = 'PATCH';
		return this.request(options);
	}

}
