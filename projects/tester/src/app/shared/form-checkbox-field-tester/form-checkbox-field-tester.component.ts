import { Component } from '@angular/core';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-form-checkbox-field-tester',
  templateUrl: './form-checkbox-field-tester.component.html',
})
export class FormCheckboxFieldTesterComponent {
  formField = {
    ...FormFieldMock,
    fieldMetadata: {
      ...FormFieldMock.fieldMetadata,
      displayInfo: {
        ...FormFieldMock.fieldMetadata.displayInfo,
        checkedValue: 'true',
        uncheckedValue: 'false',
      },
    },
  };
}
