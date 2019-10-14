import { GPUtil } from '../../services/core/gp-util.service';
import { MultiLanguageModule } from '../../components/multi-language/multi-language.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { TableService } from 'primeng/table';
import { FileUploadModule, KeyFilterModule, SliderModule } from 'primeng/primeng';

export const FormWrapperSharedModules = [
  FormsModule,
  ReactiveFormsModule,
  MultiLanguageModule,
  SharedModule,
  KeyFilterModule,
  FileUploadModule,
  SliderModule,
];

export const FormWrapperSharedProviders = [TableService, GPUtil];
