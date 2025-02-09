import { MultiLanguageModule } from './../../components/multi-language/multi-language.module';
import { SharedModule } from './../shared.module';
import { FormWrapperModule } from './../../components/form-wrapper/form-wrapper.module';
import { GPUtil } from './../../services/core/gp-util.service';
import { LoadingIndicatorModule } from './../../components/loading-indicator/loading-indicator.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesService } from './../../services/core/messages.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { TableEditableCellComponent } from '../../components/table-wrapper/components/table-editable-crud/components/table-editable-cell/table-editable-cell.component';
import { TableMetadataService } from '../../services/api/table/table-metadata.service';
import { TableModule } from 'primeng/table';
import { TableService } from './../../services/api/table/table.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from '../../components/button/button.module';

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
  { provide: NG_VALUE_ACCESSOR, useExisting: TableEditableCellComponent, multi: true },
  ConfirmationService,
  GPUtil,
  MessageService,
  MessagesService,
  Paginator,
  TableMetadataService,
  TableService,
];
