export class Traduccion {
    codigoIdioma: string;
    idiomaPais: string;
    idiomaPaisTraduccion: string;

    constructor(codigoIdioma: string, idiomaPais: string, idiomaPaisTraduccion: string) {
        this.codigoIdioma = codigoIdioma;
        this.idiomaPais = idiomaPais;
        this.idiomaPaisTraduccion = idiomaPaisTraduccion;
    }
}
