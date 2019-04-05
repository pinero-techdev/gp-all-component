import {
    MultiIdiomaComponent, //
} from '@lib/components/multi-idioma/multi-idioma.component';
import { Component, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'app-multi-idioma-tester',
    templateUrl: './multi-idioma-tester.component.html',
    styleUrls: ['./multi-idioma-tester.component.scss'],
})
export class MultiIdiomaTesterComponent {
    @ViewChild(MultiIdiomaComponent) component: MultiIdiomaComponent;
    @Input() tabla: string;
    @Input() pKey: string;
    @Input() schema: string;
    @Input() campo: string;
    @Input() campoDescripcion: string;
    @Input() habilitarEdicionHTML: boolean;
    @Input() orderByLangCod = true;
}
