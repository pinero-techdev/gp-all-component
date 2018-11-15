import {Component, Input, OnInit} from "@angular/core";
import {Mensajes} from "../../resources/data/mensajes";
import {Traduccion} from '../../resources/data/traduccion.model';
import {
    MultiIdomaService,
    GetTraduccionesRq,
    UpdateTraduccionesRq
} from "../../services/multi-idioma.service";

export const orderLanguage = ['ES', 'EN', 'FR', 'DE', 'IT', 'PT'];

@Component({
    selector: 'gp-app-multi-idioma',
    templateUrl: './gp.app.multi-idioma.component.html',
    providers: [MultiIdomaService]
})
export class GpAppMultiIdiomaComponent extends Mensajes implements OnInit {
    @Input() tabla: string;
    @Input() pKey: string;
    @Input() esquema: string;
    @Input() campo: string;
    @Input() campoDescripcion: string;
    @Input() habilitarEdicionHTML: boolean;
    @Input() orderByLangCod: boolean = true;
    visualizarTablaTraducciones: boolean;
    visualizarEdicionHTML: boolean;
    traduccionTextoHTML: string;
    traduccionIdiomaHTML: string;
    textoHTML: Traduccion;
    elementosTraducciones: Traduccion[];
    working: boolean = false;

    constructor(private _multiIdiomaService: MultiIdomaService) {
        super();
    }

    ngOnInit() {
        this.visualizarTablaTraducciones = false;
        this.visualizarEdicionHTML = false;
    }

    despliegaTraducciones() {
        if (this.pKey) {
            this.getTraducciones();
        } else {
            this.showErrorAlert("Debe guardar primero el registro para poder insertar o visualizar las traducciones.")
        }
    }

    getTraducciones() {
        let request = new GetTraduccionesRq(this.pKey, this.esquema, this.tabla, this.campo);
        this._multiIdiomaService.getTraducciones(request).subscribe(
            // the first argument is a function which runs on success
            data => {
                if (data.ok) {

                    let traducciones = data.traducciones;
                    if (!this.orderByLangCod) {
                        traducciones = this.ordenarTraducciones(data.traducciones, orderLanguage);
                    }
                    this.elementosTraducciones = traducciones;

                } else if (data.error != null) {
                    console.error(data.error.internalErrorMessage);
                }
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => {
                console.debug('Realizada la carga de las traducciones');
                this.visualizarTablaTraducciones = true;
            }
        );
    }

    ordenarTraducciones(traducciones: Traduccion[], ordenIds: string[]): Traduccion[] {
        let traduccionesOrdenadas: Traduccion[] = [];
        for (let codIdioma of ordenIds) {
            for (let traduccion of traducciones) {
                if (traduccion.codigoIdioma == codIdioma) {
                    traduccionesOrdenadas.push(traduccion);
                    break;
                }
            }
        }
        return traduccionesOrdenadas;
    }

    guardarCambios() {
        this.working = true;
        for (let traduccionesInsertar of this.elementosTraducciones) {
            let request = new UpdateTraduccionesRq(this.pKey, this.esquema, this.tabla, this.campo,
                traduccionesInsertar.codigoIdioma,
                traduccionesInsertar.idiomaPaisTraduccion);
            this._multiIdiomaService.actualizaTraducciones(request).finally(() => {
                this.working = false;
            }).subscribe(
                // the first argument is a function which runs on success
                data => {
                    if (data.ok) {
                    } else if (data.error != null) {
                        console.error(data.error.internalErrorMessage);
                    }
                },
                // the second argument is a function which runs on error
                err => console.error(err),
                // the third argument is a function which runs on completion
                () => console.debug('Realizada la inserccion/actualizacion de la traduccion')
            );
        }
        this.cerrarEdicionTraduccion();
    }

    contieneHtml(traduccion: string): boolean {
        return traduccion != null && (traduccion.indexOf("</") != -1 || traduccion.indexOf("/>") != -1 || traduccion.indexOf("&lt;") != -1 || traduccion.indexOf("&gt;") != -1);
    }

    cerrarEdicionTraduccion() {
        for (let propiedad in this) {
            propiedad = null;
        }
        this.visualizarTablaTraducciones = false;
    }

    mostrarDialogoEdicionHTML(traduccion: Traduccion) {
        this.textoHTML = new Traduccion(traduccion.codigoIdioma, traduccion.idiomaPais, traduccion.idiomaPaisTraduccion != null ? traduccion.idiomaPaisTraduccion : '');
        if (this.habilitarEdicionHTML) {
            this.visualizarTablaTraducciones = false;
            this.visualizarEdicionHTML = true;
            this.traduccionTextoHTML = this.textoHTML.idiomaPaisTraduccion;
            this.traduccionIdiomaHTML = this.textoHTML.idiomaPais;
        }
    }

    guardarCambiosHTML() {
        for (let item in this.elementosTraducciones) {
            if (this.elementosTraducciones[item].idiomaPais == this.traduccionIdiomaHTML) {
                this.elementosTraducciones[item].idiomaPaisTraduccion = this.traduccionTextoHTML;
                this.cerrarEdicionHTML();
            }
        }
    }

    cerrarEdicionHTML() {
        this.visualizarEdicionHTML = false;
        this.visualizarTablaTraducciones = true;
        this.textoHTML = null;
    }

}
