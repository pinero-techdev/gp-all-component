import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gpEditableColumn]',
})
export class EditableColumnTemplateDirective {
  @Input('gpEditableColumn') key: string;

  constructor(public template: TemplateRef<any>) {}

  getKey(): string {
    return this.key;
  }
}
