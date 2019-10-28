import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ListRs, TableService } from '../../../../services/api/table/table.service';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { SelectItem } from 'primeng/api';
import { FieldOption } from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { LocaleES } from '../../../../resources/localization';
import { finalize, first } from 'rxjs/operators';
import { Filter } from '../../../../resources/data/filter/filter.model';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-dropdown-field',
  templateUrl: './form-dropdown-field.component.html',
  styleUrls: ['./form-dropdown-field.component.scss'],
})
export class FormDropdownFieldComponent extends GpFormFieldControl {
  /** List of current values */
  items: SelectItem[];
  loading = true;

  constructor(protected tableService: TableService, protected cd: ChangeDetectorRef) {
    super();
  }

  /**
   * Current form field value
   */
  @Input() set currentValue(v: any) {
    this._currentValue = GPUtil.isNullOrUndefined(v) ? null : v;
    this.setOption();
    this.cd.markForCheck();
  }

  get currentValue() {
    return this._currentValue;
  }

  protected init() {
    this.setOptions();
  }

  /**
   * When the dropdown is changed, the base class triggers the event with the current value
   * @param $event
   */
  onChangeEvent($event) {
    const selectedItem = this.items.find((i) => i.value === $event.value);
    this.onFieldChange(selectedItem);
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
   * When the dropdown is disabled and have a value,
   * it doesn't load items however it should have one item selected.
   */
  protected setOption() {
    if (this.isDisabled && !GPUtil.isNullOrUndefined(this.currentValue)) {
      this.items = [{ label: this.currentValue, value: this.currentValue }];
    }
  }

  /**
   * Api Service needs referencedTable
   */
  protected getData() {
    // If the field is disabled is not required to get data. When the field is enable again,
    if (this.displayInfo) {
      if (this.isDisabled) {
        const errorMessage = LocaleES.YOU_MUST_TO_MAKE_SELECTION(
          this.formField.fieldMetadata.displayInfo.fieldLabel
        );
        this.handleError(errorMessage);
        this.setOption();
      } else {
        const fieldToOrderBy = this.displayInfo.fieldToOrderBy;
        const tableName = this.displayInfo.referencedTable;
        const filters = this.getFilters();
        // the options should be listed by the service
        this.items = [{ label: LocaleES.LOADING_DROPDOWN_DATA, value: null }];
        if (tableName) {
          this.tableService
            .list(
              tableName,
              true,
              true,
              fieldToOrderBy,
              filters,
              null,
              null,
              this.formField.fieldMetadata.displayInfo.referencedMethod
            )
            .pipe(
              first(),
              finalize(() => (this.loading = false))
            )
            .subscribe((data: ListRs) => this.handleResponse(data), (e) => this.handleError(e));
        } else {
          const errorMessage = LocaleES.YOU_MUST_SET_RELATED_TABLE(
            this.formField.fieldMetadata.displayInfo.fieldLabel
          );
          this.handleError(errorMessage);
        }
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
    this.cd.markForCheck();
    this.loading = false;
  }

  /**
   * Handling error showing a message
   * @param error
   */
  private handleError(error: any = null) {
    this.loading = false;
    this.items = [{ label: error, value: null }];
    this.cd.markForCheck();
  }

  protected getFilters(): Filter[] {
    return this.displayInfo.filters;
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

  protected setOptions() {
    if (this.displayInfo && this.displayInfo.options) {
      this.resetDropdown();
      // there are options predefined in the metadata
      this.items = this.displayInfo.options.map((option: FieldOption) =>
        Object.create({ label: option.description, value: option.value })
      );
      this.loading = false;
    } else {
      this.getData();
    }
  }
}
