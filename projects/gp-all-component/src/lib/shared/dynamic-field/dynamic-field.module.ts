import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldComponent } from './dynamic-field.component';
import { FormWrapperModule } from '../../components/form-wrapper/form-wrapper.module';
import { ButtonModule } from '../../components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicFieldComponent],
  imports: [CommonModule, FormWrapperModule, ReactiveFormsModule, ButtonModule],
  exports: [DynamicFieldComponent],
})
export class DynamicFieldModule {}
