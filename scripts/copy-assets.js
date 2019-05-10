'use strict';
const cpx = require('cpx');
const fs = require('fs');

// Entry dir
const images = './projects/gp-all-component/src/lib/resources/images/**/*.*';
const fonts = './projects/gp-all-component/src/lib/resources/fonts/**/*.*';
const webfonts = './projects/gp-all-component/src/lib/resources/webfonts/**/*.*';

// Destination dir
const destImages = './dist/gp-all-component/lib/assets/images';
const destFonts = './dist/gp-all-component/lib/assets/fonts';
const destWebfonts = './dist/gp-all-component/lib/assets/webfonts';

if (!fs.existsSync(destImages)) {
  fs.mkdirSync(destImages, { recursive: true });
}

if (!fs.existsSync(destFonts)) {
  fs.mkdirSync(destFonts, { recursive: true });
}

if (!fs.existsSync(destWebfonts)) {
  fs.mkdirSync(destWebfonts, { recursive: true });
}

function callback() {
  console.log('[INFO] Copy files finished succesfully!');
}

/**
 * https://github.com/mysticatea/cpx
 */
cpx.copy(images, destImages, callback);
cpx.copy(fonts, destFonts, callback);
cpx.copy(webfonts, destWebfonts, callback);
