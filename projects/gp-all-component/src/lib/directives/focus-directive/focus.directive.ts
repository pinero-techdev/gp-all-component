import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[gpFocus]',
})
export class FocusDirective {
  @HostListener('keydown.enter', ['$event.target']) onEnterKey(el: any) {
    if (!(el instanceof HTMLInputElement)) {
      const input = el.querySelector('input');

      if (input) {
        el = input;
      }
    }

    if (el instanceof HTMLInputElement) {
      el.focus();
    }
  }
}
