"use strict";

var findType = /(\w+\/?\w+)/;

var supportedParsers = {
  'application/json': JSON.parse,
  'text/json': JSON.parse,
  'text/x-json': JSON.parse
  'application/xml': require('xml2js'),
  'text/xml': require('xml2js')
};

module.exports = function parser(res, next) {
  var matchedContentType = (res.headers['content-type'] || '').match(findType),
      parserLib, parsedBody;

  if (!(matchedContentType && (parserLib = supportedParsers[matchedContentType[0]]))) return next();

  try {
    parsedBody = parserLib(res.body);
  } catch (e) {
    return next(e);
  }

  res.parsedBody = parsedBody;
  next();
};
