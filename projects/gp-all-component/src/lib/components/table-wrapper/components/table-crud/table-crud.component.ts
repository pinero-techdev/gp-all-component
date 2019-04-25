import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
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
import { FilterOperationType } from '../../../../resources/data/filter/filter-operation-type.enum';
import { InfoCampoModificado } from '../../../../resources/data/info-campo-modificado.model';
import { GpTableDisplayTypes } from '../../resources/gp-table-display-types.enum';
import { DataTableMetaData } from '../../../../resources/data/data-table/meta-data/data-table-meta-data.model';
import { GpFormField } from '@lib/components/form-wrapper/resources/gp-form-field.model';
import { GpFormControl } from '@lib/components/form-wrapper/resources/gp-form-control.model';
import { GpFormFieldType } from '@lib/components/form-wrapper/resources/gp-form-field-type.enum';
import { GpFormFieldControl } from '@lib/components/form-wrapper/resources/gp-form-field-control';

@Component({
  selector: 'gp-app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
})
export class TableCrudComponent {
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
   * Constrols creation permission
   */
  @Input() canAdd = true;

  /**
   * Constrols modification permission
   */
  @Input() canEdit = true;

  /**
   * Constrols deletion permission
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

  constructor(
    private readonly _router: Router,
    private readonly _tableService: TableService,
    private readonly _gpUtil: GPUtil,
    private readonly _messagesService: MessagesService
  ) {}

  /**
   * Initializes table with given name
   * @param tableName Table name
   * @deprecated Pass the table name via the input binding
   */
  inicializaTabla(tableName: string): void {
    this.tableName = tableName;
  }

  /**
   * Request data with new given filter or options
   * @param filters List of filters
   * @param fieldsToOrderBy Optional list of fields to order by
   */
  cambiaTablaDetail(filters: Filter[], fieldsToOrderBy?: string[]): void {
    this.working = true;

    this.columns = [];
    this.tableColumns = [];
    this.data = [];
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.dialogErrors = false;

    this.filters = filters;

    this._tableService
      .list(this.tableName, true, true, fieldsToOrderBy, filters)
      .pipe(
        finalize(() => (this.working = false)),
        take(1)
      )
      .subscribe(
        (data) => {
          const requestError = !data.ok && data.error !== null && data.error.errorMessage !== null;

          if (requestError) {
            const expiredSession =
              data.error.errorMessage === 'No se ha establecido sesion o se ha perdido.';

            if (expiredSession) {
              this._router.navigate(['login']);
            }

            const msg =
              data.error.errorMessage.toString() ||
              'Se ha producido un error realizando la operación solicitada.';
            this._messagesService.showErrorAlert(msg);

            return;
          }

          this.actualizaDefinicion(data.metadata);
          this.data = data.data;
        },

        (err) => console.error(err)
      );
  }

  /**
   * Call this method when a new table is selected
   * @param tableName Table name
   * @param fieldsToOrderBy Optional list of fields to order by
   */
  cambiaTabla(tableName: string, fieldsToOrderBy?: string[]): void {
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

    this._tableService
      .list(this.tableName, true, true, fieldsToOrderBy, this.filters)
      .pipe(
        finalize(() => (this.working = false)),
        take(1)
      )
      .subscribe(
        (data) => {
          const requestError = !data.ok && data.error !== null && data.error.errorMessage !== null;

          if (requestError) {
            const expiredSession =
              data.error.errorMessage === 'No se ha establecido sesion o se ha perdido.';

            if (expiredSession) {
              this._router.navigate(['login']);
            }

            const msg =
              data.error.errorMessage.toString() ||
              'Se ha producido un error realizando la operación solicitada.';
            this._messagesService.showErrorAlert(msg);

            return;
          }

          this.actualizaDefinicion(data.metadata);
          this.data = data.data;
        },

        (err) => console.error(err)
      );
  }

