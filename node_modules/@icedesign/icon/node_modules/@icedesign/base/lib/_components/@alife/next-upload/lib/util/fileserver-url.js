'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable */
var _kf_ = '/kf/';
var dot = '.';
var slash = '/';
var underScore = '_';
var questionMark = '?';
var alibabaImageDomainList = ['g01.s.alicdn.com', 'g02.s.alicdn.com', 'g03.s.alicdn.com', 'g04.s.alicdn.com'];
var alibabaContentDomainList = ['f01.s.alicdn.com', 'f02.s.alicdn.com', 'f03.s.alicdn.com', 'f04.s.alicdn.com'];
var alibabaV2DomainList = ['sc01.alicdn.com', 'sc02.alicdn.com'];
var aliexpressImageDomainList = ['g01.a.alicdn.com', 'g02.a.alicdn.com', 'g03.a.alicdn.com', 'g04.a.alicdn.com'];
var aliexpressContentDomainList = ['f01.a.alicdn.com', 'f02.a.alicdn.com', 'f03.a.alicdn.com', 'f04.a.alicdn.com'];
var itaoImageDomainList = ['g01.t.alicdn.com', 'g02.t.alicdn.com', 'g03.t.alicdn.com', 'g04.t.alicdn.com'];
var itaoContentDomainList = ['f01.t.alicdn.com', 'f02.t.alicdn.com', 'f03.t.alicdn.com', 'f04.t.alicdn.com'];
var taobaoImageDomainList = ['g01.b.alicdn.com', 'g02.b.alicdn.com', 'g03.b.alicdn.com', 'g04.b.alicdn.com'];
var taobaoContentDomainList = ['f01.b.alicdn.com', 'f02.b.alicdn.com', 'f03.b.alicdn.com', 'f04.b.alicdn.com'];
var aliexpressSkipCdnDomain = 'kfdown.a.aliimg.com';
var alibabaSkipCdnDomain = 'kfdown.s.aliimg.com';
var itaoSkipCdnDomain = 'kfdown.t.aliimg.com';
var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif', 'tiff', 'webp'];
var imageSize = ['_50x50', '_80x80', '_100x100', '_120x120', '_140x140', '_200x200', '_220x220', '_250x250', '_350x350', '_640x640', '_220x10000', '_640x10000'];
var resizableImageExtensions = ['jpg', 'jpeg', 'png'];
var consistentHashCycle = {};

var commonParams = {
    site: 'alibaba',
    resize: '_140x140',
    fileName: '',
    skipCDN: false,
    withAddition: '',
    asAttachment: '',
    useDomainGroup: '',
    fileProtocol: ''
};

function isImage(ext) {
    return imageExtensions.indexOf(ext) !== -1;
}

function getProtocol(site, fileProtocol) {
    if (!fileProtocol || fileProtocol === 'http') {
        return 'http://';
    }
    if (fileProtocol === 'https') {
        if (site === 'alibaba_v2') {
            return 'https://';
        }
        return null; // This site does not support https.
    }

    if (fileProtocol === 'empty') {
        return '//';
    }
    return null; // Unsupported protocol.
}

function isResizableImage(ext, size) {
    return resizableImageExtensions.indexOf(ext) !== -1 && imageSize.indexOf(size) !== -1;
}

function parseFileName(fileName) {
    var fileNameIndex = fileName.indexOf('.');
    var fileExtensionIndex = fileName.lastIndexOf('.');
    var file = '';
    var extension = '';
    if (fileNameIndex === -1) {
        file = fileName;
        extension = '';
    } else {
        file = fileName.substring(0, fileNameIndex);
        extension = fileName.substring(fileExtensionIndex + 1, fileName.length);
    }
    return {
        file: file,
        extension: extension
    };
}

function initType(num) {
    var maxValue = 0x7fffffff;
    var minValue = -0x80000000;
    if (num > maxValue || num < minValue) {
        return num &= 0xFFFFFFFF;
    }
    return num;
}

