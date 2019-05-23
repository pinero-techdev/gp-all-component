import { MultiLanguageComponent } from 'gp-all-component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-multi-language-tester',
  templateUrl: './multi-language-tester.component.html',
})
export class MultiLanguageTesterComponent {
  @ViewChild(MultiLanguageComponent) component: MultiLanguageComponent;
  table = 'CD_EDPT';
  pKey = 'AALL';
  schema = 'HOTCAL';
  field = 'EDPT_DESC';
  description = 'Departamento';
  isEditing = false;
  orderByLangCod = true;
}
