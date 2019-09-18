import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gpEditableColumn]',
})
export class EditableColumnTemplateDirective {
  @Input('gpEditableColumn') field: string;

  constructor(public template: TemplateRef<any>) {}

  getKey(): string {
    return this.field;
  }
}
