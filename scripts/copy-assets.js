'use strict';
const cpx = require('cpx');
const fs = require('fs');

function init() {
  // Get the params by command
  const args = process.argv.slice(2);
  let entry, dest;
  if (args && args.length === 2) {
    entry = args[0];
    dest = args[1];
  }
  copy(entry, dest);
}

/* Copy files to destination folder */
function copy(entry, dest) {
  if (entry && dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    /**
     * https://github.com/mysticatea/cpx
     */
    cpx.copy(entry, dest, callback);
  }
}

/** Callback after copy files */
function callback() {
  console.log('[INFO] Copy files finished succesfully!');
}

init();
