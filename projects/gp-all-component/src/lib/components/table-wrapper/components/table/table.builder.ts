import { TableModel } from './models/table.model';
import { QueryList } from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { isNullOrUndefined } from 'util';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';
import { SelectionMode } from './models/selection-mode.type';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';
import { CoreTableModel } from './models/core-table.model';

export class TableBuilder {
  // Once we receive a model, we parse it
  createModel(
    incomingModel: TableModel,
    customColumns?: QueryList<ColumnTemplateDirective>,
    editableColumns?: QueryList<EditableColumnTemplateDirective>,
    pagination?: PaginationOptions
  ): CoreTableModel {
    // 1. Parsing model to standard model
    const model = { ...new CoreTableModel(), ...incomingModel };

    // 2. Converting all the columns to standard format
    model.columns = this.toTableColumns(model.columns);

    // 3. Declaring all the custom columns
    model.customColumns = isNullOrUndefined(customColumns) ? [] : this.parseColumns(customColumns);

    // 4. Declaring all the editable columns
    model.editableColumns = isNullOrUndefined(editableColumns)
      ? []
      : this.parseColumns(editableColumns);

    // 5. Setting pagination flag
    model.pagination = !isNullOrUndefined(pagination);

    // 5. Setting enable filter row flag
    model.enableFilterRow =
      model.filterable ||
      !isNullOrUndefined((model.columns as TableColumn[]).find((column) => column.filterable));

    // 6. Set custom and editable columns
    model.customColumnsList = customColumns;
    model.editableColumnsList = editableColumns;

    return model;
  }

  getNative(model: CoreTableModel) {
    return model.native;
  }

  getTitle(model: CoreTableModel) {
    return model.title;
  }

  hasGlobalFilter(model: CoreTableModel) {
    return model.globalFilter;
  }

  enableFilterRow(model: CoreTableModel) {
    return model.enableFilterRow;
  }

  isFilterable(model: CoreTableModel, column?: TableColumn) {
    return isNullOrUndefined(column)
      ? model.filterable
      : isNullOrUndefined(column.filterable)
      ? model.filterable
      : column.filterable;
  }

  isSortable(model: CoreTableModel, column?: TableColumn) {
    return isNullOrUndefined(column)
      ? model.sortable
      : isNullOrUndefined(column.sortable)
      ? model.sortable
      : column.sortable;
  }

  isEditable(model: CoreTableModel) {
    return model.editable;
  }

  getLazy(model: CoreTableModel) {
    return model.lazy;
  }

  getPaginator(model: CoreTableModel) {
    return model.pagination;
  }

  getSelectionMode(model: CoreTableModel, mode?: SelectionMode) {
    if (!model) {
      return;
    }

    const modelSelection = model.selectable;

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

  getColumns(model: CoreTableModel) {
    return model.columns;
  }

  getFrozenColumns(model: CoreTableModel) {
    return model.columns;
  }

  getColumn(model: CoreTableModel, index: number) {
    return this.getColumns(model)[index];
  }

  isCustomColumn(model: CoreTableModel, key: string) {
    return !isNullOrUndefined(model.customColumns[key]);
  }

  getCustomColumn(model: CoreTableModel, key: string) {
    return model.customColumnsList.toArray()[model.customColumns[key]].template;
  }

  isEditableColumn(model: CoreTableModel, key: string) {
    return !isNullOrUndefined(model.editableColumns[key]);
  }

  getEditableColumn(model: CoreTableModel, key: string) {
    return model.editableColumnsList.toArray()[model.editableColumns[key]].template;
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
