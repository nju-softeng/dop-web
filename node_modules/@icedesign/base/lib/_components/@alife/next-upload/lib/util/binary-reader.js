'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var BinaryReader = function () {
    function BinaryReader() {
        _classCallCheck(this, BinaryReader);

        this._II = false;
        this._bin = null;
    }

    BinaryReader.prototype._read = function _read(idx, size) {
        var mv = this._II ? 0 : -8 * (size - 1);
        var sum = 0,
            i = void 0;

        for (i = 0; i < size; i++) {
            sum |= this._bin.charCodeAt(idx + i) << Math.abs(mv + i * 8);
        }

        return sum;
    };

    BinaryReader.prototype._write = function _write(idx, num, size) {
        var str = '';
        var mv = this._II ? 0 : -8 * (size - 1),
            i = void 0;

        for (i = 0; i < size; i++) {
            str += String.fromCharCode(num >> Math.abs(mv + i * 8) & 255);
        }

        this._putstr(str, idx, size);
    };

    BinaryReader.prototype._putstr = function _putstr(segment, idx, length) {
        length = arguments.length === 3 ? length : this._bin.length - idx - 1;
        this._bin = this._bin.substr(0, idx) + segment + this._bin.substr(length + idx);
    };

    BinaryReader.prototype.II = function II(order) {
        if (order === undefined) return this._II;
        this._II = order;
    };

    BinaryReader.prototype.init = function init(binData) {
        this._II = false;
        this._bin = binData;
    };

    BinaryReader.prototype.SEGMENT = function SEGMENT(idx, length, segment) {
        var bin = this._bin;
        switch (arguments.length) {
            case 1:
                return bin.substr(idx, bin.length - idx - 1);
            case 2:
                return bin.substr(idx, length);
            case 3:
                this._putstr(segment, idx, length);
                break;
            default:
                return bin;
        }
    };

    BinaryReader.prototype.BYTE = function BYTE(idx) {
        return this._read(idx, 1);
    };

    BinaryReader.prototype.SHORT = function SHORT(idx) {
        return this._read(idx, 2);
    };

    BinaryReader.prototype.LONG = function LONG(idx, num) {
        if (num === undefined) {
            return this._read(idx, 4);
        }
        this._write(idx, num, 4);
    };

    BinaryReader.prototype.SLONG = function SLONG(idx) {
        // 2's complement notation
        var num = this._read(idx, 4);
        return num > 2147483647 ? num - 4294967296 : num;
    };

    BinaryReader.prototype.STRING = function STRING(idx, size) {
        var str = '';

        for (size += idx; idx < size; idx++) {
            str += String.fromCharCode(this._read(idx, 1));
        }

        return str;
    };

    return BinaryReader;
}();

exports['default'] = BinaryReader;
module.exports = exports['default'];