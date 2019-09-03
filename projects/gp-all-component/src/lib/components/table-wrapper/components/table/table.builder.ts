import { TableModel } from './models/table.model';
import { QueryList, TemplateRef } from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { isNullOrUndefined } from 'util';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';
import { SelectionMode } from './models/selection-mode.type';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';
import { CoreTableModel } from './models/core-table.model';
import { NativeOptions } from './models/native-options.model';

export class TableBuilder {
  // Once we receive a model, we parse it
  createModel(
    incomingModel: TableModel,
    customColumns?: QueryList<ColumnTemplateDirective>,
    editableColumns?: QueryList<EditableColumnTemplateDirective>,
    pagination?: PaginationOptions
  ): CoreTableModel {
    // 1. Parsing model to standard model
    const model = { ...new CoreTableModel(), ...incomingModel } as CoreTableModel;

    // 2. Converting all the columns to standard format
    model.columns = this.toTableColumns(model.columns);

    // 3. Declaring all the custom columns
    model.customColumns = this.parseColumns(customColumns);

    // 4. Declaring all the editable columns
    model.editableColumns = this.parseColumns(editableColumns);

    // 5. Setting pagination flag
    model.pagination = !isNullOrUndefined(pagination);

    // 6. Set custom and editable columns
    model.customColumnsList = customColumns;
    model.editableColumnsList = editableColumns;

    return model;
  }

  getNative(model: CoreTableModel): NativeOptions {
    return model.native;
  }

  getTitle(model: CoreTableModel): string {
    return model.title;
  }

  enableCaptionRow(model: CoreTableModel, captionContent?: TemplateRef<any>): boolean {
    return !isNullOrUndefined(model.title) || !isNullOrUndefined(captionContent);
  }

  enableFilterRow(model: CoreTableModel) {
    return (
      model.filterable ||
      !isNullOrUndefined((model.columns as TableColumn[]).find((column) => column.filterable))
    );
  }

  hasGlobalFilter(model: CoreTableModel): boolean {
    return model.globalFilter;
  }

  isFilterable(model: CoreTableModel, column?: TableColumn): boolean {
    return isNullOrUndefined(column)
      ? model.filterable
      : isNullOrUndefined(column.filterable)
      ? model.filterable
      : column.filterable;
  }

  isSortable(model: CoreTableModel, column?: TableColumn): boolean {
    return isNullOrUndefined(column)
      ? model.sortable
      : isNullOrUndefined(column.sortable)
      ? model.sortable
      : column.sortable;
  }

  isEditable(model: CoreTableModel): boolean {
    return model.editable;
  }

  getLazy(model: CoreTableModel): boolean {
    return model.lazy;
  }

  getPaginator(model: CoreTableModel): boolean {
    return model.pagination;
  }

  isSelectionMode(model: CoreTableModel, mode: SelectionMode): boolean {
    return model.selectable === mode;
  }

  getSelectionMode(model: CoreTableModel): SelectionMode {
    if (!model) {
      return;
    }

    const modelSelection = model.selectable;

    if (modelSelection === 'checkbox') {
      return 'multiple';
    }

    if (modelSelection === 'radius') {
      return 'single';
    }

    return modelSelection;
  }

  getRowValue(column: TableColumn, row: any): string {
    if (column.key instanceof Array && column.key.length) {
      const keys = [...[], ...column.key];
      const initValue = row[keys.shift()];
      if (initValue) {
        return keys.reduce((accumulator, currentValue) => {
          if (accumulator[currentValue]) {
            return accumulator[currentValue];
          } else {
            return '';
          }
        }, initValue);
      } else {
        return '';
      }
    }
    return row[column.key];
  }

  getColumns(model: CoreTableModel): TableColumn[] {
    return model.columns;
  }

  getColumn(model: CoreTableModel, index: number): TableColumn {
    return this.getColumns(model)[index];
  }

  isCustomColumn(model: CoreTableModel, key: string): boolean {
    return !isNullOrUndefined(model.customColumns[key]);
  }

  getCustomColumn(model: CoreTableModel, key: string): TemplateRef<ColumnTemplateDirective> {
    return model.customColumnsList.toArray()[model.customColumns[key]].template;
  }

  isEditableColumn(model: CoreTableModel, key: string): boolean {
    return !isNullOrUndefined(model.editableColumns[key]);
  }

  getEditableColumn(
    model: CoreTableModel,
    key: string
  ): TemplateRef<EditableColumnTemplateDirective> {
    return model.editableColumnsList.toArray()[model.editableColumns[key]].template;
  }

  /**
   * Batch convert a list of columns to default TableColumn format
   * @param columns The column list to be converted
   */
  private toTableColumns(columns: TableColumn[] | string[]): TableColumn[] {
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
  ): { [key: string]: number } {
    if (isNullOrUndefined(columns)) {
      return {};
    }

    const columnsList = {};
    columns.forEach((column, index) => (columnsList[column.getKey()] = index));
    return columnsList;
  }
}
