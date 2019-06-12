import { MultiLanguageModule } from './../../components/multi-language/multi-language.module';
import { SharedModule } from './../shared.module';
import { ButtonModule } from 'primeng/button';
import { FormWrapperModule } from './../../components/form-wrapper/form-wrapper.module';
import { GPUtil } from './../../services/core/gp-util.service';
import { LoadingIndicatorModule } from './../../components/loading-indicator/loading-indicator.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesService } from './../../services/core/messages.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { TableEditableRowComponent } from './../../components/table-wrapper/components/table-editable/components/table-editable-row/table-editable-row.component';
import { TableMetadataService } from '../../services/api/table/table-metadata.service';
import { TableModule } from 'primeng/table';
import { TableService } from './../../services/api/table/table.service';
import { ToastModule } from 'primeng/toast';

export const TableWrapperSharedModules = [
  ButtonModule,
  FormWrapperModule,
  LoadingIndicatorModule,
  SharedModule,
  TableModule,
  ToastModule,
  MultiLanguageModule,
];

export const TableWrapperSharedProviders = [
  { provide: NG_VALUE_ACCESSOR, useExisting: TableEditableRowComponent, multi: true },
  ConfirmationService,
  GPUtil,
  MessageService,
  MessagesService,
  Paginator,
  TableMetadataService,
  TableService,
];
