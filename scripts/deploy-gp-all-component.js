// Sube el componente de gp-all-components al servidor apache.
// La dependencia posterior del componente es:
//
//        "gp-all-component": "gp-all-component": "http://software.cen.intranet/angular/gp-all-component/gp-all-component-1.4.9.tgz",
//
// Modificar las variables package y component con la version correspondiente del componente.
//
const package = require('../package.json');
const server = 'apachest1.tic1.intranet';
const user = 'www';
const packageName = package.name;
const packageVersion = package.version;
const component = `${packageName}-${packageVersion}.tgz`;

//
const localFile = __dirname + '/../dist/' + packageName + '/' + component;
const remoteFolder = '/www/sites/software/www/angular/' + packageName + '/';
//
console.log(
  'Subiendo el archivo `' +
    localFile +
    '` al servidor `' +
    server +
    '` en la carpeta remota `' +
    remoteFolder +
    '`'
);

var Prompt = require('prompt-password');
var Scp2 = require('scp2');

var prompt = new Prompt({
  type: 'password',
  message: "Password de '" + user + "'@'" + server + "': ",
  name: 'password',
});

prompt.run().then(function(password) {
  console.log('Conectando ...');

  /* Scp2.defaults({
      port: 22,
      host: server,
      username: user,
      password: answers
  }); */

  console.log('Enviando archivo ...');
  Scp2.scp(
    localFile,
    {
      host: server,
      username: user,
      password: password,
      path: remoteFolder,
    },
    function(err) {
      if (err == null) {
        console.log('Componente subido correctamente.');
      } else {
        console.log('ERROR subiendo fichero.');
        console.log(err);
      }
    }
  );
});
