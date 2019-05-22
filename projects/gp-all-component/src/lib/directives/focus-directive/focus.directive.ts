import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[gpFocus]',
})
export class FocusDirective {
  @HostListener('keydown.enter', ['$event.target']) onEnterKey(el: any) {
    const isInput = el instanceof HTMLInputElement;

    if (isInput) {
      el.focus();
    }
  }
}
