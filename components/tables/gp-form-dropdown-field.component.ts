import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldMetadata, TableService } from '../../services/table.service';
import { SelectItem } from 'primeng/components/common/api';
import { GpFormField, GpFormFieldControl } from './gp-app-table-crud-shared';
import { InfoCampoModificado } from '../../resources/data/infoCampoModificado';

@Component({
  selector: 'gp-form-dropdown-field',
  templateUrl: './gp-form-dropdown-field.component.html'
})
export class GpFormDropdownFieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  @Output()
  valueChanged = new EventEmitter<InfoCampoModificado>();

  // Drop down.
  currentValueDropDown: string;
  listAllowedValuesOptions: SelectItem[];

  public static FORM_FIELD_TYPE_DROPDOWN_FIELD: string = 'gp-form-dropdown-field';

  constructor(private _tableService: TableService) {
    super();
  }

  set _currentValueDropDown(value: string) {
    this.currentValueDropDown = value;
    let infoCampoModificado = new InfoCampoModificado(this.formField.fieldMetadata.fieldName, this.currentValueDropDown);
    this.valueChanged.emit(infoCampoModificado);
    console.log(infoCampoModificado);
  }

  get _currentValueDropDown(): string {
    return this.currentValueDropDown;
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

  inicializa() {
    this.listAllowedValuesOptions = [];
    if (
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.options != null &&
      this.formField.fieldMetadata.displayInfo.options.length > 0
    ) {
      this.listAllowedValuesOptions.push({
        label: 'Seleccione ' + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + ' ...',
        value: null
      });
      for (let i of this.formField.fieldMetadata.displayInfo.options) {
        this.listAllowedValuesOptions.push({ label: i.description, value: i.value });
      }
      console.log('GpFormDropdownFieldComponent.Allowed value: ' + JSON.stringify(this.listAllowedValuesOptions));
    } else if (
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.referencedTable != null &&
      this.formField.fieldMetadata.displayInfo.referencedTable != ''
    ) {
      // Cargamos los datos de una tabla?
      console.log('GpFormDropdownFieldComponent.ngOnInit: loading from table ' + this.formField.fieldMetadata.displayInfo.referencedTable);
      this.listAllowedValuesOptions = [{ label: 'Cargando los datos del desplegable ...', value: null }];
      console.log(this.formField.fieldMetadata.displayInfo.referencedTable);
      let fieldToOrderBy = this.formField.fieldMetadata.displayInfo.fieldToOrderBy ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy] : null;
      this._tableService
        .list(this.formField.fieldMetadata.displayInfo.referencedTable, true, true, fieldToOrderBy, this.formField.fieldMetadata.displayInfo.filters)
        .subscribe(
          data => {
            if (data.ok) {
              // Recuperamos la lista.
              // TODO Hacer que busque automaticamente el id cuando no venga referencedField.
              this.listAllowedValuesOptions = [
                {
                  label: 'Seleccione ' + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + ' ...',
                  value: null
                }
              ];
              for (let row of data.data) {
                let optionLabel = '';
                let separator = '';
                for (let fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
                  optionLabel += separator + row[fieldDesc];
                  separator = ' - ';
                }
                this.listAllowedValuesOptions.push({
                  label: optionLabel,
                  value: row[this.formField.fieldMetadata.displayInfo.referencedField]
                });
              }
            } else {
              this.listAllowedValuesOptions = [{ label: 'Error recuperando datos.', value: null }];
            }
          },
          err => {
            this.listAllowedValuesOptions = [{ label: 'Error recuperando datos.', value: null }];
          }
        );
    }
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = this._currentValueDropDown;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormTextFieldComponent.changeSelectedRow: ' + JSON.stringify(this.formField.fieldMetadata));
    console.log('        editedRow: ' + JSON.stringify(editedRow));
    this._currentValueDropDown = editedRow[this.formField.fieldMetadata.fieldName];
    console.log('        value dropdown: ' + this._currentValueDropDown);
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];

    // Validacion del campo.
    // a) Null?
    if (this.formField.fieldMetadata.notNull && (valorCampo == '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    return this.formField.validField;
  }

  onChange() {
    let infoCampoModificado = new InfoCampoModificado(this.formField.fieldMetadata.fieldName, this._currentValueDropDown);
    this.valueChanged.emit(infoCampoModificado);
  }
}