function hashCode(str) {
    var hashCode = 0;
    if (str) {
        for (var i = 0; i < str.length; i++) {
            hashCode = hashCode * 31 + str.charCodeAt(i);
            hashCode = initType(hashCode);
        }
    }
    return hashCode;
}

function binarySearch(arrayList, fileHashCode) {
    var start = 0;
    var stop = arrayList.length - 1;
    var middleIndex = Math.floor((stop + start) / 2);

    while (arrayList[middleIndex]['hashCode'] != fileHashCode && start < stop) {
        if (fileHashCode < arrayList[middleIndex]['hashCode']) {
            stop = middleIndex - 1;
        } else if (fileHashCode > arrayList[middleIndex]['hashCode']) {
            start = middleIndex + 1;
        }
        middleIndex = Math.floor((stop + start) / 2);
    }
    return arrayList[middleIndex]['hashCode'] != fileHashCode ? -1 : middleIndex;
}

function quickSort(array) {
    var i = 0;
    var j = array.length - 1;
    var sortArray = function sortArray(i, j) {
        if (i === j) return;

        var key = array[i]['hashCode'];
        var keyObj = array[i];
        var stepi = i;
        var stepj = j;
        while (j > i) {
            if (array[j]['hashCode'] >= key) {
                j--;
            } else {
                array[i] = array[j];
                while (j > ++i) {
                    if (array[i]['hashCode'] > key) {
                        array[j] = array[i];
                        break;
                    }
                }
            }
        }
        if (stepi === i) {
            sortArray(++i, stepj);
            return;
        }

        array[i] = keyObj;
        sortArray(stepi, i);
        sortArray(j, stepj);
    };
    sortArray(i, j);
    return array;
}

function tailMap(cycleName, fileHashCode) {
    var array = consistentHashCycle[cycleName];
    if (array[array.length - 1]['hashCode'] < fileHashCode) {
        return array[0]['domain'];
    } else {
        var hashCodeIndex = binarySearch(array, fileHashCode);
        if (hashCodeIndex == -1) {
            var arrayObj = {};
            arrayObj.hashCode = fileHashCode;
            arrayObj.domain = 'mock';
            array.push(arrayObj);
            var sortArray = quickSort(array);
            var fileIndex = binarySearch(sortArray, fileHashCode);
            array.splice(fileIndex, 1);
            return array[fileIndex]['domain'];
        } else {
            return array[hashCodeIndex]['domain'];
        }
    }
}

function consistentHash(filename, cycleName, domainList) {
    var fileHashCode = hashCode(filename);
    if (!consistentHashCycle[cycleName]) {
        var numberOfReplicase = 20;
        var domainArray = [];
        for (var i = 0; i < domainList.length; i++) {
            for (var j = 0; j < numberOfReplicase; j++) {
                var elementObj = {};
                elementObj.hashCode = hashCode(domainList[i] + j);
                elementObj.domain = domainList[i];
                domainArray.push(elementObj);
            }
        }
        consistentHashCycle[cycleName] = quickSort(domainArray);
    }
    return tailMap(cycleName, fileHashCode);
}

