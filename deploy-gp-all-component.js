// Sube el componente de gp-all-components al servidor apache.
// La dependencia posterior del componente es:
//
//        "gp-all-component": "http://software.wapt.cen.intranet/angular/gp-all-component/gp-all-component-1.1.0.tgz",
//
// Modificar las variables package y component con la version correspondiente del componente.
//
let server = 'apache.cen.intranet';
let user = 'www';
let packageName = 'gp-all-component';
let component = 'gp-all-component-1.1.1.tgz';

//
let localFile = __dirname + '/dist/' + packageName + '/' + component;
let remoteFolder = '/www/sites/software/www/angular/' + packageName + '/';
//
console.log( 'Subiendo el archivo `' + localFile + '` al servidor `' + server + '` en la carpeta remota `' + remoteFolder + '`');

var Prompt = require( 'prompt-password' );
var Scp2 = require( 'scp2' );

var prompt = new Prompt({
  type: 'password',
  message: 'Password de \'' + user + '\'@\'' + server + '\': ',
  name: 'password'
});

prompt.run().then(function( password ) {
  console.log("Conectando ...");

  /* Scp2.defaults({
      port: 22,
      host: server,
      username: user,
      password: answers
  }); */

  console.log("Enviando archivo ...");
  Scp2.scp( localFile, {
    host: server,
    username: user,
    password: password,
    path: remoteFolder
  }, function(err) {
    if( err == null )
    {
      console.log( "Componente subido correctamente." );
    }
    else
    {
      console.log( "ERROR subiendo fichero." );
      console.log( err );
    }
  });
});
