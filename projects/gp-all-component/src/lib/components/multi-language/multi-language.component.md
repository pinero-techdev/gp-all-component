### MultiLanguageComponent

Tag element: `<gp-multi-language-component></gp-multi-language-component>`

### Upgrading 1.1.0 to 1.1.1

Everything in spanish was renamed to english language.

#### Service name

-   `MultiIdomaService` => `MultiLanguageService`

#### Service methods

-   `getTraducciones` => `getTranslations`
-   `actualizaTraducciones` => `updateTranslations`

#### Component rename

`MultiIdiomaComponent` => `MultiLanguageComponent`

#### Component selector

-   `gp-multi-idioma` => `gp-multi-language`

#### Component methods

-   `ordenarTraducciones` => `sortTranslations`
-   `getTraducciones` => `getTranslations`
-   `despliegaTraducciones` => `initTranslations`
-   `cerrarEdicionTraduccion` => `hideTranslations`
-   `mostrarDialogoEdicionHTML` => `showEditorHTMLDialog`
-   `contieneHtml` => `hasHTMLContent`
-   `guardarCambios` => `save`
-   `guardarCambiosHTML` => `saveHTML`
-   `cerrarEdicionHTML` => `closeHTMLEditor`

#### Component variables

-   `visualizarEdicionHTML` => `showHTMLEditor`
-   `visualizarTablaTraducciones` => `showTranslations`
-   `elementosTraducciones` => `translations`
-   `textoHTML` => `text`
-   `habilitarEdicionHTML` => `isEditing`
-   `campoDescripcion` => `description`
-   `campo` => `field`
-   `esquema` => `schema`
-   `tabla` => `table`
-   `traduccionTextoHTML` => `currentTextHTML`
-   `traduccionIdiomaHTML` => `currentLanguageHTML`

#### Related Classes

-   `GetTraduccionesRq` => `GetTranslationsRq`
    -   `pKey` => `pKey`
    -   `esquema` => `schema`
    -   `campo` => `field`
    -   `tabla` => `table`
-   `GetTraduccionesRs` => `GetTranslationsRs`
    -   `traducciones` => `translations`
-   `UpdateTraduccionesRq` => `UpdateTranslationsRq`
    -   `pKey` => `pKey`
    -   `esquema` => `schema`
    -   `campo` => `field`
    -   `tabla` => `table`
    -   `langCode` => `langCode`
    -   `texto_traduc` => `translationText`
-   `UpdateTraduccionesRs` => `UpdateTranslationsRs`
-   `Traduccion` => `Translation`
    -   `codigoIdioma` => `langCode`
    -   `idiomaPais` => `langCountry`
    -   `idiomaPaisTraduccion` => `langCountryTranslation`
