import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';

/* Añadir a la template del componente que lo extiende
 <p-toast></p-toast>
 <p-messages [value]="msgs"></p-messages>
 */
export abstract class MensajesComponent {
    msgs: Message[] = [];

    constructor(protected messageService: MessageService) {}

    showInfoMessage(alert: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info', detail: alert });
    }

    showWarnMessage(alert: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Atención', detail: alert });
    }

    showErrorMessage(alert: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: alert });
    }

    showSuccessMessage(alert: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success', detail: alert });
    }

    showInfoAlert(alert: string) {
        this.messageService.clear();
        this.messageService.add({ severity: 'info', summary: 'Info', detail: alert });
    }

    showWarnAlert(alert: string) {
        this.messageService.clear();
        this.messageService.add({ severity: 'warn', summary: 'Atención', detail: alert });
    }

    showErrorAlert(alert: string) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: alert });
    }

    showSuccessAlert(alert: string) {
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: alert });
    }
}
