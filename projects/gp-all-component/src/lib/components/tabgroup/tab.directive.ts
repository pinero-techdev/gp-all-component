import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[gpTab]',
})
export class TabDirective {
  @Input()
  tabTitle: string;

  constructor(public template: TemplateRef<any>) {}

  getElementRef() {
    return this.template;
  }
}
