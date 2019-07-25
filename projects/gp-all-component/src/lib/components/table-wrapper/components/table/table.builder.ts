import { TableModel } from './models/table.model';
import { QueryList } from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { isNullOrUndefined } from 'util';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';
import { SelectionMode } from './models/selection-mode.type';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';

export class TableBuilder {
  private model: TableModel;

  private customColumns: QueryList<ColumnTemplateDirective>;

  private editableColumns: QueryList<EditableColumnTemplateDirective>;

  // Once we receive a model, we parse it
  constructor(
    model = new TableModel(),
    customColumns?: QueryList<ColumnTemplateDirective>,
    editableColumns?: QueryList<EditableColumnTemplateDirective>,
    pagination?: PaginationOptions
  ) {
    // 1. Parsing model to standard model
    this.model = { ...new TableModel(), ...model };

    // 2. Converting all the columns to standard format
    this.model.columns = this.toTableColumns(model.columns);

    // 3. Declaring all the custom columns
    this.model.customColumns = isNullOrUndefined(customColumns)
      ? []
      : this.parseColumns(customColumns);

    this.customColumns = customColumns;

    // 4. Declaring all the editable columns
    this.model.editableColumns = isNullOrUndefined(editableColumns)
      ? []
      : this.parseColumns(editableColumns);

    this.editableColumns = editableColumns;

    // 5. Setting pagination flag
    this.model.pagination = !isNullOrUndefined(pagination);

    // 5. Setting enable filter row flag
    this.model.enableFilterRow =
      this.model.filterable ||
      !isNullOrUndefined((this.model.columns as TableColumn[]).find((column) => column.filterable));
  }

  get native() {
    return this.model.native;
  }

  getTitle() {
    return this.model.title;
  }

  hasGlobalFilter() {
    return this.model.globalFilter;
  }

  enableFilterRow() {
    return this.model.enableFilterRow;
  }

  isFilterable(column?: TableColumn) {
    return isNullOrUndefined(column)
      ? this.model.filterable
      : isNullOrUndefined(column.filterable)
      ? this.model.filterable
      : column.filterable;
  }

  isSortable(column?: TableColumn) {
    return isNullOrUndefined(column)
      ? this.model.sortable
      : isNullOrUndefined(column.sortable)
      ? this.model.sortable
      : column.sortable;
  }

  isEditable() {
    return this.model.editable;
  }

  getLazy() {
    return this.model.lazy;
  }

  getPaginator() {
    return this.model.pagination;
  }

  getSelectionMode(mode?: SelectionMode) {
    const modelSelection = this.model.selectable;

    if (mode) {
      return modelSelection === mode;
    }

    if (modelSelection === 'checkbox') {
      return 'multiple';
    }

    if (modelSelection === 'radius') {
      return 'single';
    }

    return modelSelection;
  }

  getColumns() {
    return this.model.columns;
  }

  getFrozenColumns() {
    return this.model.columns;
  }

  getColumn(index: number) {
    return this.getColumns()[index];
  }

  isCustomColumn(key: string) {
    return !isNullOrUndefined(this.model.customColumns[key]);
  }

  getCustomColumn(key: string) {
    return this.customColumns.toArray()[this.model.customColumns[key]].template;
  }

  isEditableColumn(key: string) {
    return !isNullOrUndefined(this.model.editableColumns[key]);
  }

  getEditableColumn(key: string) {
    return this.editableColumns.toArray()[this.model.editableColumns[key]].template;
  }

  /**
   * Batch convert a list of columns to default TableColumn format
   * @param columns The column list to be converted
   */
  private toTableColumns(columns: TableColumn[] | string[]) {
    const newColumns = [];
    for (const column of columns) {
      newColumns.push(this.toTableColumn(column));
    }
    return newColumns;
  }

  /**
   * Convert column to default TableColumn format
   * @param column The column to be converted
   */
  private toTableColumn(column: string | TableColumn): TableColumn {
    if (typeof column === 'string') {
      return { ...new TableColumn(), key: column };
    }

    return { ...new TableColumn(), ...column };
  }

  // Create the columns model from the received elements
  private parseColumns(
    columns: QueryList<ColumnTemplateDirective> | QueryList<EditableColumnTemplateDirective>
  ) {
    const columnsList = {};
    columns.forEach((column, index) => (columnsList[column.getKey()] = index));
    return columnsList;
  }
}
