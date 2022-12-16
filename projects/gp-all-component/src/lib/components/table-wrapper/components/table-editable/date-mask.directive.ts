import { AfterViewInit, Directive, HostListener } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import Inputmask from 'inputmask';

@Directive({
  selector: '[dateMask]',
})
export class DateMaskDirective implements AfterViewInit {
  constructor(private primeCalendar: Calendar) {}

  @HostListener('mouseenter') onMouseEnter() {
    console.log('YES');
    this.ngAfterViewInit();
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('NOO');
  }

  ngAfterViewInit() {
    new Inputmask(this.getDateMask()).mask(this.getHTMLInput());
  }

  getHTMLInput(): HTMLInputElement {
    return this.primeCalendar.el.nativeElement.querySelector('input');
  }

  getDateMask(): string {
    return '99/99/9999';
  }
}
