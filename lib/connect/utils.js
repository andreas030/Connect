
/*!
 * Ext JS Connect
 * Copyright(c) 2010 Ext JS, Inc.
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var queryString = require('querystring'),
    crypto = require('crypto');

/**
 * Return md5 hash of the given string and optional encoding,
 * defaulting to hex.
 *
 * @param {String} str
 * @param {String} encoding
 * @return {String}
 * @api public
 */

exports.md5 = function(str, encoding){
    return crypto.createHash('md5').update(str).digest(encoding || 'hex');
};

/**
 * Default mime type.
 */

var defaultMime = exports.defaultMime = 'application/octet-stream';

/**
 * Converts the given object to a Boolean.
 *
 * @param  {Mixed} obj
 * @return {Boolean}
 * @api public
 */

exports.toBoolean = function(obj){
    return typeof obj === 'string'
        ? /^(y(es)?|true|1)$/.test(obj)
        : !! obj;
};

/**
 * Parse mini markdown implementation.
 * The following conversions are supported,
 * primarily for the "flash" middleware:
 *
 *    _foo_ or *foo* become <em>foo</em>
 *    __foo__ or **foo** become <strong>foo</strong>
 *    [A](B) becomes <a href="B">A</a>
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

exports.miniMarkdown = function(str){
    return String(str)
        .replace(/(__|\*\*)(.*?)\1/g, '<strong>$2</strong>')
        .replace(/(_|\*)(.*?)\1/g, '<em>$2</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
};

/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 * @api public
 */

exports.htmlEscape = function(html) {
    return String(html)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

/**
 * Return a unique identifier.
 *
 * @return {String}
 * @api public
 */

exports.uid = function() {
    var uid = '';
    for (var n = 4; n; --n) {
        uid += (Math.abs((Math.random() * 0xFFFFFFF) | 0)).toString(16);
    }
    return uid;
};

/**
 * Parse the given cookie string into an object.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parseCookie = function(str){
    var obj = {},
        pairs = str.split(/[;,] */);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var pair = pairs[i],
            eqlIndex = pair.indexOf('='),
            key = pair.substr(0, eqlIndex).trim().toLowerCase(),
            val = pair.substr(++eqlIndex, pair.length).trim();
        // Quoted values
        if (val[0] === '"') {
            val = val.slice(1, -1);
        }
        // Only assign once
        if (obj[key] === undefined) {
            obj[key] = queryString.unescape(val, true);
        }
    }
    return obj;
};

