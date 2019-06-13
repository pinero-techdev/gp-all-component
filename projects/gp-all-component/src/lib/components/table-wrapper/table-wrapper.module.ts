import { TableEditableComponent } from './components/table-editable/table-editable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { TableFrameComponent } from './components/table-frame/table-frame.component';
import {
  TableWrapperSharedModules,
  TableWrapperSharedProviders,
} from '../../shared/imports/table-wrapper-shared';
import { HttpClientModule } from '@angular/common/http';
import { TableEditableRowComponent } from './components/table-editable/components/table-editable-row/table-editable-row.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableMetadataService } from '../../services/api/table/table-metadata.service';

@NgModule({
  declarations: [
    TableCrudComponent,
    TableEditableComponent,
    TableEditableRowComponent,
    TableFrameComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableWrapperSharedModules,
  ],
  providers: [TableWrapperSharedProviders, TableMetadataService],
  exports: [
    TableCrudComponent,
    TableEditableComponent,
    TableEditableRowComponent,
    TableFrameComponent,
  ],
})
export class TableWrapperModule {}
