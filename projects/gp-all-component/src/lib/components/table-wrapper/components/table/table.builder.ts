import { TableModel } from './models/table.model';
import { QueryList } from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { isNullOrUndefined } from 'util';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';

export class TableBuilder {
  private model: TableModel;

  private customColumns: QueryList<ColumnTemplateDirective>;

  // Once we receive a model, we parse it
  constructor(
    model = new TableModel(),
    customColumns?: QueryList<ColumnTemplateDirective>,
    pagination?: PaginationOptions
  ) {
    // 1. Parsing model to standard model
    this.model = { ...new TableModel(), ...model };

    // 2. Converting all the columns to standard format
    this.model.columns = this.toTableColumns(model.columns);

    // 3. Declaring all the custom columns
    this.model.customColumns = isNullOrUndefined(customColumns)
      ? []
      : this.parseCustomColumns(customColumns);

    this.customColumns = customColumns;

    // 4. Setting pagination flag
    this.model.pagination = !isNullOrUndefined(pagination);
  }

  get native() {
    return this.model.native;
  }

  getTitle() {
    return this.model.title;
  }

  isFilterable(column?: TableColumn) {
    return isNullOrUndefined(column)
      ? this.model.filterable
      : (isNullOrUndefined(column.filterable) || column.filterable) && this.model.filterable;
  }

  isSortable(column?: TableColumn) {
    return isNullOrUndefined(column)
      ? this.model.sortable
      : (isNullOrUndefined(column.sortable) || column.sortable) && this.model.sortable;
  }

  getLazy() {
    return this.model.lazy;
  }

  getPaginator() {
    return this.model.pagination;
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

  // Create the custom columns model from the received elements
  private parseCustomColumns(columns: QueryList<ColumnTemplateDirective>) {
    const columnsList = {};
    columns.forEach((column, index) => (columnsList[column.getKey()] = index));
    return columnsList;
  }
}
