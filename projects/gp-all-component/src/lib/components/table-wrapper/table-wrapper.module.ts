import { TableEditableCrudComponent } from './components/table-editable-crud/table-editable-crud.component';
import { TableEditableComponent } from './components/table-editable-crud/components/table-editable/table-editable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { TableFrameComponent } from './components/table-frame/table-frame.component';
import {
  TableWrapperSharedModules,
  TableWrapperSharedProviders,
} from '../../shared/imports/table-wrapper-shared';
import { HttpClientModule } from '@angular/common/http';
import { TableEditableCellComponent } from './components/table-editable-crud/components/table-editable-cell/table-editable-cell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableMetadataService } from '../../services/api/table/table-metadata.service';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [
    TableCrudComponent,
    TableEditableComponent,
    TableEditableCrudComponent,
    TableEditableCellComponent,
    TableFrameComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableWrapperSharedModules,
    DynamicFormModule,
  ],
  providers: [TableWrapperSharedProviders, TableMetadataService],
  exports: [
    TableCrudComponent,
    TableEditableComponent,
    TableEditableCrudComponent,
    TableEditableCellComponent,
    TableFrameComponent,
  ],
})
export class TableWrapperModule {}
