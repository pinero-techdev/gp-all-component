export class Translation {
  codigoIdioma: string;
  idiomaPais: string;
  idiomaPaisTraduccion: string;

  constructor(langCode: string, langCountry: string, langCountryTranslation: string) {
    this.codigoIdioma = langCode;
    this.idiomaPais = langCountry;
    this.idiomaPaisTraduccion = langCountryTranslation;
  }
}
