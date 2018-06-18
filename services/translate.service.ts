import {Injectable} from '@angular/core';
import {dictionary} from '../resources/data/translation';

@Injectable()
export class TranslateService {
    private _currentLang:string;
    private _translations:any;

    public get currentLang() {
        return this._currentLang;
    }

    // inject our translations
    constructor() {
        this._translations = dictionary;
    }

    public use(lang:string):void {
        // set current language
        this._currentLang = lang;
    }

    private translate(key:string):string {
        // private perform translation
        let translation = key;
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key:string) {
        // call translation
        let translate:string = this.translate(key);
        let result:string = key;
        if (translate) {
            result = translate;
        }
        return result;
    }
}