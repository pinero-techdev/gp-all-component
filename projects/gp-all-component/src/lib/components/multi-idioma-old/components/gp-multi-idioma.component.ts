import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Traduccion } from '../../../resources/data/traduccion.model';
import {
    GetTraduccionesRq,
    MultiIdomaService,
    UpdateTraduccionesRq,
} from '../../../services/multi-idioma.service';
import { LANGUAGE_ORDER } from '../constants/language-order.constant';
import { MessageService } from 'primeng/primeng';

@Component({
    selector: 'gp-multi-idioma-old',
    templateUrl: './gp-multi-idioma.component.html',
    providers: [MultiIdomaService],
})
export class GpMultiIdiomaComponent implements OnInit {
    @Input() tabla: string;
    @Input() pKey: string;
    @Input() esquema: string;
    @Input() campo: string;
    @Input() campoDescripcion: string;
    @Input() habilitarEdicionHTML: boolean;
    @Input() orderByLangCod = true;
    visualizarTablaTraducciones: boolean;
    visualizarEdicionHTML: boolean;
    traduccionTextoHTML: string;
    traduccionIdiomaHTML: string;
    textoHTML: Traduccion;
    elementosTraducciones: Traduccion[];
    working = false;

    constructor(
        private _multiIdiomaService: MultiIdomaService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.visualizarTablaTraducciones = false;
        this.visualizarEdicionHTML = false;
    }

    despliegaTraducciones() {
        if (this.pKey) {
            this.getTraducciones();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                    'Debe guardar primero el registro para poder ' +
                    'insertar o visualizar las traducciones.',
            });
        }
    }

    getTraducciones() {
        const request = new GetTraduccionesRq(
            this.pKey,
            this.esquema,
            this.tabla,
            this.campo
        );
        this._multiIdiomaService.getTraducciones(request).subscribe(
            (data) => {
                if (data.ok) {
                    let traducciones = data.traducciones;
                    if (!this.orderByLangCod) {
                        traducciones = this.ordenarTraducciones(
                            data.traducciones,
                            LANGUAGE_ORDER
                        );
                    }
                    this.elementosTraducciones = traducciones;
                } else if (data.error != null) {
                    console.error(data.error.internalErrorMessage);
                }
            },
            (err) => console.error(err),
            () => {
                this.visualizarTablaTraducciones = true;
            }
        );
    }

    ordenarTraducciones(
        traducciones: Traduccion[],
        ordenIds: string[]
    ): Traduccion[] {
        const traduccionesOrdenadas: Traduccion[] = [];
        for (const codIdioma of ordenIds) {
            for (const traduccion of traducciones) {
                if (traduccion.codigoIdioma === codIdioma) {
                    traduccionesOrdenadas.push(traduccion);
                    break;
                }
            }
        }
        return traduccionesOrdenadas;
    }

    guardarCambios() {
        this.working = true;
        for (const traduccionesInsertar of this.elementosTraducciones) {
            const request = new UpdateTraduccionesRq(
                this.pKey,
                this.esquema,
                this.tabla,
                this.campo,
                traduccionesInsertar.codigoIdioma,
                traduccionesInsertar.idiomaPaisTraduccion
            );
            this._multiIdiomaService
                .actualizaTraducciones(request)
                .pipe(
                    finalize(() => {
                        this.working = false;
                    })
                )
                .subscribe(
                    (data) => {
                        if (data.ok) {
                        } else if (data.error != null) {
                            console.error(data.error.internalErrorMessage);
                        }
                    },
                    (err) => console.error(err)
                );
        }
        this.cerrarEdicionTraduccion();
    }

    contieneHtml(traduccion: string): boolean {
        return (
            traduccion != null &&
            (traduccion.indexOf('</') !== -1 ||
                traduccion.indexOf('/>') !== -1 ||
                traduccion.indexOf('&lt;') !== -1 ||
                traduccion.indexOf('&gt;') !== -1)
        );
    }

    cerrarEdicionTraduccion() {
        for (let propiedad in this) {
            propiedad = null;
        }
        this.visualizarTablaTraducciones = false;
    }

    mostrarDialogoEdicionHTML(traduccion: Traduccion) {
        this.textoHTML = new Traduccion(
            traduccion.codigoIdioma,
            traduccion.idiomaPais,
            traduccion.idiomaPaisTraduccion != null
                ? traduccion.idiomaPaisTraduccion
                : ''
        );
        if (this.habilitarEdicionHTML) {
            this.visualizarTablaTraducciones = false;
            this.visualizarEdicionHTML = true;
            this.traduccionTextoHTML = this.textoHTML.idiomaPaisTraduccion;
            this.traduccionIdiomaHTML = this.textoHTML.idiomaPais;
        }
    }

    guardarCambiosHTML() {
        for (const item in this.elementosTraducciones) {
            if (
                this.elementosTraducciones[item].idiomaPais ===
                this.traduccionIdiomaHTML
            ) {
                this.elementosTraducciones[
                    item
                ].idiomaPaisTraduccion = this.traduccionTextoHTML;
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
