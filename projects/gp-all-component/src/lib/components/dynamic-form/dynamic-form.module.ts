import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldModule } from '../../shared/dynamic-field/dynamic-field.module';
import { ButtonModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ControlErrorModule} from '../../shared/control-error/control-error.module';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    ButtonModule,
    CommonModule,
    ControlErrorModule,
    DynamicFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
