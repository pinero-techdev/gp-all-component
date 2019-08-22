import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewComponent } from './tabview/tabview.component';
import { TabViewModule } from 'primeng/tabview';
import { TabDirective } from './tab.directive';

@NgModule({
  declarations: [TabViewComponent, TabDirective],
  imports: [CommonModule, TabViewModule],
  exports: [TabViewComponent, TabDirective],
})
export class TabGroupModule {}
