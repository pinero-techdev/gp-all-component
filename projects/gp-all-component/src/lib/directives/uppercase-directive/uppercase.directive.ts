import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[gpUppercase]',
})
export class UppercaseDirective {
  @HostListener('input', ['$event.target', '$event.target.value'])
  onInput(el: any, value: string): void {
    el.value = value.toUpperCase();
  }
}
