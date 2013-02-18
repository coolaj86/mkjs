Usage
===

Install

    npm install -g --force mkjs || sudo npm install -g --force mkjs

Creates a file with IIFE and JSHint boilerplate.

    mkjs /tmp/hello.js
    vim /tmp/hello.js

/tmp/hello.js:

```javascript
/*jshint node:true es5:true browser:true jquery:true
onevar:true indent:2 laxcomma:true laxbreak:true
eqeqeq:true immed:true undef:true unused:true latedef:true */
(function () {
  "use strict";

}());
```

Configuration
===

You can create `~/.mkjsrc.js` that contains the configuration you want to use

    vim ~/.mkjsrc.js

~/.mkjsrc.js

    module.exports = {
        jshint = {
          browser: true
        }
    };
