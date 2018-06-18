import {TranslateConstants} from '../constants/translate.constants';
import {TranslatePipe} from "../pipes/translate.pipe";
import {Mensajes} from "../data/mensajes";

export abstract class Translate extends Mensajes {
    idiomasSoportados:any;
    idioma:string;
    idiomaDefecto:string;

    constructor() {
        super();
        this.idiomasSoportados = TranslateConstants.getIdiomasSoportados();
        this.idiomaDefecto = TranslateConstants.getIdiomaDefecto();
    }

    selectLang() {
        //Solo tenemos en y es, si es diferente metemos es por defecto
        if (!this.idioma) {
            this.idioma = this.idiomaDefecto;
        }
        let encontrado:boolean = false;
        for (let idioma of this.idiomasSoportados) {
            if (idioma.codigo === this.idioma) {
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            this.idioma = this.idiomaDefecto;
        }
        // set current lang;
        this.getTranslate().use(this.idioma);
    }

    abstract getTranslate():TranslatePipe;
}
