import { Component } from '@angular/core';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-text-field-tester',
  templateUrl: './text-field-tester.component.html',
})
export class TextFieldTesterComponent {
  formField = {
    ...FormFieldMock,
    formFieldType: 'gp-form-text-field',
    description: 'TEST',
    fieldMetadata: {
      ...FormFieldMock.fieldMetadata,
      fieldName: 'description',
    },
    formControl: {
      ...FormFieldMock.formControl,
      editedRow: {
        description: '',
      },
    },
  };
}
