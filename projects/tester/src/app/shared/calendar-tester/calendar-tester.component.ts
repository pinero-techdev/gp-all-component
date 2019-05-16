import { FormFieldMock } from './../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper.type.mock';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-tester',
  templateUrl: './calendar-tester.component.html',
})
export class CalendarTesterComponent {
  formField = {
    ...FormFieldMock,
    formFieldType: 'gp-form-calendar-field',
    date: '23-05-1998',
    fieldMetadata: {
      ...FormFieldMock.fieldMetadata,
      fieldName: 'date',
    },
  };
}
