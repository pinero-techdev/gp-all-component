import {Component, Input} from "@angular/core";
import {FieldMetadata} from "../../services/table.service";
import {GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";

@Component({
  selector: 'gp-form-switch-field',
  templateUrl: './gp-form-switch-field.component.html'
})
export class GpFormSwitchFieldComponent extends GpFormFieldControl {

  @Input() formField : GpFormField;

  // Switch.
  currentValueSwitch: boolean;

  public static FORM_FIELD_TYPE_SWITCH_FIELD : string = "gp-form-switch-field";

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
    let newValue = this.currentValueSwitch ? this.formField.fieldMetadata.displayInfo.checkedValue : this.formField.fieldMetadata.displayInfo.uncheckedValue;
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl( editedRow: any) {
    console.log("GpFormSwitchFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
    console.log("        editedRow: " + JSON.stringify(editedRow));
    let value = this.formField.fieldMetadata.displayInfo.checkedValue == editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValueSwitch = value;
    console.log("        value switch: " + this.currentValueSwitch );
  }

  validateField( editedRow : any ) {
    // Un switch siempre es valido.
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }

}
