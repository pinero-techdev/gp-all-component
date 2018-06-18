import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '../../services/translate.service';

@Pipe({
    name: 'translate',
    pure: false
})

export class TranslatePipe implements PipeTransform {

    constructor(private _translate:TranslateService) {
    }

    transform(value:string, args?:any[]):any {
        if (!value) return;
        let translate = this._translate.instant(value);
        if (args && args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                translate = translate.replace(`{${i + 1}}`, args[i]);
            }
        }
        return translate;
    }

    use(val) {
        this._translate.use(val);
    }
}