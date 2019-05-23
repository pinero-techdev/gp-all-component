export class Translation {
  idiomaCodigo: string;
  idiomaPais: string;
  idiomaPaisTraduccion: string;

  constructor(langCode: string, langCountry: string, langCountryTranslation: string) {
    this.idiomaCodigo = langCode;
    this.idiomaPais = langCountry;
    this.idiomaPaisTraduccion = langCountryTranslation;
  }
}
