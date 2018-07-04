"use strict";
exports.__esModule = true;
var core_1 = require("./core");
var Http = /** @class */ (function () {
    function Http() {
    }
    Http.prototype.setArgs = function (opts) {
        this.method = opts.method;
        this.endpoint = opts.endpoint;
        this.payload = opts.payload || null;
        this.additional_headers = opts.additional_headers || [];
    };
    Http.prototype.request = function (options) {
        this.setArgs(options);
        return core_1.makeXhr(this.method, this.endpoint, this.payload, this.additional_headers);
    };
    Http.prototype.get = function (options) {
        options.method = 'GET';
        return this.request(options);
    };
    Http.prototype.post = function (options) {
        options.method = 'POST';
        return this.request(options);
    };
    Http.prototype.put = function (options) {
        options.method = 'PUT';
        return this.request(options);
    };
    Http.prototype.options = function (options) {
        options.method = 'OPTIONS';
        return this.request(options);
    };
    Http.prototype["delete"] = function (options) {
        options.method = 'DELETE';
        return this.request(options);
    };
    Http.prototype.head = function (options) {
        options.method = 'HEAD';
        return this.request(options);
    };
    Http.prototype.connect = function (options) {
        options.method = 'CONNECT';
        return this.request(options);
    };
    Http.prototype.patch = function (options) {
        options.method = 'PATCH';
        return this.request(options);
    };
    return Http;
}());
exports.Http = Http;
