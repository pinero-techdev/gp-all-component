import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Message } from 'primeng/api';
import { takeWhile } from 'rxjs/operators';
import { LocaleES } from '../../resources/localization';

export const DefaultErrors = {
  default: `${LocaleES.FIELD_HAS_AN_ERROR}`,
  required: () => `${LocaleES.VALUE_IS_REQUIRED}`,
  validateBlankSpace: () => `${LocaleES.VALIDATION_SPACES}`,
  validateSpecialChar: () => `${LocaleES.VALIDATION_SPECIAL_CHARACTERS}`,
  validateControlSpace: () => `${LocaleES.VALIDATION_CONTROL_SPACES}`,
  validateTimeHour: () => `${LocaleES.VALIDATION_TIME_FORMAT}`,
  minlength: ({ requiredLength, actualLength }) =>
    `${LocaleES.VALIDATION_VALUE_TOO_SHORT(requiredLength)} `,
  maxlength: ({ requiredLength, actualLength }) =>
    `${LocaleES.VALIDATION_VALUE_TOO_LONG(requiredLength)}`,
};

@Component({
  selector: 'gp-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
})
export class ControlErrorComponent implements OnDestroy {
  isAlive = true;
  private control: AbstractControl;

  @Input() fieldName: string;

  @Input() set form(value: FormGroup) {
    if (value && this.fieldName && !this.control && value.get(this.fieldName)) {
      this.control = value.get(this.fieldName);
      this.control.statusChanges
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(() => this.recalculateErrors());
    }
  }

  error: Message[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.isAlive = false;
  }

  recalculateErrors() {
    this.error = [];
    for (const key in this.control.errors) {
      if (DefaultErrors.hasOwnProperty(key) && this.control.errors.hasOwnProperty(key)) {
        const error: ValidationErrors = this.control.errors[key];
        this.error.push({
          severity: 'error',
          summary: '',
          detail: DefaultErrors[key](error),
        });
      }
    }
    this.cd.detectChanges();
  }
}
