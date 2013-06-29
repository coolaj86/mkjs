#!/usr/bin/env node
(function () {
  "use strict";

  function create(config) {
    var filedata = ''
      ;

    config = config || {};

    if (!config.jQuery) {
      filedata +=
        [ "(function () {"
        , '  "use strict";'
        , ''
        , "}());"
        ].join('\n')
        ;
    } else {
      filedata +=
        [ "$(function () {"
        , '  "use strict";'
        , ''
        , "});"
        ].join('\n')
        ;
    }

    return filedata;
  }

  module.exports.create = create;
}());
