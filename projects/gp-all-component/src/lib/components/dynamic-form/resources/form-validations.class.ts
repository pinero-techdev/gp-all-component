import { FormControl, ValidatorFn } from '@angular/forms';
import { RegexValidations } from '../../form-wrapper/resources/regex-validations.type';
import { GPUtil } from '../../../services/core/gp-util.service';

// @dynamic
export class FormValidations {
  static ValidateBlankSpace(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      return RegexValidations.BLANK_SPACE.test(control.value)
        ? { validateBlankSpace: { valid: control.value } }
        : null;
    };
  }

  static ValidateSpecialChar(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      return RegexValidations.SPECIAL_CHARACTERS.test(control.value)
        ? { validateSpecialChar: { valid: control.value } }
        : null;
    };
  }

  static ValidateControlSpace(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      return RegexValidations.CONTROL_SPACE.test(control.value)
        ? { validateControlSpace: { valid: control.value } }
        : null;
    };
  }

  static ValidateTimeHour(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      return RegexValidations.TIME_24_HOURS.test(control.value)
        ? null
        : { validateTimeHour: { valid: control.value } };
    };
  }

  static ValidateLength(min = 0, max = 110): ValidatorFn {
    min = GPUtil.isNullOrUndefined(min) ? 0 : min;
    max = GPUtil.isNullOrUndefined(max) ? 110 : max;
    return (control: FormControl): { [key: string]: any } => {
      if (GPUtil.isNullOrUndefined(control.value) && min === 0) {
        return null;
      } else {
        return RegexValidations.LENGTH(min, max).test(control.value)
          ? null
          : { validateLength: { valid: control.value } };
      }
    };
  }

  static ValidateMaxValue(max: number): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      const value = Number(control.value);
      return Number.isNaN(value)
        ? null
        : value > max
        ? { validationMaxValue: { value: control.value } }
        : null;
    };
  }

  static ValidateMinValue(min: number): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      const value = Number(control.value);
      return Number.isNaN(value)
        ? null
        : value < min
        ? { validationMaxValue: { value: control.value } }
        : null;
    };
  }
}
