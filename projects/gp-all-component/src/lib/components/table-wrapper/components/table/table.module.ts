import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimeTableModule } from 'primeng/table';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, PrimeTableModule],
  exports: [TableComponent],
})
export class TableModule {}
