import { Component } from '@angular/core';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-time-field-tester',
  templateUrl: './time-field-tester.component.html',
})
export class TimeFieldTesterComponent {
  formField = {
    ...FormFieldMock,
    formFieldType: 'gp-form-time-field',
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
