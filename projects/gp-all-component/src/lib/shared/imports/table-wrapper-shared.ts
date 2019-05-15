import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { LoadingIndicatorModule } from './../../components/loading-indicator/loading-indicator.module';
import { FormWrapperModule } from './../../components/form-wrapper/form-wrapper.module';
import { TableService } from './../../services/api/table/table.service';
import { GPUtil } from './../../services/core/gp-util.service';
import { MessagesService } from './../../services/core/messages.service';
import { MessageService } from 'primeng/api';

export const TableWrapperSharedModules = [
  ToastModule,
  TableModule,
  LoadingIndicatorModule,
  FormWrapperModule,
];

export const TableWrapperSharedProviders = [TableService, GPUtil, MessagesService, MessageService];
