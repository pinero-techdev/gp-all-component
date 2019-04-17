import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { LoadingIndicatorModule } from '@lib/components/loading-indicator/loading-indicator.module';
import { FormsWrapperModule } from '@lib/components/forms-wrapper/forms-wrapper.module';
import { TableService } from '@lib/services/api/table/table.service';
import { GPUtil } from '@lib/services/core/gp-util.service';
import { MessagesService } from '@lib/services/core/messages.service';
import { MessageService } from 'primeng/api';

export const TableWrapperCommonModules = [
    ToastModule,
    TableModule,
    LoadingIndicatorModule,
    FormsWrapperModule,
];

export const TableWrapperCommonProviders = [TableService, GPUtil, MessagesService, MessageService];
