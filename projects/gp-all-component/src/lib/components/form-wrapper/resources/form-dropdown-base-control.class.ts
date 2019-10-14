import { GpFormFieldControl } from './form-field-control.class';
import { SelectItem } from 'primeng/api';
import { ListRs, TableService } from '../../../services/api/table/table.service';
import { LocaleES } from '../../../resources/localization';
import {
  DisplayType,
  FieldOption,
  IModifiedRelatedField,
  RelatedField,
} from '../../../resources/data/data-table/meta-data/meta-data-field.model';
import { finalize, first } from 'rxjs/operators';
import { Filter } from '../../../resources/data/filter/filter.model';
import { FilterOperationType } from '../../../resources/data/filter/filter-operation-type.enum';
import { Input } from '@angular/core';
import { OnChange } from 'property-watch-decorator';

export class FormDropdownBaseControl extends GpFormFieldControl {
  /** List of current values */
  items: SelectItem[] = [];

  loading = true;
  // field dependencies
  @Input()
  @OnChange<IModifiedRelatedField[]>('onRelatedFieldsChange')
  relatedFields: IModifiedRelatedField[];

  constructor(protected tableService: TableService) {
    super();
  }

  init() {
    if (this.displayInfo) {
      // If it's related field, it should wait to have the relatedFields property ready.
      this.isDisabled = this.displayInfo.displayType === DisplayType.DROPDOWN_RELATED;
      if (this.displayInfo.options) {
        this.resetDropdown();
        // there are options predefined in the metadata
        this.items = this.displayInfo.options.map((option: FieldOption) =>
          Object.create({ label: option.description, value: option.value })
        );
        this.loading = false;
      } else {
        // the options should be listed by the service
        this.items = [{ label: LocaleES.LOADING_DROPDOWN_DATA, value: null }];
        this.getData();
      }
    }
  }

  /**
   * When the dropdown is changed, the base class triggers the event with the current value
   * @param $event
   */
  onChangeEvent($event) {
    this.onFieldChange();
  }

  /**
   * Empty the dropdown and show only one option with 'Select ...'
   */
  protected resetDropdown() {
    const displayLabel = this.displayInfo.fieldLabel
      ? this.displayInfo.fieldLabel.toLowerCase()
      : '';
    const label = `${LocaleES.SELECT} ${displayLabel}...`;
    this.items = [];
    this.items.push({ label, value: null });
  }

  /**
   * Api Service needs referencedTable
   */
  protected getData() {
    // If the field is disabled is not required to get data. When the field is enable again,
    if (this.displayInfo && !this.isDisabled) {
      const fieldToOrderBy = this.displayInfo.fieldToOrderBy;
      const tableName = this.displayInfo.referencedTable;
      const filters = this.getFilters();

      if (tableName) {
        this.tableService
          .list(tableName, true, true, fieldToOrderBy, filters)
          .pipe(
            first(),
            finalize(() => (this.loading = false))
          )
          .subscribe((data: ListRs) => this.handleResponse(data), (e) => this.handleError(e));
      } else {
        const errorMessage = LocaleES.YOU_MUST_SET_RELATED_TABLE(
          this.formField.fieldMetadata.fieldName
        );
        this.handleError(errorMessage);
      }
    }
  }

  /**
   * Handle the api response
   * @param response
   */
  private handleResponse(response: ListRs) {
    if (response.ok) {
      this.handleSuccess(response.data);
    } else {
      this.handleError(response.error);
    }
  }

  /**
   * Create the option item from the api response
   * @param items
   */
  private handleSuccess(items: any[]) {
    const field = this.displayInfo.referencedField;
    let label;
    let value;

    this.resetDropdown();
    items.forEach((item) => {
      label = this.getOptionLabel(item);
      value = item.hasOwnProperty(field) ? item[field] : null;

      if (label) {
        this.items.push({ label, value });
      }
    });
    this.loading = false;
  }

  /**
   * Handling error showing a message
   * @param error
   */
  private handleError(error: any = null) {
    this.loading = false;
    this.items = [{ label: LocaleES.AN_ERROR_HAS_OCURRED, value: error }];
  }

  private getFilters(): Filter[] {
    let filters: Filter[] = this.displayInfo.filters;
    if (this.displayInfo.relatedFields && this.displayInfo.relatedFields.length) {
      filters = [];
      this.displayInfo.relatedFields.forEach((related: RelatedField) => {
        filters.push(
          new Filter().assign({
            op: FilterOperationType.EQUAL,
            field: related.fieldExternal ? related.fieldExternal : related.field,
            values: [this.relatedFields[related.field]],
          })
        );
      });
    }
    return filters;
  }

  /**
   * Option's description is built with the description property inside the metadata object
   * @param item
   */
  private getOptionLabel(item: any): string {
    let label = '';
    let separator = '';
    for (const option of this.displayInfo.fieldDescriptions) {
      if (item.hasOwnProperty(option)) {
        label += separator + item[option];
        separator = ' - ';
      }
    }
    return label;
  }

  /**
   * When a related field is changed, here the property isDisabled is checked again
   * and the API is called for getting the new data.
   */
  private onRelatedFieldsChange() {
    if (this.relatedFields) {
      this.isDisabled = Object.values(this.relatedFields).some((value) => value === null);
      this.getData();
    }
  }

  /* Set edited Row with current value */
  copyValueFromControlToEditedRow(editedRow: any = null) {
    if (this.formField && this.formField.fieldMetadata && editedRow) {
      editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue;
    }
  }

  /* Get Edited row value */
  copyValueFromEditedRowToControl(editedRow: any = null) {
    if (this.formField && this.formField.fieldMetadata) {
      this.currentValue =
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
}
