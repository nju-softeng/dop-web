'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _binaryReader = require('./binary-reader.js');

var _binaryReader2 = _interopRequireDefault(_binaryReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JPEGHeaders = function () {
    function JPEGHeaders(data) {
        _classCallCheck(this, JPEGHeaders);

        var markers = {
            0xFFE1: {
                app: 'EXIF',
                name: 'APP1',
                signature: 'Exif\0'
            },
            0xFFE2: {
                app: 'ICC',
                name: 'APP2',
                signature: 'ICC_PROFILE\0'
            },
            0xFFED: {
                app: 'IPTC',
                name: 'APP13',
                signature: 'Photoshop 3.0\0'
            }
        };
        var headers = this.headers = [];
        var read = void 0,
            idx = void 0,
            marker = void 0,
            length = 0;

        this.read = read = new _binaryReader2['default']();
        read.init(data);

        // Check if data is jpeg
        if (read.SHORT(0) !== 0xFFD8) {
            return;
        }

        idx = 2;
        var limit = Math.min(1048576, data.length);

        while (idx <= limit) {
            marker = read.SHORT(idx);

            // omit RST (restart) markers
            if (marker >= 0xFFD0 && marker <= 0xFFD7) {
                idx += 2;
                continue;
            }

            // no headers allowed after SOS marker
            if (marker === 0xFFDA || marker === 0xFFD9) {
                break;
            }

            length = read.SHORT(idx + 2) + 2;
            if (markers[marker] && read.STRING(idx + 4, markers[marker].signature.length) === markers[marker].signature) {
                headers.push({
                    hex: marker,
                    app: markers[marker].app.toUpperCase(),
                    name: markers[marker].name.toUpperCase(),
                    start: idx,
                    length: length,
                    segment: read.SEGMENT(idx, length)
                });
            }
            idx += length;
        }

        this.idx = idx;
        read.init(null); // free memory
    }

    JPEGHeaders.prototype.restore = function restore(data) {
        var headers = this.headers,
            read = this.read;

        read.init(data);

        // Check if data is jpeg
        var jpegHeaders = new JPEGHeaders(data);

        if (!jpegHeaders.headers) {
            return false;
        }

        // Delete any existing headers that need to be replaced
        for (var i = jpegHeaders.headers.length; i > 0; i--) {
            var hdr = jpegHeaders.headers[i - 1];
            read.SEGMENT(hdr.start, hdr.length, '');
        }
        jpegHeaders.purge();

        this.idx = read.SHORT(2) === 0xFFE0 ? 4 + read.SHORT(4) : 2;

        for (var _i = 0, l = headers.length; _i < l; _i++) {
            read.SEGMENT(this.idx, 0, headers[_i].segment);
            this.idx += headers[_i].length;
        }

        return read.SEGMENT();
    };

    JPEGHeaders.prototype.get = function get(app) {
        var headers = this.headers;
        var array = [];

        for (var i = 0, l = headers.length; i < l; i++) {
            if (headers[i].app === app.toUpperCase()) {
                array.push(headers[i].segment);
            }
        }
        return array;
    };

    JPEGHeaders.prototype.set = function set(app, segment) {
        var headers = this.headers;
        var array = [];

        if (typeof segment === 'string') {
            array.push(segment);
        } else {
            array = segment;
        }

        for (var i = 0, j = 0, l = headers.length; i < l; i++) {
            if (headers[i].app === app.toUpperCase()) {
                headers[i].segment = array[j];
                headers[i].length = array[j].length;
                j++;
            }
            if (j >= array.length) {
                break;
            }
        }
    };

    JPEGHeaders.prototype.purge = function purge() {
        this.headers = [];
        this.read.init(null);
    };

    return JPEGHeaders;
}();

exports['default'] = JPEGHeaders;
module.exports = exports['default'];