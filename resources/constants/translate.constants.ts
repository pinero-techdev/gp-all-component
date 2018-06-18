// Use the @Injectable decorator for your Constants class
import {Injectable} from '@angular/core';

@Injectable()
export class TranslateConstants {

    private static idiomasSoportados:any = [
        {
            "codigo": "es",
            "literal": "espanol"
        },
        {
            "codigo": "en",
            "literal": "ingles"
        },
        {
            "codigo": "fr",
            "literal": "frances"
        },
        {
            "codigo": "de",
            "literal": "aleman"
        },
        {
            "codigo": "it",
            "literal": "italiano"
        },
        {
            "codigo": "pt",
            "literal": "portugues"
        },

    ];

    private static idiomaDefecto:string = "es";

    public static getIdiomasSoportados() {
        return this.idiomasSoportados;
    }

    public static getIdiomaDefecto() {
        return this.idiomaDefecto;
    }
}