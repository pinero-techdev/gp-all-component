import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCalendarFieldComponent } from './components/form-calendar-field/form-calendar-field.component';
import { FormCheckboxFieldComponent } from './components/form-checkbox-field/form-checkbox-field.component';
import { FormDropdownFieldComponent } from './components/form-dropdown-field/form-dropdown-field.component';
import { FormDropdownRelatedFieldComponent } from './components/form-dropdown-related-field/form-dropdown-related-field.component';
import { FormImgFieldComponent } from './components/form-img-field/form-img-field.component';
import { FormTextAreaFieldComponent } from './components/form-text-area-field/form-text-area-field.component';
import { FormWysiwygFieldComponent } from './components/form-wysiwyg-field/form-wysiwyg-field.component';
import { FormSwitchFieldComponent } from './components/form-switch-field/form-switch-field.component';
import { FormTextFieldComponent } from './components/form-text-field/form-text-field.component';
import { FormTimeFieldComponent } from './components/form-time-field/form-time-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from './../../shared/imports/form-wrapper-shared';

@NgModule({
  declarations: [
    FormCalendarFieldComponent,
    FormCheckboxFieldComponent,
    FormDropdownFieldComponent,
    FormDropdownRelatedFieldComponent,
    FormImgFieldComponent,
    FormSwitchFieldComponent,
    FormTextAreaFieldComponent,
    FormTextFieldComponent,
    FormTimeFieldComponent,
    FormWysiwygFieldComponent,
  ],
  imports: [CommonModule, FormWrapperSharedModules],
  exports: [
    FormCalendarFieldComponent,
    FormCheckboxFieldComponent,
    FormDropdownFieldComponent,
    FormDropdownRelatedFieldComponent,
    FormImgFieldComponent,
    FormSwitchFieldComponent,
    FormTextAreaFieldComponent,
    FormTextFieldComponent,
    FormTimeFieldComponent,
    FormWysiwygFieldComponent,
  ],
  providers: [FormWrapperSharedProviders],
})
export class FormWrapperModule {}
