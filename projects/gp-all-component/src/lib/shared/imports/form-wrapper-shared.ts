import { GPUtil } from './../../services/core/gp-util.service';
import { MultiLanguageModule } from './../../components/multi-language/multi-language.module';

import {
  CalendarModule,
  CheckboxModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { TableService } from 'primeng/table';

export const FormWrapperSharedModules = [
  CalendarModule,
  CheckboxModule,
  DropdownModule,
  FormsModule,
  ReactiveFormsModule,
  InputTextModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  MultiLanguageModule,
  SharedModule,
];

export const FormWrapperSharedProviders = [TableService, GPUtil];
