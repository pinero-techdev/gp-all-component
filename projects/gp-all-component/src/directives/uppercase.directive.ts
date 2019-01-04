import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[gp-uppercase]'
})

export class UppercaseDirective {

  constructor(private el: ElementRef,
              private control: NgControl) {
  }

  @HostListener('input', ['$event']) onEvent($event) {
    this.control.control.setValue(this.el.nativeElement.value.toUpperCase());
  }
}
