import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { Filter } from '../../../../resources/data/filter/filter.model';
import { TableService } from '../../../../services/api/table/table.service';
import { MessagesService } from '../../../../services/core/messages.service';
import { FormTextFieldComponent } from '../../../form-wrapper/components/form-text-field/form-text-field.component';
import { FormImgFieldComponent } from '../../../form-wrapper/components/form-img-field/form-img-field.component';
import { FormTextAreaFieldComponent } from '../../../form-wrapper/components/form-text-area-field/form-text-area-field.component';
import { FormTimeFieldComponent } from '../../../form-wrapper/components/form-time-field/form-time-field.component';
import { FormSwitchFieldComponent } from '../../../form-wrapper/components/form-switch-field/form-switch-field.component';
import { FormDropdownFieldComponent } from '../../../form-wrapper/components/form-dropdown-field/form-dropdown-field.component';
import { FormDropdownRelatedFieldComponent } from '../../../form-wrapper/components/form-dropdown-related-field/form-dropdown-related-field.component';
import { FormCheckboxFieldComponent } from '../../../form-wrapper/components/form-checkbox-field/form-checkbox-field.component';
import { FormCalendarFieldComponent } from '../../../form-wrapper/components/form-calendar-field/form-calendar-field.component';
import { FormWysiwygFieldComponent } from '../../../form-wrapper/components/form-wysiwyg-field/form-wysiwyg-field.component';
import { GpFormField } from '../../../form-wrapper/resources/form-field.model';
import { GpFormControl } from '../../../form-wrapper/resources/form-control.model';
import { GpFormFieldType } from '../../../form-wrapper/resources/form-field-type.enum';
import { LocaleES } from '../../../../resources/localization';
import { FormNullableCheckboxComponent } from '../../../form-wrapper/components/form-nullable-checkbox-field/form-nullable-checkbox.component';
import { FormNumberFieldComponent } from '../../../form-wrapper/components/form-number-field/form-number-field.component';
import {
  FieldMetadata,
  FieldType,
  IModifiedField,
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { IDynamicFormConfig } from '../../../dynamic-form/dynamic-form.component';

@Component({
  selector: 'gp-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
})
export class TableCrudComponent implements AfterViewChecked {
  /**
   * Editing table name
   */
  @Input() tableName: string;

  /**
   * Filters property
   */
  @Input() filterField: string;

  /**
   * Filters from main table
   */
  @Input() rowSelectedFilters: Filter[];

  /**
   * Controls creation permission
   */
  @Input() canAdd = true;

  /**
   * Controls modification permission
   */
  @Input() canEdit = true;

  /**
   * Controls deletion permission
   */
  @Input() canDelete = true;

  /**
   * Emits an event on row selection
   */
  @Output() rowSelected = new EventEmitter<any>();

  /**
   * Emits an event on dialog close action
   */
  @Output() closedDialog = new EventEmitter<boolean>();

  /**
   * Emits an event on row changes
   */
  @Output() changes = new EventEmitter<boolean>();

  /**
   * Flag to check active jobs
   */
  working = true;

  /**
   * Table ID
   */
  tableId: string = null;

  /**
   * Editing table description
   */
  tableLabel: string;

  /**
   * Columns list
   */
  columns: GpFormField[] = [];

  /**
   * Table columns list
   */
  tableColumns: GpFormField[] = [];

  /**
   * Table data list
   */
  data: any[] = [];
  metadata: FieldMetadata;

  /**
   * Selected row property
   */
  selectedRow: any;

  /**
   * Filter property
   */
  filter: Filter;

  /**
   * Filter property list
   */
  filters: Filter[] = [];

  /**
   * Code property list
   */
  codes: string[] = [];

  /**
   * Filter code property
   */
  filterCode: string;

  /**
   * Filter column property
   */
  filterColumn: string;

  /**
   * Flag to show edition control field
   */
  displayEdicion = false;

  /**
   * Flag to check any dialog errors,
   * if so reloads the table.
   */
  dialogErrors = false;

  /**
   * Add selected codes property list
   */
  addSelectedCodes: any[] = [];

  /**
   * Form control property
   */
  formControl: GpFormControl = new GpFormControl();

  /**
   * Modified field
   */
  fieldsChanged: any = {};

  /**
   * Duplicated from tableColumns, adding field
   * and header fields, in order for PrimeNG
   * exportCSV() method to work
   */
  columnsToRender: any;

  config: IDynamicFormConfig = {
    cols: 1,
    canAdd: this.canAdd,
    canEdit: this.canEdit,
    canDelete: this.canDelete,
  };

  /* I18N */
  readonly localeEs = LocaleES;

  @ViewChildren(FormTextFieldComponent)
  textFormFields: QueryList<FormTextFieldComponent>;

  @ViewChildren(FormImgFieldComponent)
  imgFormFields: QueryList<FormImgFieldComponent>;

  @ViewChildren(FormTextAreaFieldComponent)
  textAreaFormFields: QueryList<FormTextAreaFieldComponent>;

  @ViewChildren(FormTimeFieldComponent)
  timeFormFields: QueryList<FormTimeFieldComponent>;

  @ViewChildren(FormSwitchFieldComponent)
  switchFormFields: QueryList<FormSwitchFieldComponent>;

  @ViewChildren(FormDropdownFieldComponent)
  dropdownFormFields: QueryList<FormDropdownFieldComponent>;

  @ViewChildren(FormDropdownRelatedFieldComponent)
  dropdownRelatedFormFields: QueryList<FormDropdownRelatedFieldComponent>;

  @ViewChildren(FormCheckboxFieldComponent)
  checkboxFormFields: QueryList<FormCheckboxFieldComponent>;

  @ViewChildren(FormCalendarFieldComponent)
  calendarFormFields: QueryList<FormCalendarFieldComponent>;

  @ViewChildren(FormWysiwygFieldComponent)
  wysiwygFormFields: QueryList<FormWysiwygFieldComponent>;

  @ViewChildren(FormNullableCheckboxComponent)
  nullableCheckboxFormFields: QueryList<FormNullableCheckboxComponent>;

  @ViewChildren(FormNumberFieldComponent)
  numberFormFields: QueryList<FormNumberFieldComponent>;

  constructor(
    private readonly router: Router,
    private readonly tableService: TableService,
    private readonly gpUtil: GPUtil,
    private el: ElementRef,
    private readonly messagesService: MessagesService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    if (this.el.nativeElement.querySelector('.ui-table-tbody')) {
      this.applyStickyShadow('.ui-table-tbody', '.ui-table-wrapper');
    }
  }

  /**
   * Initializes table with given name
   * @param tableName Table name
   * @deprecated Pass the table name via the input binding
   */
  initTable(tableName: string): void {
    this.tableName = tableName;
  }

  /**
   * Request data with new given filter or options
   * @param filters List of filters
   * @param fieldsToOrderBy Optional list of fields to order by
   */
  changeTableDetail(filters: Filter[], fieldsToOrderBy?: string[]): void {
    this.working = true;

    this.columns = [];
    this.tableColumns = [];
    this.data = [];
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.dialogErrors = false;

    this.filters = filters;

    this.tableService
      .list(this.tableName, true, true, fieldsToOrderBy, filters)
      .pipe(
        finalize(() => (this.working = false)),
        take(1)
      )
      .subscribe(
        (data) => {
          const requestError = !data.ok && data.error !== null && data.error.errorMessage !== null;

          if (requestError) {
            const expiredSession = data.error.errorMessage === LocaleES.ERROR.CONNECTION;

            if (expiredSession) {
              this.router.navigate(['login']);
            }

            const msg = data.error.errorMessage.toString() || LocaleES.ERROR.OPERATION;
            this.messagesService.showErrorAlert(msg);

            return;
          }

          this.updateDefinition(data.metadata);
          this.data = data.data;
        },

        (err) => console.error(err)
      );
  }

  private setOriginalRow() {
    const filters = [...[], ...this.filters];
    filters.forEach((filter) => {
      const fieldName = filter.field;
      const value = Array.isArray(filter.values) ? filter.values.shift() : null;
      this.formControl.originalRow[fieldName] = GPUtil.isUndefined(value) ? null : value;
    });
    this.cd.detectChanges();
  }

  private setFormControl() {
    this.formControl = new GpFormControl().assign({ editedRow: null, originalRow: {} }, true);
    if (this.metadata && this.metadata.hasOwnProperty('fields')) {
      this.metadata.fields.forEach(
        (field) => (this.formControl.originalRow[field.fieldName] = null)
      );
    }
    this.setOriginalRow();
  }

  /**
   * Call this method when a new table is selected
   * @param tableName Table name
   * @param fieldsToOrderBy Optional list of fields to order by
   */
  changeTable(tableName: string, fieldsToOrderBy?: string[]): void {
    if (
      this.tableName !== null &&
      tableName === this.tableName &&
      this.rowSelectedFilters === null
    ) {
      this.working = false;
      return;
    }
    this.working = true;
    this.columns = [];
    this.tableColumns = [];
    this.tableName = tableName;
    this.data = [];
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.dialogErrors = false;
    this.filters = [];

    if (this.rowSelectedFilters !== null) {
      this.filters = this.rowSelectedFilters;
    }

    this.tableService
      .list(this.tableName, true, true, fieldsToOrderBy, this.filters)
      .pipe(
        finalize(() => (this.working = false)),
        take(1)
      )
      .subscribe(
        (data) => {
          const requestError = !data.ok && data.error !== null && data.error.errorMessage !== null;

          if (requestError) {
            const expiredSession = data.error.errorMessage === LocaleES.ERROR.CONNECTION;

            if (expiredSession) {
              this.router.navigate(['login']);
            }

            const msg = data.error.errorMessage.toString() || LocaleES.ERROR.OPERATION;
            this.messagesService.showErrorAlert(msg);

            return;
          }

          this.updateDefinition(data.metadata);
          this.data = data.data;
        },

        (err) => console.error(err)
      );
  }

  /**
   * Updates table metadata
   * @param tableMetadata Metadata for table
   */
  updateDefinition(tableMetadata: FieldMetadata): void {
    const tempColumns: GpFormField[] = [];
    const tempTableColumns: GpFormField[] = [];

    this.metadata = tableMetadata;

    this.tableLabel = tableMetadata.tableLabel;

    tableMetadata.fields.forEach((metadata) => {
      const formField = new GpFormField().assign(
        {
          formControl: this.formControl,
          fieldMetadata: metadata,
        },
        true
      );

      // Save id for this table
      if (metadata.id) {
        this.tableId = metadata.fieldName;
      }

      tempColumns.push(formField);

      if (formField.fieldMetadata.lengthInTable !== 0) {
        tempTableColumns.push(formField);
      }
    });

    tempColumns.forEach((col) => this.calcFieldType(col));

    this.columns = tempColumns;
    this.tableColumns = tempTableColumns;

    // Add header and field to each column to be able to access p-table exportCSV() method
    this.columnsToRender = [...this.tableColumns];
    this.columnsToRender.forEach((column) => {
      column.header = column.fieldMetadata.displayInfo.fieldLabel;
      column.field = column.fieldMetadata.fieldName;
    });
  }

  /**
   * Define component type for given control
   * @param formField The form field to determine
   */
  calcFieldType(formField: GpFormField): void {
    const fieldType = GpFormFieldType[formField.fieldMetadata.displayInfo.displayType];

    if (!GPUtil.isNullOrUndefined(fieldType)) {
      formField.formFieldType = fieldType;
      return;
    }

    if (formField.fieldMetadata.fieldType === FieldType.DATE) {
      formField.formFieldType = GpFormFieldType.CALENDAR;
      return;
    }

    if (formField.fieldMetadata.fieldType === FieldType.BOOLEAN) {
      const hasFieldMetadata = formField.fieldMetadata.notNull;

      formField.formFieldType = hasFieldMetadata
        ? GpFormFieldType.SWITCH
        : GpFormFieldType.DROPDOWN;

      return;
    }

    // Defaults to string control
    formField.formFieldType = GpFormFieldType.TEXT;
  }

  /**
   * Logic to execute when a row has been selected
   */
  onRowSelect(): void {
    this.displayEdicion = false;
    this.rowSelected.emit(this.selectedRow);

    this.tableService
      .selectOneRow(this.tableName, JSON.stringify(this.selectedRow))
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this.messagesService.showErrorAlert(LocaleES.ERROR.RETRIEVE_RECORD);
            return;
          }

          this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
          this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
          this.formControl.edicionEdit = true;
          this.formControl.edicionAdd = false;
          this.displayEdicion = true;
          this.cd.detectChanges();
        },

        (err) => this.messagesService.showErrorAlert(LocaleES.ERROR.RETRIEVE_RECORD),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Logic to execute on dialog delete action
   */
  onDialogDelete($event: any = null): void {
    this.formControl.lockFields = true;
    const jsonDeleteRow = JSON.stringify(this.formControl.originalRow);

    this.tableService
      .deleteRow(this.tableName, jsonDeleteRow)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this.messagesService.showErrorAlert(
              LocaleES.ERROR.REMOVE_RECORD(data.error.errorMessage)
            );
            return;
          }

          // Deletes the entry
          const i = this.data.indexOf(this.selectedRow);
          if (i >= 0) {
            this.data.splice(i, 1);
          }

          this.closeDialog();
          this.changes.emit(true);
        },

        (err) => this.messagesService.showErrorAlert(LocaleES.ERROR.REMOVE_INTERNAL_RECORD),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Logic to execute on dialog save action
   */
  onDialogSave($event: any = null): void {
    this.formControl.lockFields = true;
    this.formControl.editedRow = $event;
    const jsonModifiedRow = JSON.stringify($event);
    const selectedRow = this.selectedRow !== null;
    selectedRow ? this.updateRow(jsonModifiedRow) : this.insertRow(jsonModifiedRow);
  }

  /**
   * Logic to execute on dialog close action
   */
  closeDialog($event: any = null): void {
    this.closedDialog.emit(true);
    this.displayEdicion = false;
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.formControl.edicionAdd = false;
    this.formControl.edicionEdit = false;
    this.formControl.lockFields = false;
    if (this.dialogErrors) {
      this.changeTable(this.tableName);
    }
  }

  /**
   * Logic to execute on dialog add action
   */
  onDialogAdd(): void {
    this.setFormControl();
    this.formControl.edicionAdd = true;
    this.formControl.edicionEdit = false;
    this.rowSelected.emit(this.selectedRow);
    this.displayEdicion = true;
    this.cd.detectChanges();
  }

  /**
   * Change event with provided input object
   * @param info Modifed field information object
   */
  onDropdownChangeEvent(info: IModifiedField): void {
    this.formControl.editedRow[info.fieldName] = info.value;
    this.fieldsChanged[info.fieldName] = info.value;
    this.fieldsChanged = Object.assign({}, this.fieldsChanged);
  }

  /**
   * Apply sticky shadow
   * @param tableElementBody Element body
   * @param tableElementWrapper Element wrapper
   */
  applyStickyShadow(tableElementBody, tableElementWrapper) {
    const tableBody = this.el.nativeElement.querySelector(tableElementBody);
    const tableWrapper = this.el.nativeElement.querySelector(tableElementWrapper);
    const tableBodyVisibleWidth = tableBody.offsetWidth;
    const tableWrapperWidth = tableWrapper.offsetWidth;

    if (tableWrapperWidth < tableBodyVisibleWidth) {
      tableWrapper.classList.add('shadowSticky');
    } else {
      tableWrapper.classList.remove('shadowSticky');
    }
  }

  /**
   * Updates row with provided input modified row data
   * @param jsonModifiedRow Modified row object
   */
  private updateRow(jsonModifiedRow: string): void {
    const jsonOriginalRow = JSON.stringify(this.formControl.originalRow);
    this.tableService
      .updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this.messagesService.showErrorAlert(
              LocaleES.ERROR.UPDATING_RECORD(data.error.errorMessage)
            );
            return;
          }

          this.closeDialog();
          this.changes.emit(true);
        },

        (err) => this.messagesService.showErrorAlert(LocaleES.ERROR.UPDATING_INTERNAL_RECORD),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Inserts a row with provided input row data
   * @param jsonModifiedRow Row data to insert
   */
  private insertRow(jsonModifiedRow: string): void {
    this.tableService
      .insertRow(this.tableName, jsonModifiedRow)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this.messagesService.showErrorAlert(
              LocaleES.ERROR.UPDATING_RECORD(data.error.errorMessage)
            );
            return;
          }

          this.data.push(data.insertedRow);
          this.closeDialog();
        },

        (err) => this.messagesService.showErrorAlert(LocaleES.ERROR.INSERTING_RECORD),

        () => (this.formControl.lockFields = false)
      );
  }
}
