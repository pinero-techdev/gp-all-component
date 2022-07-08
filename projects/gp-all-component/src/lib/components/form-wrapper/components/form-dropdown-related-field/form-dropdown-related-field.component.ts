import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { TableService } from '../../../../services/api/table/table.service';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { DataTableMetaDataFieldDisplayInfoRelatedField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field-display-info-related-field.model';
import { InfoCampoModificado } from '../../../../resources/data/info-campo-modificado.model';
import { SelectItem } from 'primeng/api';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { finalize, first } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';

// tslint:disable:variable-name
@Component({
  selector: 'gp-form-dropdown-related-field',
  templateUrl: './form-dropdown-related-field.component.html',
  styleUrls: ['./form-dropdown-related-field.component.scss'],
})
export class FormDropdownRelatedFieldComponent extends GpFormFieldControl implements OnInit {
  // isDisabled is set up when OnInit is called, used in the template.
  isDisabled = false;
  // data provided by the service
  list: any;
  // options in dropdown selector
  listAllowedValuesOptions: SelectItem[];
  // field dependencies
  relatedFields: DataTableMetaDataFieldDisplayInfoRelatedField[] = [];

  // the selected value
  private NewcurrentValue = null;
  // Once the service has been called, the var is set to true
  private listCharged = false;

  searching = false;

  constructor(private tableService: TableService, private gpUtil: GPUtil) {
    super();
  }

  // The current field
  @Input() formField1: GpFormField;

  // The current field can have dependencies with another related field.s
  @Input()
  set relatedField(fieldsChanged: any) {
    if (fieldsChanged) {
      for (const fieldName in fieldsChanged) {
        if (fieldsChanged.hasOwnProperty(fieldName)) {
          const relatedField = this.gpUtil.getElementFromArray(
            this.relatedFields,
            'field',
            fieldName
          );
          if (relatedField) {
            relatedField.value = fieldsChanged[fieldName];
          }
        }
      }

      // If every related field already has a valid value
      // then the list is updated
      if (this.relatedFieldsSelected()) {
        this.reset();
      } else {
        const label = this.getLabel();
        this.listAllowedValuesOptions = [{ label, value: null }];
        this.currentValue = null;
      }
    }
  }

  /**
   * Getting onChange event
   * @param value Selected value
   */
  set currentValue(value: string) {
    this.NewcurrentValue = value;
    const modifiedField = new InfoCampoModificado(
      this.formField.fieldMetadata.fieldName,
      this.currentValue
    );
    this.valueChanged.emit(modifiedField);
  }

  get currentValue(): string {
    return this.NewcurrentValue;
  }

  @Output()
  valueChanged = new EventEmitter<InfoCampoModificado>();

  ngOnInit() {
    this.init();
    this.isDisabled = this.controlDisabled();
  }

  /**
   * Method for initialize the component, call the API Service and loads the list.
   * Set `listCharged` variable to true when it's finished.
   */
  init() {
    this.listAllowedValuesOptions = [];
    if (this.formField && this.formField.fieldMetadata) {
      this.relatedFields = this.formField.fieldMetadata.displayInfo.relatedFields
        ? this.formField.fieldMetadata.displayInfo.relatedFields
        : [];

      if (
        this.formField.fieldMetadata.displayInfo &&
        this.formField.fieldMetadata.displayInfo.referencedTable
      ) {
        // Gettingdata related to a table
        this.listAllowedValuesOptions = [{ label: LocaleES.LOADING_DROPDOWN_DATA, value: null }];
        this.getList();
      } else {
        const errorMessage = LocaleES.YOU_MUST_SET_RELATED_TABLE(
          this.formField.fieldMetadata.fieldName
        );
        this.handleError(errorMessage);
      }
    }
  }

  /**
   * Returns the metadata
   */
  getFieldMetadata(): DataTableMetaDataField {
    return this.formField && this.formField.fieldMetadata ? this.formField.fieldMetadata : null;
  }

  /**
   * Returns the current field
   */
  getFormField(): GpFormField {
    return this.formField ? this.formField : null;
  }

  /**
   * Review if it's needed to empty the list of values when related fields is modified.
   */
  reset() {
    if (this.listCharged && this.list) {
      this.processData();

      // Only selected item's info
      if (this.listAllowedValuesOptions.length === 1) {
        this.listAllowedValuesOptions = [
          {
            label: LocaleES.NO_OPTIONS_FOR_SELECTION,
            value: null,
          },
        ];
      }
      // If there is not any value equal to currentValue then it will be emptied.
      if (
        this.listAllowedValuesOptions.filter((item) => item.value === this.currentValue).length ===
        0
      ) {
        this.currentValue = null;
      }
    } else {
      this.listAllowedValuesOptions = [{ label: LocaleES.NO_OPTIONS_FOR_SELECTION, value: null }];
    }
  }

  /**
   * Given a table's row, set the current value to it.
   * @param editedRow Table's row
   */
  copyValueFromControlToEditedRow(editedRow: any = {}) {
    if (this.formField && this.formField.fieldMetadata) {
      editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue;
    }
  }

  /**
   * Given a table's row, set the current value at the row value
   * @param editedRow Table's row
   */
  copyValueFromEditedRowToControl(editedRow: any = {}) {
    if (this.formField && this.formField.fieldMetadata) {
      this.currentValue =
        editedRow && editedRow.hasOwnProperty(this.formField.fieldMetadata.fieldName)
          ? editedRow[this.formField.fieldMetadata.fieldName]
          : null;
    }
  }

  /**
   * Validate the current value
   * @param editedRow Table's row
   */
  validateField(editedRow: any = {}): boolean {
    if (this.formField && this.formField.fieldMetadata) {
      this.formField.validField = true;
      this.formField.fieldMsgs = null;
      const fieldValue = editedRow[this.formField.fieldMetadata.fieldName];
      if (this.formField.fieldMetadata.notNull && !fieldValue) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
      }
      return this.formField.validField;
    }
    return false;
  }

  /**
   * Returns the related fields' description which are not filled yet.
   */
  getLabel(): string {
    const fields = this.relatedFields
      .filter(
        (field) => !isNullOrUndefined(field.fieldDescription) && isNullOrUndefined(field.value)
      )
      .map((item) => item.fieldDescription.toLowerCase());

    let label = LocaleES.YOU_MUST_TO_MAKE_SELECTION;
    if (fields.length === 1) {
      label += fields.toString();
    } else {
      const fieldsString = fields.join(',');
      const indexLastComa = fieldsString.lastIndexOf(',');
      label +=
        fieldsString.substring(0, indexLastComa) +
        ' y ' +
        fieldsString.substring(indexLastComa + 1);
    }

    return label;
  }

  /**
   * Check if every related field has been selected, in other terms, every related field has value.
   */
  relatedFieldsSelected(): boolean {
    return this.relatedFields.every((field) => !isNullOrUndefined(field.value));
  }

  /**
   * While the related fields are fulfilling,
   * it'll show the list of matched options. Otherwise, the list of options
   * will contain a single item, with the information of the related fields
   * non-selected yet.
   */
  processData() {
    if (!this.relatedFieldsSelected()) {
      const label = this.getLabel();
      this.listAllowedValuesOptions = [{ label, value: null }];
    } else {
      this.listAllowedValuesOptions = [
        {
          label: LocaleES.SELECT_WITH_PARAM(
            this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase()
          ),
          value: null,
        },
      ];

      const optionsAllowed = this.list
        .filter((item) => {
          let valid = true;
          for (const relatedField of this.relatedFields) {
            const fieldExt = relatedField.fieldExternal || relatedField.field;
            valid = valid && relatedField.value === item[fieldExt];
          }
          return valid;
        })
        .map((item) => {
          let optionLabel = '';
          let separator = '';
          for (const fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
            optionLabel += separator + item[fieldDesc];
            separator = ' - ';
          }
          return {
            label: optionLabel,
            value: item[this.formField.fieldMetadata.displayInfo.referencedField],
          };
        });

      // Autoselect when only one result
      if (optionsAllowed.length === 1) {
        this.currentValue = optionsAllowed[0].value;
      }

      this.listAllowedValuesOptions = this.listAllowedValuesOptions.concat(optionsAllowed);
    }
  }

  /** Call to API and retrieving the data */
  private getList() {
    const fieldToOrderBy = this.formField.fieldMetadata.displayInfo.fieldToOrderBy
      ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy]
      : null;

    this.searching = true;
    this.tableService
      .list(
        this.formField.fieldMetadata.displayInfo.referencedTable,
        true,
        true,
        fieldToOrderBy,
        this.formField.fieldMetadata.displayInfo.filters
      )
      .pipe(
        first(),
        finalize(() => {
          this.listCharged = true;
          this.searching = false;
        })
      )
      .subscribe(
        (data: any) => {
          if (data.ok) {
            this.list = data.data;
            this.processData();
          } else {
            this.handleError();
          }
        },
        (error) => this.handleError()
      );
  }

  /**
   * Handling the error; show a message.
   * @param error Error message
   */
  private handleError(error = LocaleES.AN_ERROR_LOADING_DATA) {
    this.list = null;
    console.error(error);
  }
}
