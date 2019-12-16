import { ListRs } from '../../../../services/api/table/table.service';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { InfoCampoModificado } from '../../../../resources/data/info-campo-modificado.model';
import { SelectItem } from 'primeng/api';
import { TableService } from '../../../../services/api/table/table.service';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { isUndefined } from 'util';
import { first } from 'rxjs/operators';

@Component({
  selector: 'gp-form-dropdown-field',
  templateUrl: './form-dropdown-field.component.html',
  styleUrls: ['./form-dropdown-field.component.scss'],
})
export class FormDropdownFieldComponent extends GpFormFieldControl implements OnInit {
  /** List of current values */
  listAllowedValuesOptions: SelectItem[] = [];
  // isDisabled is set up when OnInit is called, used in the template.
  isDisabled = false;

  /** FormField: Dropdown */
  @Input() formField: GpFormField;

  /** When dropdown is changed an event is triggered */
  @Output() valueChanged = new EventEmitter<InfoCampoModificado>();

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

  /**
   * Set list values, if there is a table reference in metadata then the service is called, if not
   * the list is got from the metada itself.
   */
  init() {
    this.listAllowedValuesOptions = [];
    if (this.formField && this.formField.fieldMetadata) {
      if (
        this.formField.fieldMetadata.displayInfo &&
        this.formField.fieldMetadata.displayInfo.options &&
        this.formField.fieldMetadata.displayInfo.options.length
      ) {
        const label =
          LocaleES.SELECT +
          this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() +
          '...';

        this.listAllowedValuesOptions.push({
          label,
          value: null,
        });

        for (const i of this.formField.fieldMetadata.displayInfo.options) {
          this.listAllowedValuesOptions.push({ label: i.description, value: i.value });
        }
      } else if (
        this.formField.fieldMetadata.displayInfo &&
        this.formField.fieldMetadata.displayInfo.referencedTable
      ) {
        /* Loading data from a table reference */
        this.getTableData();
      }
    }
  }

  /* Set edited Row with current value */
  copyValueFromControlToEditedRow(editedRow: any = null) {
    if (this.formField && this.formField.fieldMetadata && editedRow) {
      editedRow[this.formField.fieldMetadata.fieldName] = this.currentValueDropDown;
    }
  }

  /* Get Edited row value */
  copyValueFromEditedRowToControl(editedRow: any = null) {
    if (this.formField && this.formField.fieldMetadata) {
      this.currentValueDropDown =
        editedRow && editedRow.hasOwnProperty(this.formField.fieldMetadata.fieldName)
          ? editedRow[this.formField.fieldMetadata.fieldName]
          : null;
    }
  }

  /* If the field can't be null then the user is forced to select a value,
  if not always the field is valid */
  validateField(editedRow: any = null): boolean {
    if (this.formField && this.formField.fieldMetadata) {
      const value = editedRow && editedRow[this.formField.fieldMetadata.fieldName];
      this.formField.validField = true;
      this.formField.fieldMsgs = null;
      if (this.formField.fieldMetadata.notNull && !value) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
      }

      return this.formField.validField;
    }
    return false;
  }

  /* Event triggered when the dropdown changes its value */
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

  /** Getting the table data from service */
  private getTableData() {
    this.listAllowedValuesOptions = [{ label: LocaleES.LOADING_DROPDOWN_DATA, value: null }];

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
      .pipe(first())
      .subscribe((data) => this.setTableValues(data), () => this.handleError());
  }

  /* Set the field display information */
  private setTableValues(data: ListRs) {
    if (data.ok) {
      // Get list data
      this.listAllowedValuesOptions = [
        {
          label:
            LocaleES.SELECT +
            this.formField.fieldMetadata.displayInfo.fieldLabel //
              .toLowerCase() +
            ' ...',
          value: null,
        },
      ];
      for (const row of data.data) {
        let optionLabel = '';
        let separator = '';
        for (const fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
          optionLabel += separator + row[fieldDesc];
          separator = ' - ';
        }
        this.listAllowedValuesOptions.push({
          label: optionLabel,
          value: row[this.formField.fieldMetadata.displayInfo.referencedField],
        });
      }
    } else {
      this.handleError();
    }
  }

  /** Handling error showing an message */
  private handleError() {
    this.listAllowedValuesOptions = [{ label: LocaleES.AN_ERROR_HAS_OCURRED, value: null }];
  }
}
