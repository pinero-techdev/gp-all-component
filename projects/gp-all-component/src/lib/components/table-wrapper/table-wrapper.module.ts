import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { TableFrameComponent } from './components/table-frame/table-frame.component';
import { TableWrapperCommonModules, TableWrapperCommonProviders } from './common/common.imports';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [TableCrudComponent, TableFrameComponent],
    imports: [CommonModule, HttpClientModule, TableWrapperCommonModules],
    exports: [TableCrudComponent, TableFrameComponent],
    providers: [TableWrapperCommonProviders],
})
export class TableWrapperModule {}