var siteMap = {
    'alibaba': {
        skipDomain: alibabaSkipCdnDomain,
        f: ['alibabaContentDomainList', alibabaContentDomainList],
        g: ['alibabaImageDomainList', alibabaImageDomainList],
        image: ['alibabaImageDomainList', alibabaImageDomainList],
        content: ['alibabaContentDomainList', alibabaContentDomainList]
    },
    'alibaba_v2': {
        skipDomain: null,
        f: ['alibabaV2DomainList', alibabaV2DomainList],
        g: ['alibabaV2DomainList', alibabaV2DomainList],
        image: ['alibabaV2DomainList', alibabaV2DomainList],
        content: ['alibabaV2DomainList', alibabaV2DomainList]
    },
    'aliexpress': {
        skipDomain: aliexpressSkipCdnDomain,
        f: ['aliexpressContentDomainList', aliexpressContentDomainList],
        g: ['aliexpressImageDomainList', aliexpressImageDomainList],
        image: ['aliexpressImageDomainList', aliexpressImageDomainList],
        content: ['aliexpressContentDomainList', aliexpressContentDomainList]
    },
    'itao': {
        skipDomain: null,
        f: ['itaoContentDomainList', itaoContentDomainList],
        g: ['itaoImageDomainList', itaoImageDomainList],
        image: ['itaoImageDomainList', itaoImageDomainList],
        content: ['itaoContentDomainList', itaoContentDomainList]
    },
    'taobao': {
        skipDomain: null,
        f: ['taobaoContentDomainList', taobaoContentDomainList],
        g: ['taobaoImageDomainList', taobaoImageDomainList],
        image: ['taobaoImageDomainList', taobaoImageDomainList],
        content: ['taobaoContentDomainList', taobaoContentDomainList]
    }
};

function switchDomain(fileKey, site, isSkip, group, isImage) {
    var config = siteMap[site];
    if (!config) {
        return null;
    }

    if (isSkip) {
        return config.skipDomain;
    }
    if (group) {
        if (group === 'f') {
            return consistentHash(fileKey, config.f[0], config.f[1]);
        } else if (group === 'g') {
            return consistentHash(fileKey, config.g[0], config.g[1]);
        }
    } else {
        return isImage ? consistentHash(fileKey, config.image[0], config.image[1]) : consistentHash(fileKey, config.content[0], config.content[1]);
    }
    return null;
}

var setCommonParams = exports.setCommonParams = function setCommonParams(params) {
    commonParams = _extends({}, commonParams, params);
};

var getCommonParams = exports.getCommonParams = function getCommonParams() {
    return commonParams;
};

var buildUrl = exports.buildUrl = function buildUrl(customParams) {
    var params = _extends({}, commonParams, customParams);

    var site = params.site,
        fileName = params.fileName,
        resize = params.resize,
        skipCDN = params.skipCDN,
        withAddition = params.withAddition,
        asAttachment = params.asAttachment,
        useDomainGroup = params.useDomainGroup,
        fileProtocol = params.fileProtocol;

    resize = resize ? resize.indexOf(underScore) === -1 ? underScore + resize : resize : '';

    if (!site || !fileName) {
        return null;
    }

    var fileObj = parseFileName(fileName);
    var fileKey = fileObj.file;
    var fileExtension = fileObj.extension;

    if (!fileExtension) {
        return null;
    }

    var domain = '';
    if (skipCDN == true) {
        domain = switchDomain(fileName, site, true);
    } else {
        if (useDomainGroup) {
            if (useDomainGroup === 'f') {
                domain = switchDomain(fileName, site, false, 'f', false);
            } else if (useDomainGroup === 'g') {
                domain = switchDomain(fileName, site, false, 'g', false);
            } else {
                return null; // Unsupported domain group.
            }
        } else {
            if (isImage(fileExtension)) {
                domain = switchDomain(fileName, site, false, null, true);
            } else {
                domain = switchDomain(fileName, site, false, null, false);
            }
        }
    }

    if (!domain) {
        return null;
    }

    var formatHead = getProtocol(site, fileProtocol);
    if (!formatHead) {
        return null;
    }

    if (resize && !isResizableImage(fileExtension, resize)) {
        //error can not resize
        return null; //{ error: 'Only image files ' + resizableImageExtensions.join(',') + ' have resize information in the URL. And only image sizes ' + imageSize.join(',') + ' are resizable.' };
    } else {
        var url = withAddition ? formatHead + domain + _kf_ + fileKey + withAddition + dot + fileExtension : formatHead + domain + _kf_ + fileName;

        if (resize) {
            url = url + resize + dot + fileExtension;
        }
        if (asAttachment) {
            url = url + '?attachment=' + asAttachment;
        }
        return url;
    }
};