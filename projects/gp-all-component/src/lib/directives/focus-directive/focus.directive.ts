import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[gpFocus]',
})
export class FocusDirective {
  @Input() elementToFocus: any;
  @HostListener('keydown.enter', ['$event.target']) onEnterKey(el: any) {
    const $input = this.elementToFocus ? this.elementToFocus : el;
    const isInput = $input instanceof HTMLInputElement;
    if (!!$input && isInput) {
      $input.focus ? $input.focus() : $input.querySelector('input').focus();
    }
  }
}
