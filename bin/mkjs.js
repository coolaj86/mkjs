#!/usr/bin/env node --use_strict
/*jshint node:true es5:true browser:true jquery:true
onevar:true indent:2 laxcomma:true laxbreak:true
eqeqeq:true immed:true undef:true unused:true latedef:true */
(function () {
  "use strict";

  var filepath = process.argv[2]
    , fs = require('fs')
    , path = require('path')
    , home = process.env[/^win/.test(process.platform) ? 'USERPROFILE' : 'HOME']
    , mkjs = require('../lib/index')
    , rcPath = path.join(home, '.mkjsrc.js')
    , config
    , filedata
    ;

  if (fs.existsSync(rcPath)) {
    try {
      config = require(rcPath);
    } catch (e) {
      console.error("There was a problem parsing " + rcPath);
      console.error(e);
      return;
    }
  }

  filedata = mkjs.create(config, filepath);

  filepath = path.resolve(process.cwd(), filepath);
  if (fs.existsSync(filepath)) {
    console.error('Cowardly refusing to destroy existing file ' + filepath);
    return;
  }

  fs.writeFile(filepath, filedata, 'utf8', function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Wrote ' + filepath);
  });
}());
