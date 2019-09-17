import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gpColumn]',
})
export class ColumnTemplateDirective {
  @Input('gpColumn') field: string;

  constructor(public template: TemplateRef<any>) {}

  getKey(): string {
    return this.field;
  }
}
