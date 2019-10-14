import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableService } from './../../../../services/api/table/table.service';
import {
  IModifiedRelatedField,
  RelatedField,
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { FormDropdownFieldComponent } from '../form-dropdown-field/form-dropdown-field.component';
import { FilterOperationType } from '../../../../resources/data/filter/filter-operation-type.enum';
import { Filter } from '../../../../resources/data/filter/filter.model';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-dropdown-related-field',
  templateUrl: '../form-dropdown-field/form-dropdown-field.component.html',
  styleUrls: ['./form-dropdown-related-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDropdownRelatedFieldComponent extends FormDropdownFieldComponent {
  // tslint:disable-next-line
  private _relatedFields: IModifiedRelatedField;

  // data provided by the service
  list: any;

  // field dependencies
  @Input() set relatedFields(value: IModifiedRelatedField) {
    this.onRelatedFieldsChange(value);
    this.cd.markForCheck();
  }
  get relatedFields() {
    return this._relatedFields;
  }

  constructor(protected tableService: TableService, protected cd: ChangeDetectorRef) {
    super(tableService, cd);
  }

  init() {
    // If it's related field, it should wait to have the relatedFields property ready.
    this.isDisabled = true;
    this.setOptions();
  }

  protected getFilters(): Filter[] {
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
   * Check if every related field has been selected, in other terms, every related field has value.
   */
  protected checkRelatedFields(): boolean {
    if (this.relatedFields) {
      return !Object.values(this.relatedFields).some((value) => GPUtil.isNullOrUndefined(value));
    }
    return true;
  }

  /**
   * When a related field is changed, here the property isDisabled is checked again
   * and the API is called for getting the new data.
   */
  private onRelatedFieldsChange(value: IModifiedRelatedField) {
    if (value && Object.keys(value).length) {
      // If it isn't the first time, it can be set to null
      if (this._relatedFields && Object.keys(this._relatedFields).length) {
        this.currentValue = null;
      }

      this._relatedFields = value;
      this.isDisabled = !this.checkRelatedFields();
      this.setOptions();
    }
  }
}
