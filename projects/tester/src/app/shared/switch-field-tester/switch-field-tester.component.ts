import { Component, OnInit } from '@angular/core';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-form-switch-field-tester',
  templateUrl: './form-switch-field-tester.component.html',
  styleUrls: ['./form-switch-field-tester.component.scss'],
})
export class SwitchFieldTesterComponent {
  formField = JSON.parse(JSON.stringify(FormFieldMock));
  constructor() {
    this.formField.fieldMetadata.fieldName = 'ImageField';
  }
}
