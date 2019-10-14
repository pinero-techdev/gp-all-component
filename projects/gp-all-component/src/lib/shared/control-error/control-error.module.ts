import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from './control-error.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/primeng';

@NgModule({
  declarations: [ControlErrorComponent],
  imports: [CommonModule, MessageModule, MessagesModule],
  exports: [ControlErrorComponent],
})
export class ControlErrorModule {}
