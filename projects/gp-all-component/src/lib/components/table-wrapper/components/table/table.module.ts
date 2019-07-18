import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { ColumnTemplateDirective } from './column-template.directive';
import { IsNilPipe } from './is-nil.pipe';

@NgModule({
  declarations: [TableComponent, ColumnTemplateDirective, IsNilPipe],
  imports: [CommonModule, PrimeTableModule],
  exports: [TableComponent, ColumnTemplateDirective],
})
export class TableModule {}
