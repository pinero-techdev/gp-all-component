import { FormFieldMock } from './../../../../../gp-all-component/src/lib/shared/testing/@mock/types/form-wrapper-mock-types';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown-tester',
    templateUrl: './dropdown-tester.component.html',
    styleUrls: ['./dropdown-tester.component.scss'],
})
export class DropdownTesterComponent {
    formField = FormFieldMock;
}
