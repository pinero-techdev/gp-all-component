import { GPUtil } from '@lib/services/core/gp-util.service';
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
import { TableService } from '@lib/services/api/table/table.service';
import { MultiIdiomaModule } from '@lib/components/multi-idioma/multi-idioma.module';

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
  MultiIdiomaModule,
];

export const FormWrapperSharedProviders = [TableService, GPUtil];
