import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { TableFrameComponent } from './components/table-frame/table-frame.component';
import {
  TableWrapperSharedModules,
  TableWrapperSharedProviders,
} from '../../shared/imports/table-wrapper-shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TableCrudComponent, TableFrameComponent],
  imports: [CommonModule, HttpClientModule, TableWrapperSharedModules],
  exports: [TableCrudComponent, TableFrameComponent],
  providers: [TableWrapperSharedProviders],
})
export class TableWrapperModule {}
