import { MultiLanguageComponent } from '@lib/components/multi-language/multi-language.component';
import { Component, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'app-multi-language-tester',
    templateUrl: './multi-language-tester.component.html',
})
export class MultiLanguageTesterComponent {
    @ViewChild(MultiLanguageComponent) component: MultiLanguageComponent;
    @Input() table: string;
    @Input() pKey: string;
    @Input() schema: string;
    @Input() field: string;
    @Input() description = 'Test description';
    @Input() isEditing = false;
    @Input() orderByLangCod = true;
}
