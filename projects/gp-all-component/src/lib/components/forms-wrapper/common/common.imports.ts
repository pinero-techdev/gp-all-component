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
import { MultiIdiomaModule } from '../../multi-idioma/multi-idioma.module';
import { TableService } from '@lib/services/api/table/table.service';

export const FormsWrapperCommonModules = [
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

export const FormsWrapperCommonProviders = [TableService, GPUtil];