  /**
   * Updates table metadata
   * @param tableMetadata Metadata for table
   */
  actualizaDefinicion(tableMetadata: DataTableMetaData): void {
    const tempColumns: GpFormField[] = [];
    const tempTableColumns: GpFormField[] = [];

    this.tableLabel = tableMetadata.tableLabel;

    tableMetadata.fields.forEach((metadata) => {
      const formField = new GpFormField(this.formControl, metadata);

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
   * Match field type for given form field
   * @param formField Field to be matched
   */
  matchFieldType(formField: GpFormField): string {
    const displayTypes: Map<string, string> = new Map([
      [GpTableDisplayTypes.TEXT_AREA, GpFormFieldType.TEXT_AREA],
      [GpTableDisplayTypes.DROPDOWN, GpFormFieldType.DROPDOWN],
      [GpTableDisplayTypes.DROPDOWN_RELATED, GpFormFieldType.DROPDOWN_RELATED],
      [GpTableDisplayTypes.CHECKBOX, GpFormFieldType.CHECKBOX],
      [GpTableDisplayTypes.SWITCH, GpFormFieldType.SWITCH],
      [GpTableDisplayTypes.CALENDAR, GpFormFieldType.CALENDAR],
      [GpTableDisplayTypes.HOUR_MINUTE, GpFormFieldType.TIME],
      [GpTableDisplayTypes.WYSIWYG, GpFormFieldType.WYSIWYG],
      [GpTableDisplayTypes.IMG, GpFormFieldType.IMG],
    ]);

    return displayTypes.get(formField.fieldMetadata.displayInfo.displayType);
  }

  /**
   * Define component type for given control
   * @param formField The form field to determine
   */
  calcFieldType(formField: GpFormField): void {
    const fieldType = this.matchFieldType(formField);

    if (fieldType !== null) {
      formField.formFieldType = fieldType;
      return;
    }

    if (formField.fieldMetadata.fieldType === 'DATE') {
      formField.formFieldType = GpFormFieldType.CALENDAR;
      return;
    }

    if (formField.fieldMetadata.fieldType === 'BOOLEAN') {
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
    this.rowSelected.emit(this.selectedRow);

    this._tableService
      .selectOneRow(this.tableName, JSON.stringify(this.selectedRow))
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this._messagesService.showErrorAlert('Error recuperando el registro.');
            return;
          }

          this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
          this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
          const self = this;
          this.forEachFieldControl((col: GpFormFieldControl) => {
            col.copyValueFromEditedRowToControl(self.formControl.editedRow);
            col.clearValidations();
          });
          this.formControl.edicionEdit = true;
          this.displayEdicion = true;
        },

        (err) => this._messagesService.showErrorAlert('Error interno recuperando el registro.'),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Logic to execute on dialog delete action
   */
  onDialogDelete(): void {
    this.formControl.lockFields = true;
    const jsonDeleteRow = JSON.stringify(this.formControl.originalRow);

    this._tableService
      .deleteRow(this.tableName, jsonDeleteRow)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this._messagesService.showErrorAlert(
              'Error borrando el registro: ' + data.error.errorMessage
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

        (err) => this._messagesService.showErrorAlert('Error interno borrando el registro.'),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Logic to execute on dialog save action
   */
  onDialogSave(): void {
    this.formControl.lockFields = true;
    const self = this;

    this.forEachFieldControl((col: GpFormFieldControl) => {
      col.copyValueFromControlToEditedRow(self.formControl.editedRow);
    });

    if (!this.validateEditRow()) {
      this.formControl.lockFields = false;
      return;
    }

    const jsonModifiedRow = JSON.stringify(this.formControl.editedRow);

    const selectedRow = this.selectedRow !== null;

    selectedRow ? this.updateRow(jsonModifiedRow) : this.insertRow(jsonModifiedRow);
  }

  /**
   * Logic to execute on dialog close action
   */
  closeDialog(): void {
    this.closedDialog.emit(true);
    this.displayEdicion = false;
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.formControl.edicionAdd = false;
    this.formControl.edicionEdit = false;
    this.formControl.lockFields = false;
    if (this.dialogErrors) {
      this.cambiaTabla(this.tableName);
    }
  }

  /**
   * Logic to execute on dialog add action
   */
  onDialogAdd(): void {
    this.selectedRow = null;
    this.rowSelected.emit(this.selectedRow);
    this.formControl.originalRow = null;
    this.formControl.editedRow = {};
    const self = this;

    this.forEachFieldControl((col: GpFormFieldControl) => {
      const lengthGreaterThanZero = self.addSelectedCodes.length > 0;

      if (lengthGreaterThanZero) {
        self.addSelectedCodes.forEach((code) => {
          if (code.key === col.getFormField().fieldMetadata.fieldName) {
            self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = code.value;
          }
        });
      }

      if (!lengthGreaterThanZero) {
        const fieldName = col.getFormField().fieldMetadata.fieldName;
        const filter: Filter = self._gpUtil.getElementFromArray(self.filters, 'field', fieldName);

        if (
          filter !== null &&
          filter.op === FilterOperationType.EQUAL &&
          filter.values.length === 1
        ) {
          self.formControl.editedRow[fieldName] = filter.values[0];
        } else {
          self.formControl.editedRow[fieldName] = null;
        }
      }

      col.copyValueFromEditedRowToControl(self.formControl.editedRow);
      col.clearValidations();
    });

    this.formControl.edicionEdit = false;
    this.formControl.edicionAdd = true;
    this.displayEdicion = true;
  }

  /**
   * Iterates each column and applies passed callback
   * @param f Logic to be executed for each iteration
   */
  private forEachField(f: (col: GpFormField) => void): void {
    this.columns.forEach((col) => {
      f(col);
    });
  }

  /**
   * Iterates each field control and applies passed callback
   * @param f Logic to be executed for each iteration
   */
  private forEachFieldControl(f: (col: GpFormControl) => void): void {
    this.textFormFields.forEach((col) => {
      f(col);
    });
    this.textAreaFormFields.forEach((col) => {
      f(col);
    });
    this.timeFormFields.forEach((col) => {
      f(col);
    });
    this.switchFormFields.forEach((col) => {
      f(col);
    });
    this.dropdownFormFields.forEach((col) => {
      f(col);
    });
    this.dropdownRelatedFormFields.forEach((col) => {
      f(col);
    });
    this.checkboxFormFields.forEach((col) => {
      f(col);
    });
    this.calendarFormFields.forEach((col) => {
      f(col);
    });
    this.wysiwygFormFields.forEach((col) => {
      f(col);
    });
    this.imgFormFields.forEach((col) => {
      f(col);
    });
  }

  /**
   * Change event with provided input object
   * @param info Modifed field information object
   */
  changeEvent(info: InfoCampoModificado): void {
    this.fieldsChanged[info.field] = info.value;
    this.fieldsChanged = Object.assign({}, this.fieldsChanged);
  }

  /**
   * Updates row with provided input modified row data
   * @param jsonModifiedRow Modified row object
   */
  private updateRow(jsonModifiedRow: string): void {
    const self = this;
    const jsonOriginalRow = JSON.stringify(this.formControl.originalRow);

    this._tableService
      .updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this._messagesService.showErrorAlert(
              'Error actualizando el registro: ' + data.error.errorMessage
            );
            return;
          }

          this.forEachField((col: GpFormField) => {
            self.selectedRow[col.fieldMetadata.fieldName] =
              self.formControl.editedRow[col.fieldMetadata.fieldName];
          });

          this.closeDialog();
          this.changes.emit(true);
        },

        (err) => this._messagesService.showErrorAlert('Error interno actualizando el registro.'),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Inserts a row with provided input row data
   * @param jsonModifiedRow Row data to insert
   */
  private insertRow(jsonModifiedRow: string): void {
    this._tableService
      .insertRow(this.tableName, jsonModifiedRow)
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (!data.ok) {
            this._messagesService.showErrorAlert(
              'Error actualizando el registro: ' + data.error.errorMessage
            );
            return;
          }

          this.data.push(data.insertedRow);
          this.closeDialog();
        },

        (err) => this._messagesService.showErrorAlert('Error interno insertando el registro.'),

        () => (this.formControl.lockFields = false)
      );
  }

  /**
   * Validates row edition
   */
  private validateEditRow(): boolean {
    let valid = true;
    const self = this;

    this.forEachFieldControl((col: GpFormFieldControl) => {
      const inAddOperation =
        self.formControl.edicionAdd || col.getFormField().fieldMetadata.hideInAddOperation;

      if (!inAddOperation) {
        valid = col.validateField(self.formControl.editedRow) && valid;
      }
    });

    return valid;
  }
}
