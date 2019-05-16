import { MultiLanguageComponent } from '@lib/components/multi-language/multi-language.component';
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
  description: string;
  isEditing = false;
  orderByLangCod = true;
}
