#!/usr/bin/env node --node_strict
/*jshint strict:true node:true es5:true
indent:2 laxcomma:true laxbreak:true
onevar:true eqeqeq:true immed:true latedef:true undef:true unused:true
*/
(function () {
  "use strict";

  var defaults = { jshint:
      { 'node': true
      , 'es5': true
      , 'browser': true
      , 'jquery': true
      , 'onevar': true
      , 'indent': 2
      , 'laxcomma': true
      , 'laxbreak': true
      , 'eqeqeq': true
      , 'immed': true
      , 'undef': true
      , 'unused': true
      , 'latedef': true
      } }
    ;

  function create(config) {
    var filedata = ''
      ;

    if (!config) {
      config = defaults;
    }

    config.jshint = config.jshint || defaults.jshint;

    if (config.jshint && Object.keys(config.jshint).length) {
      filedata += '/*jshint ';
      Object.keys(config.jshint).forEach(function (key) {
        filedata += key + ':' + String(config.jshint[key]) + ' ';
      });
      filedata += '*/\n';
    }

    filedata +=
      [ "(function () {"
      , '  "use strict";'
      , ''
      , "}());"
      ].join('\n')
      ;

    return filedata;
  }

  module.exports.create = create;
}());
