import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  constructor(private messageService: MessageService) {}

  showInfoMessage(
    alert: string,
    mKey?: string,
    stickyMessage?: boolean,
    lifeMessage?: number,
    closableMessage?: boolean
  ) {
    this.messageService.add({
      key: mKey,
      severity: 'info',
      summary: 'Info',
      detail: alert,
      sticky: stickyMessage,
      life: lifeMessage,
      closable: closableMessage,
    });
  }

  showWarnMessage(
    alert: string,
    mKey?: string,
    stickyMessage?: boolean,
    lifeMessage?: number,
    closableMessage?: boolean
  ) {
    this.messageService.add({
      key: mKey,
      severity: 'warn',
      summary: 'Atención',
      detail: alert,
      sticky: stickyMessage,
      life: lifeMessage,
      closable: closableMessage,
    });
  }

  showErrorMessage(
    alert: string,
    mKey?: string,
    stickyMessage?: boolean,
    lifeMessage?: number,
    closableMessage?: boolean
  ) {
    this.messageService.add({
      key: mKey,
      severity: 'error',
      summary: 'Error',
      detail: alert,
      sticky: stickyMessage,
      life: lifeMessage,
      closable: closableMessage,
    });
  }

  showSuccessMessage(
    alert: string,
    mKey: string,
    stickyMessage?: boolean,
    lifeMessage?: number,
    closableMessage?: boolean
  ) {
    this.messageService.add({
      key: mKey,
      severity: 'success',
      summary: 'Success',
      detail: alert,
      sticky: stickyMessage,
      life: lifeMessage,
      closable: closableMessage,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
