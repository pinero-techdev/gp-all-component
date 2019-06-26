import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FieldMetadata } from '../../services/table.service';
import { GpFormField, GpFormFieldControl } from './gp-app-table-crud-shared';
import { InfoCampoModificado } from '../../resources/data/infoCampoModificado';

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './gp-form-checkbox-field.component.html'
})
export class GpFormCheckboxFieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  @Output()
  valueChanged = new EventEmitter<InfoCampoModificado>();

  // Checkbox.
  currentValueCheckbox: boolean;

  public static FORM_FIELD_TYPE_CHECKBOX_FIELD: string = 'gp-form-checkbox-field';

  set _currentValueDropDown(value: boolean) {
    this.currentValueCheckbox = value;
    let infoCampoModificado = new InfoCampoModificado(this.formField.fieldMetadata.fieldName, this.currentValueCheckbox);
    this.valueChanged.emit(infoCampoModificado);
    console.log(infoCampoModificado);
  }

  get _currentValueCheckbox(): boolean {
    return this.currentValueCheckbox;
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  getFieldMetadata(): FieldMetadata {
    return this.formField.fieldMetadata;
  }

  ngOnInit() {
    this.inicializa();
  }

  inicializa() {}

  copyValueFromControlToEditedRow(editedRow: any) {
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    let newValue = this.currentValueCheckbox
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    this._currentValueDropDown = this.currentValueCheckbox;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormCheckboxhFieldComponent.changeSelectedRow: ' + JSON.stringify(this.formField.fieldMetadata));
    editedRow[this.formField.fieldMetadata.fieldName] =
      editedRow[this.formField.fieldMetadata.fieldName] == null
        ? this.formField.fieldMetadata.displayInfo.uncheckedValue
        : editedRow[this.formField.fieldMetadata.fieldName];
    let value = this.formField.fieldMetadata.displayInfo.checkedValue == editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValueCheckbox = value;
    console.log('        value checkbox: ' + this.currentValueCheckbox);
  }

  validateField(editedRow: any) {
    // Un checkbox siempre es valido.
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }
}
