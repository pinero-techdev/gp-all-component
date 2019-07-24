import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabviewComponent } from './tabview.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [TabviewComponent],
  imports: [CommonModule, TabViewModule],
  exports: [TabviewComponent],
})
export class TabviewModule {}
