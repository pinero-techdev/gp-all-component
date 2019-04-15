import { LANGUAGE_ORDER } from './../../resources/constants/language-order.constant';
import { MultiLanguageService } from './../../services/api/multi-language/multi-language.service';
import {
    GetTraduccionesRq,
    UpdateTraduccionesRq,
} from '../../services/api/multi-language/multi-language.service';
import { Component, OnInit, Input } from '@angular/core';
import { Traduccion } from '../../resources/data/traduccion.model';
import { finalize } from 'rxjs/operators';
import { MessagesService } from '../../services/core/messages/messages.service';

@Component({
    selector: 'gp-multi-language',
    templateUrl: './multi-language.component.html',
    styleUrls: ['./multi-language.component.scss'],
})
export class MultiLanguageComponent implements OnInit {
    @Input() table: string;
    @Input() pKey: string;
    @Input() schema: string;
    @Input() field: string;
    @Input() description: string;
    @Input() isEditing: boolean;
    @Input() orderByLangCod = true;
    showTranslations: boolean;
    showHTMLEditor: boolean;
    currentTextHTML: string;
    currentLanguageHTML: string;
    text: Traduccion;
    translations: Traduccion[];
    working = false;

    constructor(
        private multiLanguageService: MultiLanguageService,
        private messagesService: MessagesService
    ) {}

    ngOnInit() {
        this.showTranslations = false;
        this.showHTMLEditor = false;
    }

    prepareTranslations() {
        if (this.pKey) {
            this.getTranslations();
        } else {
            this.messagesService.showErrorAlert(
                'Debe guardar primero el registro para ' +
                    'poder insertar o visualizar las traducciones.'
            );
        }
    }

    getTranslations() {
        const request = new GetTraduccionesRq(this.pKey, this.schema, this.table, this.field);
        this.multiLanguageService.getTranslations(request).subscribe(
            (data: any) => {
                if (data.ok) {
                    let traducciones = data.traducciones;
                    if (!this.orderByLangCod) {
                        traducciones = this.orderTranslations(data.traducciones, LANGUAGE_ORDER);
                    }
                    this.translations = traducciones;
                } else if (data.error != null) {
                    console.error(data.error.internalErrorMessage);
                }
            },
            (err) => console.error(err),
            () => {
                this.showTranslations = true;
            }
        );
    }

    orderTranslations(traducciones: Traduccion[], ordenIds: string[]): Traduccion[] {
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

    save() {
        this.working = true;
        for (const item of this.translations) {
            const request = new UpdateTraduccionesRq(
                this.pKey,
                this.schema,
                this.table,
                this.field,
                item.codigoIdioma,
                item.idiomaPaisTraduccion
            );
            this.multiLanguageService
                .updateTranslations(request)
                .pipe(
                    finalize(() => {
                        this.working = false;
                    })
                )
                .subscribe(
                    (data: any) => {
                        if (data.ok) {
                            // TODO:
                        } else if (data.error != null) {
                            console.error(data.error.internalErrorMessage);
                        }
                    },
                    (err) => console.error(err)
                );
        }
        this.hideTranslations();
    }

    hasHTMLContent(traduccion: string): boolean {
        return (
            traduccion != null &&
            (traduccion.indexOf('</') !== -1 ||
                traduccion.indexOf('/>') !== -1 ||
                traduccion.indexOf('&lt;') !== -1 ||
                traduccion.indexOf('&gt;') !== -1)
        );
    }

    hideTranslations() {
        this.showTranslations = false;
    }

    showEditorHTMLDialog(traduccion: Traduccion) {
        this.text = new Traduccion(
            traduccion.codigoIdioma,
            traduccion.idiomaPais,
            traduccion.idiomaPaisTraduccion != null ? traduccion.idiomaPaisTraduccion : ''
        );
        if (this.isEditing) {
            this.showTranslations = false;
            this.showHTMLEditor = true;
            this.currentTextHTML = this.text.idiomaPaisTraduccion;
            this.currentLanguageHTML = this.text.idiomaPais;
        }
    }

    saveHTML() {
        for (const item in this.translations) {
            if (this.translations[item].idiomaPais === this.currentLanguageHTML) {
                this.translations[item].idiomaPaisTraduccion = this.currentTextHTML;
                this.closeHTMLEditor();
            }
        }
    }

    closeHTMLEditor() {
        this.showHTMLEditor = false;
        this.showTranslations = true;
        this.text = null;
    }
}
