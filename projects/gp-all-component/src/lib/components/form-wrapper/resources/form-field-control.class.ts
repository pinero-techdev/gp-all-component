import { Message } from 'primeng/api';
import { EventEmitter, Input, Output } from '@angular/core';
import { GpFormControl } from './form-control.model';
import { GpFormField } from './form-field.model';
import {
  FieldDisplayInfo,
  FieldRestriction,
  FieldType,
  IModifiedField,
  RestrictionType,
  TextPropertyType,
} from '../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GPUtil } from '../../../services/core/gp-util.service';

export abstract class GpFormFieldControl extends GpFormControl {
  // tslint:disable-next-line
  protected _formField;
  // tslint:disable-next-line
  protected _currentValue: any;

  /**
   * isDisabled is set up when OnInit is called, used in the template.
   */
  isDisabled = false;

  /**
   * Min length validation value
   */
  minLength: number;

  /**
   * Max length validation value
   */
  maxLength: number;
  /**
   * Min value validation value
   */
  minValue: number;

  /**
   * Max value validation value
   */
  maxValue: number;
  /**
   * Required validation value
   */
  required = false;

  /**
   * Readonly validation value
   */
  readonly = false;

  /**
   * Placeholder text
   */
  placeholder = '';

  /**
   * Classes styles
   */
  textboxClass: string;

  /**
   * A FieldDisplayInfo object, type, options, label ...
   */
  displayInfo: FieldDisplayInfo;

  errorClass = 'invalid-field';

  /**
   * The current form field
   */
  @Input() set formField(value: GpFormField) {
    if (!GPUtil.isNullOrUndefined(value) && GPUtil.isNullOrUndefined(this._formField)) {
      this._formField = new GpFormField().assign(value, true);
      this.displayInfo = new FieldDisplayInfo().assign(
        this._formField.fieldMetadata.displayInfo,
        true
      );

      if (GPUtil.isNullOrUndefined(this.formField.formControl.editedRow)) {
        this._formField.formControl.editedRow = {
          [this._formField.fieldMetadata.fieldName]: null,
        };
      }

      this.isDisabled = this.controlDisabled();
      this.setValidations();
      this.setTextProperties();
      this.init();
    }
  }

  get formField(): GpFormField {
    return this._formField ? this._formField : null;
  }

  /**
   * Current form field value
   */
  @Input() currentValue: any;

  /* Handling field change event */
  @Output() onChange = new EventEmitter<IModifiedField>();

  /**
   * When the class set the FormField up, the field should be initiated.
   */
  protected init() {
    // Write your init code if it's needed
  }

  /**
   * Returns the current form field object.
   */
  public getFormField(): GpFormField {
    return this.formField;
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    if (this.formField) {
      editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue;
    }
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    if (this.formField) {
      this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
    }
  }

  protected setValidations() {
    this.readonly = this.formField ? this.formField.fieldMetadata.readOnly : false;
    this.required = this.formField ? this.formField.fieldMetadata.notNull : false;
    this.setRestrictions();
  }

  /**
   * Set text classes and modify a text according to text properties.
   * @param value
   */
  protected setTextProperties(value: string = ''): string {
    let returnedValue = value ? value.toString() : '';
    if (this.formField.fieldMetadata.fieldType === FieldType.STRING && this.hasTextProperties()) {
      this.textboxClass = '';
      this.displayInfo.textProperties.forEach((textProperty) => {
        switch (textProperty) {
          case TextPropertyType.TRIM:
            returnedValue = returnedValue.trim();
            break;
          case TextPropertyType.NO_SPACE:
            returnedValue = returnedValue.replace(/\s/g, '');
            break;
          case TextPropertyType.UPPERCASE:
            this.textboxClass += ' text-uppercase';
            returnedValue = returnedValue.toUpperCase();
            break;
          default:
        }
      });
    }

    return returnedValue;
  }

  /**
   * Set a new message to the messages queue for showing an error/warning.
   * @param msg message string
   */
  validateFieldAddMsgs(msg: string) {
    const formField = this.getFormField();
    if (formField) {
      formField.validField = false;
      if (GPUtil.isNullOrUndefined(formField.fieldMsgs)) {
        formField.fieldMsgs = [];
      }
      formField.fieldMsgs.push({ severity: 'error', detail: msg } as Message);
    }
  }

  /**
   * Clear the validations messages and set the field as valid.
   */
  clearValidations() {
    const formField = this.getFormField();
    if (formField) {
      formField.fieldMsgs = null;
      formField.validField = true;
    }
  }

  /**
   * Set the flag isDisabled to true if the field is readonly/locked.
   */
  controlDisabled(): boolean {
    this.isDisabled =
      this.formField &&
      (this.formField.formControl.lockFields ||
        this.formField.fieldMetadata.readOnly ||
        (this.formField.fieldMetadata.id && this.formField.formControl.edicionEdit));
    return this.isDisabled;
  }

  /**
   * Event when the field is changed by user
   */
  onFieldChange(itemValue: any = null) {
    const field = this.getFormField();
    if (!field || !field.formControl) {
      return;
    }

    const value =
      !GPUtil.isNullOrUndefined(itemValue) && itemValue.hasOwnProperty('value')
        ? itemValue.value
        : this.currentValue;

    const label =
      !GPUtil.isNullOrUndefined(itemValue) && itemValue.hasOwnProperty('label')
        ? itemValue.label
        : this.currentValue;

    this.copyValueFromControlToEditedRow(field.formControl.editedRow);

    this.onChange.emit({
      fieldName: field.fieldMetadata.fieldName,
      value,
      label,
      field,
    });
  }

  /**
   * Setup restrictions used in text fields
   */
  setRestrictions() {
    if (this.formField.fieldMetadata.restrictions) {
      this.formField.fieldMetadata.restrictions.forEach((restriction: FieldRestriction) => {
        switch (restriction.restrictionType) {
          case RestrictionType.LIST_ALLOWED_VALUES:
            // TODO
            break;
          case RestrictionType.MAX_LENGTH:
            this.maxLength = restriction.maxLength;
            break;
          case RestrictionType.MAX_VALUE:
            this.maxValue = restriction.maxValue;
            break;
          case RestrictionType.MIN_LENGTH:
            this.minLength = restriction.minLength;
            break;
          case RestrictionType.MIN_VALUE:
            this.minValue = restriction.minValue;
            break;
          default:
        }
      });
    }
  }

  /**
   * Text Field can have special properties defined in TextPropertyType
   */
  protected hasTextProperties(): boolean {
    return (
      !GPUtil.isNullOrUndefined(this.displayInfo) &&
      !GPUtil.isNullOrUndefined(this.displayInfo.textProperties)
    );
  }
}
