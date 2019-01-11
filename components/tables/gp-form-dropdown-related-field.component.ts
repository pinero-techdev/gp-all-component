import { Component, Input } from '@angular/core';
import { FieldMetadata, TableService } from '../../services/table.service';
import { SelectItem } from 'primeng/components/common/api';
import { GpFormField, GpFormFieldControl } from './gp-app-table-crud-shared';
import { InfoCampoModificado } from '../../resources/data/infoCampoModificado';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'gp-form-dropdown-related-field',
  templateUrl: './gp-form-dropdown-related-field.component.html'
})
export class GpFormDropdownRelatedfieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  _relatedField = new InfoCampoModificado();

  list: any;

  // lo utilizamos para conocer si los datos ya se han cargado
  private listCharged: boolean = false;

  // Drop down.
  currentValueDropDown: string;
  listAllowedValuesOptions: SelectItem[];

  public static FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD: string = 'gp-form-dropdown-related-field';

  constructor(private _tableService: TableService) {
    super();
  }

  @Input()
  set relatedField(info: InfoCampoModificado) {
    if (info != null && info.field == this.formField.fieldMetadata.displayInfo.relatedField) {
      this._relatedField.value = info.value;
      if (info.value == null) {
        this.listAllowedValuesOptions = [{ label: 'Seleccione primero el campo del que depende ...', value: null }];
      } else {
        const relatedFieldExt = this.formField.fieldMetadata.displayInfo.relatedFieldExt || this.formField.fieldMetadata.displayInfo.relatedField;
        this.reinicia(relatedFieldExt, info.value);
      }
    }
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
    this._relatedField.field = this.formField.fieldMetadata.displayInfo.relatedField;
    if (
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
        .finally(() => (this.listCharged = true))
        .subscribe(
          data => {
            if (data.ok) {
              this.list = data.data;
              if (!this._relatedField || !this._relatedField.value) {
                this.listAllowedValuesOptions = [{ label: 'Seleccione primero el campo del que depende ...', value: null }];
              }
            } else {
              this.list = null;
              console.error('error al cargar datos');
            }
          },
          err => {
            this.list = null;
            console.error('error al cargar datos');
          }
        );
    } else {
      console.error('No se ha indicado tabla relacionada para obtener los valores del campo ' + this.formField.fieldMetadata.fieldName);
    }
  }

  reinicia(field: string, value: any) {
    if (this.listCharged && this.list) {
      this.listAllowedValuesOptions = [
        { label: 'Seleccione ' + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + ' ...', value: null }
      ];
      for (let row of this.list) {
        if (row[field] == value) {
          let optionLabel = '';
          let separator = '';
          for (let fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
            optionLabel += separator + row[fieldDesc];
            separator = ' - ';
          }
          this.listAllowedValuesOptions.push({ label: optionLabel, value: row[this.formField.fieldMetadata.displayInfo.referencedField] });
        }
      }
      // Solo tiene cargado la info de selección
      if (this.listAllowedValuesOptions.length == 1) {
        this.listAllowedValuesOptions = [{ label: 'No existen opciones para el valor seleccionado', value: null }];
      }
      // Si el valor no existe dentro de las opciones, se reinicia el valor
      if (
        this.listAllowedValuesOptions.filter(item => {
          return item.value == this.currentValueDropDown;
        }).length == 0
      ) {
        this.currentValueDropDown = null;
      }
    } else if (!this.listCharged) {
      // Si los datos se encuentran pendientes de cargarse, esperamos un segundo
      setTimeout(() => {
        this.reinicia(field, value);
      }, 200);
    } else {
      this.listAllowedValuesOptions = [{ label: 'No existen opciones para el valor seleccionado', value: null }];
    }
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = this.currentValueDropDown;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormTextFieldComponent.changeSelectedRow: ' + JSON.stringify(this.formField.fieldMetadata));
    console.log('        editedRow: ' + JSON.stringify(editedRow));
    this.currentValueDropDown = editedRow[this.formField.fieldMetadata.fieldName];
    console.log('        value dropdown: ' + this.currentValueDropDown);
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];

    if (this.formField.fieldMetadata.notNull && (valorCampo == '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    return this.formField.validField;
  }
}
