import { GPUtil } from '../../services/core/gp-util.service';
import { MultiLanguageModule } from '../../components/multi-language/multi-language.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { TableService } from 'primeng/table';

export const FormWrapperSharedModules = [
  FormsModule,
  ReactiveFormsModule,
  MultiLanguageModule,
  SharedModule,
];

export const FormWrapperSharedProviders = [TableService, GPUtil];
