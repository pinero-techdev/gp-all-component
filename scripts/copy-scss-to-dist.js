// Script para copiar la carpeta scss al dist de la librería tras el build
const fs = require('fs-extra');
const path = require('path');

const src = path.resolve(__dirname, '../projects/gp-all-component/src/lib/resources/scss');
const dest = path.resolve(__dirname, '../dist/gp-all-component/lib/resources/scss');

fs.copy(src, dest, { overwrite: true }, function(err) {
  if (err) {
    console.error('Error copiando carpeta scss:', err);
    process.exit(1);
  } else {
    console.log('Carpeta scss copiada correctamente a dist/gp-all-component/scss');
  }
});
