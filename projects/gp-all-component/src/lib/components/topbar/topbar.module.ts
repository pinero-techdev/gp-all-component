import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
