import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gpColumn]',
})
export class ColumnTemplateDirective {
  @Input('gpColumn') key: string;

  constructor(public template: TemplateRef<any>) {}

  getKey(): string {
    return this.key;
  }
}
