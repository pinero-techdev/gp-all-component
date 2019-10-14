import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { GpFormField } from '../../resources/form-field.model';
import { FormValidations } from '../../../dynamic-form/resources/form-validations.class';
import {
  DisplayType,
  FieldRestriction,
  FieldType,
  RestrictionType,
  TextPropertyType,
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Directive({
  selector: '[gpFieldValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FormFieldValidatorDirective, multi: true }],
})
export class FormFieldValidatorDirective implements Validator {
  @Input('gpFieldValidator') field: GpFormField;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const validate = {
      ...this.isRequired(control),
      ...this.isAllowedAscii(control),
      ...this.isTimeHour(control),
      ...this.validateRestrictions(control),
    };
    this.field.validField = Object.keys(validate).length <= 0 && control.valid;
    return Object.keys(validate).length > 0 ? validate : null;
  }

  private isRequired(control: AbstractControl) {
    return this.field.fieldMetadata.notNull &&
      (control.value === '' || GPUtil.isNullOrUndefined(control.value))
      ? { validationRequired: { valid: control.value } }
      : null;
  }

  /**
   * Only allow letters and numbers.
   * If DisplayInfo.TextProperties also has BLANK_SPACE then also it excludes whitespaces.
   * @param control
   */
  private isAllowedAscii(control: AbstractControl) {
    if (
      this.field.fieldMetadata.allowAscii ||
      this.field.fieldMetadata.fieldType === FieldType.ATTACHMENT
    ) {
      return null;
    } else {
      let val = {
        ...FormValidations.ValidateControlSpace(),
        ...FormValidations.ValidateSpecialChar(),
      };
      if (this.hasNoSpaceProperty()) {
        val = { ...val, ...FormValidations.ValidateBlankSpace() };
      }
      return val;
    }
  }

  private isTimeHour(control: AbstractControl) {
    if (this.field.fieldMetadata.displayInfo.displayType === DisplayType.HOUR_MINUTE) {
      return FormValidations.ValidateTimeHour();
    } else {
      return null;
    }
  }

  private hasNoSpaceProperty(): boolean {
    return (
      !!this.field &&
      !!this.field.fieldMetadata &&
      !!this.field.fieldMetadata.displayInfo.textProperties &&
      this.field.fieldMetadata.displayInfo.textProperties.filter(
        (property) => property === TextPropertyType.NO_SPACE
      ).length > 0
    );
  }

  validateRestrictions(control: AbstractControl) {
    let validation = {};
    this.field.fieldMetadata.restrictions.forEach((restriction: FieldRestriction) => {
      switch (restriction.restrictionType) {
        case RestrictionType.LIST_ALLOWED_VALUES:
          // TODO
          break;
        case RestrictionType.MAX_LENGTH:
          validation = {
            ...validation,
            ...FormValidations.ValidateLength(null, restriction.maxLength),
          };
          break;
        case RestrictionType.MAX_VALUE:
          validation = {
            ...validation,
            ...FormValidations.ValidateMaxValue(restriction.maxValue),
          };
          break;
        case RestrictionType.MIN_LENGTH:
          validation = {
            ...validation,
            ...FormValidations.ValidateLength(restriction.minLength),
          };
          break;
        case RestrictionType.MIN_VALUE:
          validation = {
            ...validation,
            ...FormValidations.ValidateMinValue(restriction.minValue),
          };
          break;
        default:
      }
    });
    return validation;
  }
}
