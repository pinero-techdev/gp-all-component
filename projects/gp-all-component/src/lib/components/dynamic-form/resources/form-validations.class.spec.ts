import { FormValidations } from './form-validations.class';
import { FormControl } from '@angular/forms';

describe('FormValidations', () => {
  // Blank Spaces
  it('should validate blank spaces as invalid', () => {
    const control = new FormControl('01 02,03 03 10', FormValidations.ValidateBlankSpace());
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateBlankSpace')).toBeTruthy();
  });

  it('should validate blank spaces as valid', () => {
    const control = new FormControl('0102,030310', FormValidations.ValidateBlankSpace());
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateBlankSpace')).toBeFalsy();
  });

  // Special Chars
  it('should validate special char as invalid', () => {
    const control = new FormControl(
      '01 %$·%·$"!%&/% ª _02,03 03 10',
      FormValidations.ValidateSpecialChar()
    );
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateSpecialChar')).toBeTruthy();
  });

  it('should validate special char as valid', () => {
    const control = new FormControl('01 02,03 03 10', FormValidations.ValidateSpecialChar());
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateSpecialChar')).toBeFalsy();
  });

  // Control Spaces
  it('should validate control spaces as invalid', () => {
    const control = new FormControl(' A B C D \n FD GH', FormValidations.ValidateControlSpace());
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateControlSpace')).toBeTruthy();
  });

  it('should validate control spaces as invalid (carriage return)', () => {
    const control = new FormControl('\n', FormValidations.ValidateControlSpace());
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateControlSpace')).toBeTruthy();
  });

  it('should validate control spaces as valid', () => {
    const control = new FormControl('ABCD', FormValidations.ValidateControlSpace());
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateControlSpace')).toBeFalsy();
  });

  // TimeHour
  it('should validate time/hour as invalid', () => {
    const control = new FormControl(
      '01 %$·%·$"!%&/% ª _02,03 03 10',
      FormValidations.ValidateTimeHour()
    );
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateTimeHour')).toBeTruthy();
  });

  it('should validate time/hour as valid', () => {
    const control = new FormControl('01:29', FormValidations.ValidateTimeHour());
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateTimeHour')).toBeFalsy();
  });

  // Length
  it('should validate min/max length as invalid no minlen', () => {
    const control = new FormControl('Test', FormValidations.ValidateLength(null, 2));
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateLength')).toBeTruthy();
  });

  it('should validate min/max length as invalid with minlen', () => {
    const control = new FormControl('Test', FormValidations.ValidateLength(6, 12));
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validateLength')).toBeTruthy();
  });

  it('should validate min/max length as valid no minlen', () => {
    const control = new FormControl('Test', FormValidations.ValidateLength(null, 5));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateLength')).toBeFalsy();
  });

  it('should validate min/max length as valid with minlen', () => {
    const control = new FormControl('Test', FormValidations.ValidateLength(4, 10));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateLength')).toBeFalsy();
  });

  it('should validate min/max length as valid', () => {
    const control = new FormControl('Test', FormValidations.ValidateLength(4, 10));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateLength')).toBeFalsy();
  });

  it('should validate min/max length as valid no minlen no maxlen', () => {
    const control = new FormControl('Test', FormValidations.ValidateLength(null, null));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validateLength')).toBeFalsy();
  });

  // MaxValue
  it('should validate maxValue as invalid', () => {
    const control = new FormControl(1, FormValidations.ValidateMaxValue(0));
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validationMaxValue')).toBeTruthy();
  });

  it('should validate maxValue as valid when its not a number type', () => {
    const control = new FormControl('01:29', FormValidations.ValidateMaxValue(1));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validationMaxValue')).toBeFalsy();
  });

  it('should validate maxValue as valid', () => {
    const control = new FormControl(2, FormValidations.ValidateMaxValue(10));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validationMaxValue')).toBeFalsy();
  });

  // MinValue
  it('should validate minValue as invalid', () => {
    const control = new FormControl(1, FormValidations.ValidateMinValue(10));
    expect(control.invalid).toBeTruthy();
    expect(control.getError('validationMaxValue')).toBeTruthy();
  });

  it('should validate minValue as valid when its not a number type', () => {
    const control = new FormControl('01:29', FormValidations.ValidateMinValue(1));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validationMaxValue')).toBeFalsy();
  });

  it('should validate minValue as valid', () => {
    const control = new FormControl(2, FormValidations.ValidateMinValue(0));
    expect(control.valid).toBeTruthy();
    expect(control.getError('validationMaxValue')).toBeFalsy();
  });
});
