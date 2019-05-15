import { Component } from '@angular/core';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-wysiwyg-tester',
  templateUrl: './wysiwyg-tester.component.html',
  styleUrls: ['./wysiwyg-tester.component.scss'],
})
export class WysiwygTesterComponent {
  formField = JSON.parse(JSON.stringify(FormFieldMock));

  constructor() {
    this.formField.fieldMetadata.fieldName = 'WysiwygField';
  }
}
