import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { IsNilPipe } from './pipes/is-nil.pipe';
import { RowComponent } from './row/row.component';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';

@NgModule({
  declarations: [
    TableComponent,
    ColumnTemplateDirective,
    IsNilPipe,
    RowComponent,
    EditableColumnTemplateDirective,
  ],
  imports: [CommonModule, PrimeTableModule],
  exports: [TableComponent, ColumnTemplateDirective, EditableColumnTemplateDirective],
})
export class TableModule {}
