import { Component } from '@angular/core';
import { GpFormControl } from '@lib/components/form-wrapper/resources/form-control.model';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-form-checkbox-field-tester',
  templateUrl: './form-checkbox-field-tester.component.html',
})
export class FormCheckboxFieldTesterComponent {
  formField = JSON.parse(JSON.stringify(FormFieldMock));

  constructor() {
    this.formField.formFieldType = 'gp-form-checkbox-field';
    // this.formField.field = 'cansCodi'; HAY QUE CAMBIAR ESTO NO????
    this.formField.formControl.editedRow = {};
  }
}
