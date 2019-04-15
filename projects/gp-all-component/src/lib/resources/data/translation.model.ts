export class Translation {
    langCode: string;
    langCountry: string;
    langCountryTranslation: string;

    constructor(langCode: string, langCountry: string, langCountryTranslation: string) {
        this.langCode = langCode;
        this.langCountry = langCountry;
        this.langCountryTranslation = langCountryTranslation;
    }
}
