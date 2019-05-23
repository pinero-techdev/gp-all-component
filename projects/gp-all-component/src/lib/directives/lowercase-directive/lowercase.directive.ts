import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[gpLowercase]',
})
export class LowercaseDirective {
  @HostListener('input', ['$event.target', '$event.target.value'])
  onEvent(el: any, value: string): void {
    el.value = value.toLowerCase();
  }
}
