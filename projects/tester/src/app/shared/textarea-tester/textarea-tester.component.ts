import { FormFieldMock } from './../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper.type.mock';
import { Component } from '@angular/core';

@Component({
  selector: 'app-textarea-tester',
  templateUrl: './textarea-tester.component.html',
})
export class TextareaTesterComponent {
  // copy object with no reference
  formField = JSON.parse(JSON.stringify(FormFieldMock));
  constructor() {
    this.formField.formFieldType = 'gp-form-textarea-field';
    this.formField.field = 'description';
    this.formField.fieldMetadata.fieldName = 'description';
  }
}
