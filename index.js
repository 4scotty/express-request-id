'use strict';

var uuid = require('uuid');

module.exports = function (options) {
    options = options || {};
    options.uuidVersion = options.uuidVersion || 'v4';
    options.setHeader = options.setHeader === undefined || !!options.setHeader;
    options.headerName = options.headerName || 'X-Request-Id';
    options.attributeName = options.attributeName || 'id';
    options.valuePrefix = options.valuePrefix || '';

    return function (req, res, next) {
        req[options.attributeName] = req.header(options.headerName) || options.valuePrefix + uuid[options.uuidVersion](options, options.buffer, options.offset);
        if (options.setHeader) {
            res.setHeader(options.headerName, req[options.attributeName]);
        }
        next();
    };
};
