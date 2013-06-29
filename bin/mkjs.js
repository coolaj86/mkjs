#!/usr/bin/env node
(function () {
  "use strict";

  var filepath = process.argv[2]
    , fs = require('fs')
    , path = require('path')
    , home = process.env[/^win/.test(process.platform) ? 'USERPROFILE' : 'HOME']
    , mkjs = require('../lib/mkjs')
    , rcPath = path.join(home, '.mkjsrc.js')
    , hintPath = path.join(home, '.jshintrc')
    , binName = process.argv[1]
    , config
    , filedata
    ;

  if (!fs.existsSync(hintPath)) {
    try {
      fs.writeFileSync(
          fs.readFileSync(path.join(__dirname, '..', 'lib', 'jshintrc'), 'utf8')
        , hintPath
        , 'utf8'
      );
    } catch(e) {
      console.warn("Could not write ~/.jshintrc");
    }
  }

  if (fs.existsSync(rcPath)) {
    try {
      config = require(rcPath);
    } catch (e) {
      console.error("There was a problem parsing " + rcPath);
      console.error(e);
      return;
    }
  }

  config = config || {};

  if (/mkjq/.test(binName)) {
    config.jQuery = true;
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
