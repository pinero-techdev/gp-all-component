# Multi Language

### Features a button to select a language

You can use this component for your multilingual applications in order to show a modal to let the user choose their language of preference

## Example

```html
<gp-multi-language-component></gp-multi-language-component>
```

## Component Binding Fields

```ts
 /*
  * Table reference only used for service
  */
  @Input() table: string;
```

```ts
  /*
   * Key reference  only used for service 
   */
  @Input() pKey: string;
```

```ts
  /*
   * Schema reference only used for service  
   */
  @Input() schema: string;
```

```ts
  /*
   * Field reference only used for service 
   */
  @Input() field: string;
```

```ts
  /*
   * Part of the title, usually the section
   * where the MultiLanguage is open  
   */
  @Input() description: string;
```

```ts
  /*
   * Depending if the user is editing 
   * some text input and buttons are shown. 
   */
  @Input() isEditing: boolean;
```

```ts
  /*
   * Used for sorting 
   */
  @Input() orderByLangCod = true;
```

## Upgrading 1.1.0 to 1.1.1

#### Service name

- `MultiIdomaService` => `MultiLanguageService`

#### Service methods

- `getTraducciones` => `getTranslations`
- `actualizaTraducciones` => `updateTranslations`

#### Component rename

`MultiIdiomaComponent` => `MultiLanguageComponent`

#### Component selector

- `gp-multi-idioma` => `gp-multi-language`

#### Component methods

- `ordenarTraducciones` => `sortTranslations`
- `getTraducciones` => `getTranslations`
- `despliegaTraducciones` => `initTranslations`
- `cerrarEdicionTraduccion` => `hideTranslations`
- `mostrarDialogoEdicionHTML` => `showEditorHTMLDialog`
- `contieneHtml` => `hasHTMLContent`
- `guardarCambios` => `save`
- `guardarCambiosHTML` => `saveHTML`
- `cerrarEdicionHTML` => `closeHTMLEditor`

#### Component variables

- `visualizarEdicionHTML` => `showHTMLEditor`
- `visualizarTablaTraducciones` => `showTranslations`
- `elementosTraducciones` => `translations`
- `textoHTML` => `text`
- `habilitarEdicionHTML` => `isEditing`
- `campoDescripcion` => `description`
- `campo` => `field`
- `esquema` => `schema`
- `tabla` => `table`
- `traduccionTextoHTML` => `currentTextHTML`
- `traduccionIdiomaHTML` => `currentLanguageHTML`

#### Related Classes

- `GetTraduccionesRq` => `GetTranslationsRq`
  - `pKey` => `pKey`
  - `esquema` => `schema`
  - `campo` => `field`
  - `tabla` => `table`
- `GetTraduccionesRs` => `GetTranslationsRs`
  - `traducciones` => `translations`
- `UpdateTraduccionesRq` => `UpdateTranslationsRq`
  - `pKey` => `pKey`
  - `esquema` => `schema`
  - `campo` => `field`
  - `tabla` => `table`
  - `langCode` => `langCode`
  - `texto_traduc` => `translationText`
- `UpdateTraduccionesRs` => `UpdateTranslationsRs`
- `Traduccion` => `Translation`
  - `codigoIdioma` => `langCode`
  - `idiomaPais` => `langCountry`
  - `idiomaPaisTraduccion` => `langCountryTranslation`
