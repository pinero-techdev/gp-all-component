import { FormNumberFieldComponent } from './components/form-number-field/form-number-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCalendarFieldComponent } from './components/form-calendar-field/form-calendar-field.component';
import { FormCheckboxFieldComponent } from './components/form-checkbox-field/form-checkbox-field.component';
import { FormDropdownFieldComponent } from './components/form-dropdown-field/form-dropdown-field.component';
import { FormDropdownRelatedFieldComponent } from './components/form-dropdown-related-field/form-dropdown-related-field.component';
import { FormImgFieldComponent } from './components/form-img-field/form-img-field.component';
import { FormTextAreaFieldComponent } from './components/form-text-area-field/form-text-area-field.component';
import { FormWysiwygFieldComponent } from './components/form-wysiwyg-field/form-wysiwyg-field.component';
import { FormSliderFieldComponent } from './components/form-slider-field/form-slider-field.component';
import { FormSwitchFieldComponent } from './components/form-switch-field/form-switch-field.component';
import { FormTextFieldComponent } from './components/form-text-field/form-text-field.component';
import { FormTimeFieldComponent } from './components/form-time-field/form-time-field.component';
import { FormNullableCheckboxComponent } from './components/form-nullable-checkbox-field/form-nullable-checkbox.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../shared/imports/form-wrapper-shared';
import { SliderModule } from 'primeng/slider';
import { ColorPickerModule, FileUploadModule } from 'primeng/primeng';
import { FormColorPickerFieldComponent } from './components/form-color-picker-field/form-color-picker-field.component';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';
import { FormB64FileFieldComponent } from './components/form-b64-file-field/form-b64-file-field.component';
import { FormPasswordFieldComponent } from './components/form-password-field/form-password-field.component';
import { FormDaysOfWeekFieldComponent } from './components/form-days-of-week-field/form-days-of-week-field.component';

@NgModule({
  declarations: [
    FormCalendarFieldComponent,
    FormCheckboxFieldComponent,
    FormDropdownFieldComponent,
    FormDropdownRelatedFieldComponent,
    FormImgFieldComponent,
    FormNullableCheckboxComponent,
    FormNumberFieldComponent,
    FormSliderFieldComponent,
    FormSwitchFieldComponent,
    FormTextAreaFieldComponent,
    FormTextFieldComponent,
    FormPasswordFieldComponent,
    FormTimeFieldComponent,
    FormWysiwygFieldComponent,
    FormColorPickerFieldComponent,
    FormB64FileFieldComponent,
    FormDaysOfWeekFieldComponent,
  ],
  imports: [
    CommonModule,
    FormWrapperSharedModules,
    LoadingIndicatorModule,
    SliderModule,
    ColorPickerModule,
    FileUploadModule,
  ],
  exports: [
    FormCalendarFieldComponent,
    FormCheckboxFieldComponent,
    FormDropdownFieldComponent,
    FormDropdownRelatedFieldComponent,
    FormDaysOfWeekFieldComponent,
    FormB64FileFieldComponent,
    FormImgFieldComponent,
    FormNullableCheckboxComponent,
    FormNumberFieldComponent,
    FormSliderFieldComponent,
    FormSwitchFieldComponent,
    FormTextAreaFieldComponent,
    FormTextFieldComponent,
    FormPasswordFieldComponent,
    FormTimeFieldComponent,
    FormWysiwygFieldComponent,
    FormColorPickerFieldComponent,
  ],
  providers: [FormWrapperSharedProviders],
})
export class FormWrapperModule {}
