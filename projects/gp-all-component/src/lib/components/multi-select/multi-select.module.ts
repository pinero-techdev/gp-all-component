import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import { MultiSelectModule as NgMultiselect } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MultiSelectComponent],
  imports: [CommonModule, NgMultiselect, FormsModule, ReactiveFormsModule],
  exports: [MultiSelectComponent],
})
export class MultiSelectModule {}
