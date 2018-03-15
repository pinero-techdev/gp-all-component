import {Component, Input} from "@angular/core";
import {FieldMetadata} from "../../services/table.service";
import {GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './gp-form-checkbox-field.component.html'
})
export class GpFormCheckboxFieldComponent extends GpFormFieldControl {

  @Input() formField : GpFormField;

  // Checkbox.
  currentValueCheckbox: boolean;

  public static FORM_FIELD_TYPE_CHECKBOX_FIELD : string = "gp-form-checkbox-field";

  public getFormField() : GpFormField {
    return this.formField;
  }

  getFieldMetadata() : FieldMetadata {
    return this.formField.fieldMetadata;
  }

  ngOnInit() {
    this.inicializa();
  }

  inicializa() {
  }

  copyValueFromControlToEditedRow( editedRow : any) {
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    let newValue = this.currentValueCheckbox ? this.formField.fieldMetadata.displayInfo.checkedValue : this.formField.fieldMetadata.displayInfo.uncheckedValue;
    editedRow[this.formField.fieldMetadata.fieldName] = newValue != null ? newValue : false;
  }

  copyValueFromEditedRowToControl( editedRow: any) {
    console.log("GpFormCheckboxhFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));    
    editedRow[this.formField.fieldMetadata.fieldName] = editedRow[this.formField.fieldMetadata.fieldName] == null ? this.formField.fieldMetadata.displayInfo.uncheckedValue : editedRow[this.formField.fieldMetadata.fieldName]; 
    let value = this.formField.fieldMetadata.displayInfo.checkedValue == editedRow[this.formField.fieldMetadata.fieldName];   
    this.currentValueCheckbox = value != null ? value : false;
    console.log("        editedRow: " + JSON.stringify(editedRow));
    console.log("        value checkbox: " + this.currentValueCheckbox );
  }

  validateField( editedRow : any ) {
    // Un checkbox siempre es valido.
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }

}

