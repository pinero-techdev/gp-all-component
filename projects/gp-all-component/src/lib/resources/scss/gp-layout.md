# Css class names equivalences into Scss

<b>Description</b> <br>Enumeration of classes translated into English and kebab case and their equivalences in the old bp-layout.css:<br> `.Fleft` -> `.f-left`<br>`.Fright` -> `.f-right`<br>
 `.bandera` -> `.flag`<br> `.bandera-ruso` -> `.flag-ruso`<br> `.bandera-español` -> `.flag-espanol`<br> `.bandera-frances` -> `.flag-frances`<br> `.bandera-ingles` -> `.flag-ingles`<br> `.bandera-italiano` -> `.flag-italiano`<br> `.bandera-portugues` -> `.flag-portugues`<br> `.bandera-aleman` -> `.flag-aleman`<br>Half english half spanish classes due to nationality comes from a service response<br>`.sin-bandera` -> `.no-flag`<br> `.contiene-html` -> `.html`<br>All of them have also been updated at templates and typescripts in case of dynamic addition<br>
<br>The following classes and id's are aparently unused and it's scss rules have been removed<br>
`.texto-lopd`, `.navy`, `.text-multiline`, `#router-outlet`, `.colmin`, `.colsmall`, `.colmedium`, `.colbig`, `.col-left`, `.col-right`, `.profile-img`, `.x-large`, `#world-map`, `.grafico`, `#graficoSearchContacto`, `.grafico-mapa`, `nivel-ficha`, `nivel-consulta`, `nivel-concierge`, `.azul`, `.plata`, `.dorado`, `.negro`, `.verde`, `.amarillo`, `.rojo`, `.naranja`, `.grayText`, `.grayBorder`, `.gold-border`, `.goldColor`, `.circular`, `.no-pad`, `.no-pad-top`, `.no-pad-bottom`, `.no-pad-left`, `.no-pad-right`, `.ui-datatable` and derived from old PrimeNg5 datatable, `.splash-screen`, `.ca-bordered`, `.no-top-border`, `#clientsSearch`, `.tv-320`, `.oculto`, `.colorbox-icontext`, `.md-dropboxfield`, `.menuPreferencia`, `.map`, `.localizador`, `.no-label`, `.full-width`, `.ms-dialog`, `.localizador-mapa`, `.dialog-responsive`, `.dialog-mini-responsive`, `.w100`, `.calendar-top`, `.dashboard`, `.margin-top`, `.uppercase`, `.round-label`, `.valid`, `.material-label`<br>
<br>Following color variables have been included:<br>
`$white: #fff;`<br>
`$red: #ff0000;`<br>
`$blue-medium: #3f51b5;`<br>
`$green-dark: #006400;`<br>
`$gray-light: #c0c0c0;`<br>
`$gray-medium: #a9a9a9;`<br>
`$gray-dark: #676767;`<br>
`$success: #42a948;`<br>
`$error: #a94442;`<br>
<br>Following mixins have been included:<br>
