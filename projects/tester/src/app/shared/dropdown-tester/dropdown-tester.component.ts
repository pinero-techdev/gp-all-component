import { FormFieldMock } from './../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper-mock-types';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-tester',
  templateUrl: './dropdown-tester.component.html',
  styleUrls: ['./dropdown-tester.component.scss'],
})
export class DropdownTesterComponent {
  // copy object without reference
  formField = JSON.parse(JSON.stringify(FormFieldMock));
  formField2 = JSON.parse(JSON.stringify(FormFieldMock));

  constructor() {
    this.formField2.fieldMetadata.displayInfo.options = [];
    this.formField2.fieldMetadata.displayInfo.referencedTable = 'Table II';
  }
}
