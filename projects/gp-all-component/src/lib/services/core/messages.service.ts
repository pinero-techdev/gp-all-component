import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  msgs: Message[] = [];

  constructor(private messageService: MessageService) {}

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

  clear() {
    this.messageService.clear();
    this.msgs = [];
  }
}
