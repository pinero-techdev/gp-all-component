import {Directive, HostListener, Input} from "@angular/core";

@Directive({
    selector: '[gp-focus]'
})

export class FocusDirective {
    @Input() elementToFocus: any;

    @HostListener('keydown.enter', ['$event']) onEnterKey() {
        let el = this.elementToFocus;
        if (!(this.elementToFocus instanceof HTMLInputElement)) {
            let input = this.elementToFocus.el.nativeElement.querySelector('input');
            if (input) el = input;
        }
        if (el instanceof HTMLInputElement)
            el.focus();
    }
}