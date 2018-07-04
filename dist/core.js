"use strict";
exports.__esModule = true;
var required_in_node = typeof window === 'undefined';
if (required_in_node) {
    var XMLHttpRequest = eval('require("xmlhttprequest").XMLHttpRequest');
    var Promise = eval('require("bluebird")');
}
function makeXhr(method, endpoint, payload, additional_headers) {
    return new Promise(function (resolve, reject) {
        _makeXhr(method, endpoint, payload, function (err, resp) {
            return err ? reject(err) : resolve(resp);
        }, additional_headers);
    });
}
exports.makeXhr = makeXhr;
function _makeXhr(method, endpoint, payload, callback, additional_headers) {
    if (typeof payload === 'function') {
        callback = payload;
        payload = undefined;
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var resp = xhr.responseText;
        try {
            resp = JSON.parse(resp);
        }
        catch (e) {
            console.info('Response type is not JSON.');
        }
        callback(null, { response: resp, xhr: xhr });
    };
    xhr.onerror = function (err) {
        return callback(err, null);
    };
    xhr.open(method, endpoint, true);
    if (additional_headers) {
        for (var header in additional_headers) {
            xhr.setRequestHeader(header, additional_headers[header]);
            if (header.toLowerCase() === 'content-type' && additional_headers[header].toLowerCase() === 'application/json') {
                payload = JSON.stringify(payload);
            }
        }
    }
    xhr.send(payload);
}
