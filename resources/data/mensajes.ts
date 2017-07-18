import {Message} from "primeng/primeng";

/* Añadir a la template del componente que lo extiende
 <p-growl [value]="alerts"></p-growl>
 <p-messages [value]="msgs"></p-messages>
 */
export class Mensajes {

    msgs: Message[] = [];
    alerts: Message[] = [];

    constructor(){
    }

    showInfoMessage(alert: string) {
        this.msgs = []
        this.msgs.push({severity: 'info', summary: 'Info', detail: alert});
    }

    showWarnMessage(alert: string) {
        this.msgs = []
        this.msgs.push({severity: 'warn', summary: 'Atención', detail: alert});
    }

    showErrorMessage(alert: string) {
        this.msgs = []
        this.msgs.push({severity: 'error', summary: 'Error', detail: alert});
    }

    showInfoAlert(alert: string) {
        this.alerts = []
        this.alerts.push({severity: 'info', summary: 'Info', detail: alert});
    }

    showWarnAlert(alert: string) {
        this.alerts = []
        this.alerts.push({severity: 'warn', summary: 'Atención', detail: alert});
    }

    showErrorAlert(alert: string) {
        this.alerts = []
        this.alerts.push({severity: 'error', summary: 'Error', detail: alert});
    }

}
