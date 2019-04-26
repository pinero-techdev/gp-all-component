import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { InfoCampoModificado } from '@lib/resources/data/info-campo-modificado.model';
import { SelectItem } from 'primeng/api';
import { TableService } from '@lib/services/api/table/table.service';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { isUndefined } from 'util';

@Component({
  selector: 'gp-form-dropdown-field',
  templateUrl: './form-dropdown-field.component.html',
})
export class FormDropdownFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;

  @Output() valueChanged = new EventEmitter<InfoCampoModificado>();

  listAllowedValuesOptions: SelectItem[] = [];
  // isDisabled is set up when OnInit is called, used in the template.
  isDisabled = false;
  constructor(private readonly tableService: TableService) {
    super();
  }

  set currentValueDropDown(value: string) {
    this.onChange(value);
  }

  get currentValueDropDown(): string {
    return isUndefined(this.currentValue) ? null : this.currentValue;
  }

  ngOnInit() {
    this.init();
    this.isDisabled = this.controlDisabled();
  }

  getFormField(): GpFormField {
    return isUndefined(this.formField) ? null : this.formField;
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField ? this.formField.fieldMetadata : null;
  }

  // FIXME implement lifecycle OnInit
  init() {
    this.listAllowedValuesOptions = [];
    if (this.formField && this.formField.fieldMetadata) {
      if (
        this.formField.fieldMetadata.displayInfo &&
        this.formField.fieldMetadata.displayInfo.options &&
        this.formField.fieldMetadata.displayInfo.options.length
      ) {
        this.listAllowedValuesOptions.push({
          label:
            'Seleccione ' +
            this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() +
            ' ...',
          value: null,
        });
        for (const i of this.formField.fieldMetadata.displayInfo.options) {
          this.listAllowedValuesOptions.push({ label: i.description, value: i.value });
        }
      } else if (
        this.formField.fieldMetadata.displayInfo &&
        this.formField.fieldMetadata.displayInfo.referencedTable
      ) {
        // Cargamos los datos de una tabla?
        this.listAllowedValuesOptions = [
          { label: 'Cargando los datos del desplegable ...', value: null },
        ];

        const fieldToOrderBy = this.formField.fieldMetadata.displayInfo.fieldToOrderBy
          ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy]
          : null;

        this.tableService
          .list(
            this.formField.fieldMetadata.displayInfo.referencedTable,
            true,
            true,
            fieldToOrderBy,
            this.formField.fieldMetadata.displayInfo.filters
          )
          .first()
          .subscribe(
            (data) => {
              if (data.ok) {
                // Recuperamos la lista.
                this.listAllowedValuesOptions = [
                  {
                    label:
                      'Seleccione ' +
                      this.formField.fieldMetadata.displayInfo.fieldLabel //
                        .toLowerCase() +
                      ' ...',
                    value: null,
                  },
                ];
                for (const row of data.data) {
                  let optionLabel = '';
                  let separator = '';
                  for (const fieldDesc of this.formField.fieldMetadata.displayInfo
                    .fieldDescriptions) {
                    optionLabel += separator + row[fieldDesc];
                    separator = ' - ';
                  }
                  this.listAllowedValuesOptions.push({
                    label: optionLabel,
                    value: row[this.formField.fieldMetadata.displayInfo.referencedField],
                  });
                }
              } else {
                this.listAllowedValuesOptions = [
                  { label: 'Error recuperando datos.', value: null },
                ];
              }
            },
            (err) => {
              this.listAllowedValuesOptions = [{ label: 'Error recuperando datos.', value: null }];
            }
          );
      }
    }
  }

  copyValueFromControlToEditedRow(editedRow: any[] = []) {
    if (this.formField && this.formField.fieldMetadata) {
      editedRow[this.formField.fieldMetadata.fieldName] = this.currentValueDropDown;
    }
  }

  copyValueFromEditedRowToControl(editedRow: any[] = []) {
    this.currentValueDropDown =
      this.formField && this.formField.fieldMetadata && editedRow.length > 0
        ? editedRow[this.formField.fieldMetadata.fieldName]
        : null;
  }

  validateField(editedRow: any[] = []): boolean {
    if (this.formField && this.formField.fieldMetadata) {
      const value = editedRow[this.formField.fieldMetadata.fieldName];
      this.formField.validField = true;
      this.formField.fieldMsgs = null;
      if (this.formField.fieldMetadata.notNull && !value) {
        this.formField.validField = false;
        this.validateFieldAddMsgs('El valor es obligatorio.');
      }

      return this.formField.validField;
    }
    return false;
  }

  onChange(value: string) {
    if (this.formField && this.formField.fieldMetadata) {
      this.currentValue = value;
      const infoCampoModificado = new InfoCampoModificado(
        this.formField.fieldMetadata.fieldName,
        this.currentValue
      );
      this.valueChanged.emit(infoCampoModificado);
    }
  }
}