/**
 * Serialize the given object into a cookie string.
 *
 * @param {String} name
 * @param {String} val
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.serializeCookie = function(name, val, obj){
    var pairs = [name + '=' + queryString.escape(val)],
        obj = obj || {},
        keys = Object.keys(obj);
    for (var i = 0, len = keys.length; i < len; ++i) {
        var key = keys[i],
            val = obj[key];
        if (val instanceof Date) {
            val = val.toUTCString();
        } else if (typeof val === "boolean") {
            if (val === true) {
                pairs.push(key);
            }
            continue;
        }
        pairs.push(key + '=' + val);
    }
    return pairs.join('; ');
};

exports.mime = {

      /**
       * Return mime type for the given path, 
       * otherwise default to exports.defaultMime 
       * ("application/octet-stream").
       *
       * @param {String} path
       * @return {String}
       * @api public
       */

      type: function getMime(path) {
          var index = String(path).lastIndexOf(".");
          if (index < 0) {
              return defaultMime;
          }
          var type = exports.mime.types[path.substring(index).toLowerCase()] || defaultMime;
          return (/(text|javascript)/).test(type)
            ? type + "; charset=utf-8"
            : type;
      },

      /**
       * Mime types.
       */

      types: {
          ".3gp"   : "video/3gpp",
          ".a"     : "application/octet-stream",
          ".ai"    : "application/postscript",
          ".aif"   : "audio/x-aiff",
          ".aiff"  : "audio/x-aiff",
          ".asc"   : "application/pgp-signature",
          ".asf"   : "video/x-ms-asf",
          ".asm"   : "text/x-asm",
          ".asx"   : "video/x-ms-asf",
          ".atom"  : "application/atom+xml",
          ".au"    : "audio/basic",
          ".avi"   : "video/x-msvideo",
          ".bat"   : "application/x-msdownload",
          ".bin"   : "application/octet-stream",
          ".bmp"   : "image/bmp",
          ".bz2"   : "application/x-bzip2",
          ".c"     : "text/x-c",
          ".cab"   : "application/vnd.ms-cab-compressed",
          ".cc"    : "text/x-c",
          ".chm"   : "application/vnd.ms-htmlhelp",
          ".class" : "application/octet-stream",
          ".com"   : "application/x-msdownload",
          ".conf"  : "text/plain",
          ".cpp"   : "text/x-c",
          ".crt"   : "application/x-x509-ca-cert",
          ".css"   : "text/css",
          ".csv"   : "text/csv",
          ".cxx"   : "text/x-c",
          ".deb"   : "application/x-debian-package",
          ".der"   : "application/x-x509-ca-cert",
          ".diff"  : "text/x-diff",
          ".djv"   : "image/vnd.djvu",
          ".djvu"  : "image/vnd.djvu",
          ".dll"   : "application/x-msdownload",
          ".dmg"   : "application/octet-stream",
          ".doc"   : "application/msword",
          ".dot"   : "application/msword",
          ".dtd"   : "application/xml-dtd",
          ".dvi"   : "application/x-dvi",
          ".ear"   : "application/java-archive",
          ".eml"   : "message/rfc822",
          ".eps"   : "application/postscript",
          ".exe"   : "application/x-msdownload",
          ".f"     : "text/x-fortran",
          ".f77"   : "text/x-fortran",
          ".f90"   : "text/x-fortran",
          ".flv"   : "video/x-flv",
          ".for"   : "text/x-fortran",
          ".gem"   : "application/octet-stream",
          ".gemspec" : "text/x-script.ruby",
          ".gif"   : "image/gif",
          ".gz"    : "application/x-gzip",
          ".h"     : "text/x-c",
          ".hh"    : "text/x-c",
          ".htm"   : "text/html",
          ".html"  : "text/html",
          ".ico"   : "image/vnd.microsoft.icon",
          ".ics"   : "text/calendar",
          ".ifb"   : "text/calendar",
          ".iso"   : "application/octet-stream",
          ".jar"   : "application/java-archive",
          ".java"  : "text/x-java-source",
          ".jnlp"  : "application/x-java-jnlp-file",
          ".jpeg"  : "image/jpeg",
          ".jpg"   : "image/jpeg",
          ".js"    : "application/javascript",
          ".json"  : "application/json",
          ".log"   : "text/plain",
          ".m3u"   : "audio/x-mpegurl",
          ".m4v"   : "video/mp4",
          ".man"   : "text/troff",
          ".mathml" : "application/mathml+xml",
          ".mbox"  : "application/mbox",
          ".mdoc"  : "text/troff",
          ".me"    : "text/troff",
          ".mid"   : "audio/midi",
          ".midi"  : "audio/midi",
          ".mime"  : "message/rfc822",
          ".mml"   : "application/mathml+xml",
          ".mng"   : "video/x-mng",
          ".mov"   : "video/quicktime",
          ".mp3"   : "audio/mpeg",
          ".mp4"   : "video/mp4",
          ".mp4v"  : "video/mp4",
          ".mpeg"  : "video/mpeg",
          ".mpg"   : "video/mpeg",
          ".ms"    : "text/troff",
          ".msi"   : "application/x-msdownload",
          ".odp"   : "application/vnd.oasis.opendocument.presentation",
          ".ods"   : "application/vnd.oasis.opendocument.spreadsheet",
          ".odt"   : "application/vnd.oasis.opendocument.text",
          ".ogg"   : "application/ogg",
          ".p"     : "text/x-pascal",
          ".pas"   : "text/x-pascal",
          ".pbm"   : "image/x-portable-bitmap",
          ".pdf"   : "application/pdf",
          ".pem"   : "application/x-x509-ca-cert",
          ".pgm"   : "image/x-portable-graymap",
          ".pgp"   : "application/pgp-encrypted",
          ".pkg"   : "application/octet-stream",
          ".pl"    : "text/x-script.perl",
          ".pm"    : "text/x-script.perl-module",
          ".png"   : "image/png",
          ".pnm"   : "image/x-portable-anymap",
          ".ppm"   : "image/x-portable-pixmap",
          ".pps"   : "application/vnd.ms-powerpoint",
          ".ppt"   : "application/vnd.ms-powerpoint",
          ".ps"    : "application/postscript",
          ".psd"   : "image/vnd.adobe.photoshop",
          ".py"    : "text/x-script.python",
          ".qt"    : "video/quicktime",
          ".ra"    : "audio/x-pn-realaudio",
          ".rake"  : "text/x-script.ruby",
          ".ram"   : "audio/x-pn-realaudio",
          ".rar"   : "application/x-rar-compressed",
          ".rb"    : "text/x-script.ruby",
          ".rdf"   : "application/rdf+xml",
          ".roff"  : "text/troff",
          ".rpm"   : "application/x-redhat-package-manager",
          ".rss"   : "application/rss+xml",
          ".rtf"   : "application/rtf",
          ".ru"    : "text/x-script.ruby",
          ".s"     : "text/x-asm",
          ".sgm"   : "text/sgml",
          ".sgml"  : "text/sgml",
          ".sh"    : "application/x-sh",
          ".sig"   : "application/pgp-signature",
          ".snd"   : "audio/basic",
          ".so"    : "application/octet-stream",
          ".svg"   : "image/svg+xml",
          ".svgz"  : "image/svg+xml",
          ".swf"   : "application/x-shockwave-flash",
          ".t"     : "text/troff",
          ".tar"   : "application/x-tar",
          ".tbz"   : "application/x-bzip-compressed-tar",
          ".tci"   : "application/x-topcloud",
          ".tcl"   : "application/x-tcl",
          ".tex"   : "application/x-tex",
          ".texi"  : "application/x-texinfo",
          ".texinfo" : "application/x-texinfo",
          ".text"  : "text/plain",
          ".tif"   : "image/tiff",
          ".tiff"  : "image/tiff",
          ".torrent" : "application/x-bittorrent",
          ".tr"    : "text/troff",
          ".ttf"   : "application/x-font-ttf",
          ".txt"   : "text/plain",
          ".vcf"   : "text/x-vcard",
          ".vcs"   : "text/x-vcalendar",
          ".vrml"  : "model/vrml",
          ".war"   : "application/java-archive",
          ".wav"   : "audio/x-wav",
          ".wma"   : "audio/x-ms-wma",
          ".wmv"   : "video/x-ms-wmv",
          ".wmx"   : "video/x-ms-wmx",
          ".wrl"   : "model/vrml",
          ".wsdl"  : "application/wsdl+xml",
          ".xbm"   : "image/x-xbitmap",
          ".xhtml"   : "application/xhtml+xml",
          ".xls"   : "application/vnd.ms-excel",
          ".xml"   : "application/xml",
          ".xpm"   : "image/x-xpixmap",
          ".xsl"   : "application/xml",
          ".xslt"  : "application/xslt+xml",
          ".yaml"  : "text/yaml",
          ".yml"   : "text/yaml",
          ".zip"   : "application/zip"
      }
};

