import { FormFieldMock } from './../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper-mock-types';
import { Component } from '@angular/core';
import { GpFormControl } from '@lib/components/form-wrapper/resources/form-control.model';

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
