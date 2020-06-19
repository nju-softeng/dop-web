'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = upload;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _index = require('../util/index.js');

var _mime = require('./mime.js');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getError(option, xhr) {
    var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function send(xhr, data) {
    if (typeof data === 'string') {
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/sendAsBinary
        if (xhr.sendAsBinary) {
            // Gecko
            xhr.sendAsBinary(data);
        } else {
            // WebKit with typed arrays support
            var ui8a = new Uint8Array(data.length);
            for (var i = 0, l = data.length; i < l; i++) {
                ui8a[i] = data.charCodeAt(i) & 0xff;
            }
            xhr.send(ui8a.buffer);
        }
    } else {
        xhr.send(data);
    }
}

function upload(option) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    var formData = void 0;
    var fileName = option.file && option.file.name || '';
    var multipartArgs = (0, _objectAssign2['default'])({
        name: fileName
    }, option.data);
    if (typeof option.bin === 'string') {
        var bin = option.bin;
        var boundary = '----ksuploadboundary' + (0, _index.uid)();
        var dashdash = '--';
        var crlf = '\r\n';
        var multipartBlob = '';
        option.headers = option.headers || {};

        // if no FormData we can still try to send it directly as last resort (see below)
        // Trying to send the whole thing as binary...

        // Added multipart request
        option.headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;
        // append multipart parameters
        Object.keys(multipartArgs).forEach(function (name) {
            /* eslint prefer-template: 0 */
            multipartBlob += dashdash + boundary + crlf + 'Content-Disposition: form-data; name="' + name + '"' + crlf + crlf;
            multipartBlob += unescape(encodeURIComponent(multipartArgs[name])) + crlf;
        });

        var mimeType = _mime2['default'][option.file.name.replace(/^.+\.([^.]+)/, '$1').toLowerCase()] || 'application/octet-stream';

        // Build RFC2388 blob
        multipartBlob += dashdash + boundary + crlf + 'Content-Disposition: form-data; name="' + option.filename + '"; filename="' + unescape(encodeURIComponent(option.file.name)) + '"' + crlf + 'Content-Type: ' + mimeType + crlf + crlf + bin + crlf + dashdash + boundary + dashdash + crlf;

        // multipartDeltaSize = multipartBlob.length - bin.length;
        formData = multipartBlob;
    } else {
        formData = new FormData();

        /* eslint-disable */
        Object.keys(multipartArgs).map(function (key) {
            formData.append(key, multipartArgs[key]);
        });
        /* eslint-enable */

        formData.append(option.filename, option.bin);
    }

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }
        option.onSuccess(getBody(xhr));
    };

    xhr.onabort = function (e) {
        option.onAbort(e);
    };

    xhr.open('post', option.action, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    var headers = option.headers || {};
    for (var h in headers) {
        if (headers.hasOwnProperty(h)) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    send(xhr, formData);

    delete option.bin;
    delete option.file;

    return {
        abort: function abort() {
            xhr.abort();
        }
    };
}
module.exports = exports['default'];