// TODO: expose node crypto base64 :)

/**
 * Base64 encode the given string.
 *
 * Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
 * Released under the MIT license
 *
 * @param  {String} str
 * @return {String}
 * @api public
 */

exports.base64Encode = function(str){
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var encoded = [];
    var c = 0;
    while (c < str.length) {
        var b0 = str.charCodeAt(c++);
        var b1 = str.charCodeAt(c++);
        var b2 = str.charCodeAt(c++);
        var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
        var i0 = (buf & (63 << 18)) >> 18;
        var i1 = (buf & (63 << 12)) >> 12;
        var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
        var i3 = isNaN(b2) ? 64 : (buf & 63);
        encoded[encoded.length] = chars.charAt(i0);
        encoded[encoded.length] = chars.charAt(i1);
        encoded[encoded.length] = chars.charAt(i2);
        encoded[encoded.length] = chars.charAt(i3);
    }
    return encoded.join('');
};

/**
 * Decode the given Base64 string.
 *
 * Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
 * Released under the MIT license
 *
 * @param  {String} str
 * @return {String}
 * @api public
 */


exports.base64Decode = function(str){
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var invalid = {
        strlen: (str.length % 4 != 0),
        chars:  new RegExp('[^' + chars + ']').test(str),
        equals: (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
    };
    if (invalid.strlen || invalid.chars || invalid.equals)
        throw new Error('Invalid base64 data');
    var decoded = [];
    var c = 0;
    while (c < str.length) {
        var i0 = chars.indexOf(str.charAt(c++));
        var i1 = chars.indexOf(str.charAt(c++));
        var i2 = chars.indexOf(str.charAt(c++));
        var i3 = chars.indexOf(str.charAt(c++));
        var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
        var b0 = (buf & (255 << 16)) >> 16;
        var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
        var b2 = (i3 == 64) ? -1 : (buf & 255);
        decoded[decoded.length] = String.fromCharCode(b0);
        if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
        if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
    }
    return decoded.join('');
};
