import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldMetadata, TableService, Filter } from 'gp-all-component/services/table.service';
import { SelectItem } from 'primeng/components/common/api';
import { GpFormField, GpFormFieldControl } from 'gp-all-component/components/tables/gp-app-table-crud-shared';
import { InfoCampoModificado } from 'gp-all-component/resources/data/infoCampoModificado';
import { Dropdown } from 'primeng/primeng';

@Component({
  selector: 'gp-form-dropdown-dynamic-field',
  templateUrl: './gp-form-dropdown-dynamic-field.component.html'
})
export class GpFormDropdownDynamicFieldComponent extends GpFormFieldControl {
  @Input()
  formField: GpFormField;

  @Input()
  tableName: string;

  @Input()
  fieldsRq: string[] = [];

  @Output()
  valueChanged = new EventEmitter<InfoCampoModificado>();

  // Drop down.
  currentValueDropDown: string;
  listAllowedValuesOptions: SelectItem[];

  public static FORM_FIELD_TYPE_DROPDOWN_DYNAMIC_FIELD: string = 'gp-form-dropdown-dynamic-field';

  constructor(private _tableService: TableService) {
    super();
  }

  set _currentValueDropDown(value: string) {
    this.currentValueDropDown = value;
    let infoCampoModificado = new InfoCampoModificado(this.formField.fieldMetadata.fieldName, this.currentValueDropDown);
    this.valueChanged.emit(infoCampoModificado);
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
      this._tableService
        .getValuesLimit(this.formField.fieldMetadata.displayInfo.referencedTable, this.formField.fieldMetadata.displayInfo.filters)
        .subscribe(
          data => {
            if (data.ok) {
              // Recuperamos la lista.
              this.listAllowedValuesOptions = [
                { label: 'Seleccione ' + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + ' ...', value: null }
              ];
              for (let row of data.data) {
                let optionLabel = '';
                let separator = '';
                for (let fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
                  optionLabel += separator + row[fieldDesc];
                  separator = ' - ';
                }
                this.listAllowedValuesOptions.push({ label: optionLabel, value: row[this.formField.fieldMetadata.displayInfo.referencedField] });
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

  filterDynamicDropdown(event) {
    if (event.target.value != null && event.target.value.length > 2) {
      let filtersRq = [];
      filtersRq.push(new Filter(null, 'textoFiltro', [event.target.value]));
      this.formField.fieldMetadata.displayInfo.filters = filtersRq;
      this.inicializa();
    }
  }

  getCurrentValueDropDown(editedRow: any) {
    let filtersRq = [];
    if (this.fieldsRq.length > 0) {
      for (let field of this.fieldsRq) {
        filtersRq.push(new Filter(null, field, [editedRow[field]]));
      }
    }
    this.formField.fieldMetadata.displayInfo.filters = filtersRq;
    this.inicializa();
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    let newValue = this._currentValueDropDown;
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormTextFieldComponent.changeSelectedRow: ' + JSON.stringify(this.formField.fieldMetadata));
    console.log('        editedRow: ' + JSON.stringify(editedRow));
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    this._currentValueDropDown = value;
    console.log('        value dropdown: ' + this._currentValueDropDown);
    this.getCurrentValueDropDown(editedRow);
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

  onChange(event) {
    let infoCampoModificado = new InfoCampoModificado(this.formField.fieldMetadata.fieldName, this._currentValueDropDown);
    this.valueChanged.emit(infoCampoModificado);
  }

  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }
}
