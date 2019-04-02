import { LanguageApiService } from '../../services-2/api/language/language-api.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'gp-multi-idioma',
    templateUrl: './multi-idioma.component.html',
    styleUrls: ['./multi-idioma.component.scss'],
})
export class MultiIdiomaComponent {
    public headerTitle = 'Mantenimiento traducciones';
    public isVisible = true;

    @Input() campoDescripcion = '';

    constructor(private languageService: LanguageApiService){}

    public showTranslations() {
        console.info('hello');
        this.languageService.getLanguages().subscribe(data => {debugger;});
    }
}