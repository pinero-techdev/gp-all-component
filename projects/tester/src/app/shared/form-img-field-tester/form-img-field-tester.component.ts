import { Component, OnInit } from '@angular/core';
import { FormFieldMock } from '../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper.type.mock';

@Component({
  selector: 'app-form-img-field-tester',
  templateUrl: './form-img-field-tester.component.html',
  styleUrls: ['./form-img-field-tester.component.scss'],
})
export class FormImgFieldTesterComponent implements OnInit {
  formField = JSON.parse(JSON.stringify(FormFieldMock));
  constructor() {
    // this is intentional
  }

  ngOnInit() {
    // this is intentional
  }
}
