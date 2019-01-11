export class Traduccion {
  codigoIdioma: string;
  idiomaPais: string;
  idiomaPaisTraduccion: string;

  constructor(lenguageCode, idioma, traduccion) {
    this.codigoIdioma = lenguageCode;
    this.idiomaPais = idioma;
    this.idiomaPaisTraduccion = traduccion;
  }
}
