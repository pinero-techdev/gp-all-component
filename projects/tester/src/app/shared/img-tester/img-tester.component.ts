import { Component } from '@angular/core';
import { FormFieldMock } from '../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-img-tester',
  templateUrl: './img-tester.component.html',
  styleUrls: ['./img-tester.component.scss'],
})
export class ImgTesterComponent {
  formField = JSON.parse(JSON.stringify(FormFieldMock));

  constructor() {
    this.formField.fieldMetadata.fieldName = 'ImageField';
  }
}
