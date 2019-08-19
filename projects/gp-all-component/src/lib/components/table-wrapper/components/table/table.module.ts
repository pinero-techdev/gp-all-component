import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { RowComponent } from './row/row.component';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';
import { MemoPipeModule } from '../../../../pipes/memo-pipe/memo.pipe.module';
import { IsNilPipeModule } from '../../../../pipes/is-nil-pipe/is-nil.pipe.module';

@NgModule({
  declarations: [
    TableComponent,
    RowComponent,
    ColumnTemplateDirective,
    EditableColumnTemplateDirective,
  ],
  imports: [CommonModule, PrimeTableModule, MemoPipeModule, IsNilPipeModule],
  exports: [TableComponent, ColumnTemplateDirective, EditableColumnTemplateDirective],
})
export class TableModule {}
