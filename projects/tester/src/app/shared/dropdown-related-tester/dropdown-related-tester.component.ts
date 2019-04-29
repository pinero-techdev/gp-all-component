import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper-mock-types';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-related-tester',
  templateUrl: './dropdown-related-tester.component.html',
})
export class DropdownRelatedTesterComponent {
  // copy object without reference
  formField = JSON.parse(JSON.stringify(FormFieldMock));
  relatedFields = [];
}
