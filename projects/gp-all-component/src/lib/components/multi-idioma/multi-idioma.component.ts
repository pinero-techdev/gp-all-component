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

    public showTranslations() {
        console.info('hello');
    }
}