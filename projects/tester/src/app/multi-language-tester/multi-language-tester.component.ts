import { MultiLanguageComponent } from '@lib/components/multi-language/multi-language.component';
import { Component, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'app-multi-language-tester',
    templateUrl: './multi-language-tester.component.html',
    styleUrls: ['./multi-language-tester.component.scss'],
})
export class MultiLanguageTesterComponent {
    @ViewChild(MultiLanguageComponent) component: MultiLanguageComponent;
    @Input() tabla: string;
    @Input() pKey: string;
    @Input() schema: string;
    @Input() campo: string;
    @Input() campoDescripcion: string;
    @Input() habilitarEdicionHTML: boolean;
    @Input() orderByLangCod = true;
}
