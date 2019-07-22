import { TableMetadataService } from '../../../../../../services/api/table/table-metadata.service';
import { ConfirmationService } from 'primeng/api';
import { TableEditableCellComponent } from '../table-editable-cell/table-editable-cell.component';
import { ItemChangeEvent } from '../../resources/table-events.interface';
import { TableFieldEvent, TableRowEvent } from '../../resources/table-events.interface';
import { TableConfig } from '../../resources/table-config.model';
import { TableColumnMetadata } from '../../resources/table-column-metadata.model';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SortDirection } from '../../resources/sort-direction.enum';
import { SelectionType } from '../../resources/selection-type.enum';
import { Paginator } from 'primeng/paginator';
import { GpFormFieldType } from '../../../../../form-wrapper/resources/form-field-type.enum';

/*
 *  Data order: data -> filteredData -> sortedData -> currentPageData
 *
 * */
@Component({
  selector: 'gp-table-editable',
  templateUrl: './table-editable.component.html',
  styleUrls: ['./table-editable.component.scss'],
})
export class TableEditableComponent {
  SelectionType = SelectionType;
  SortDirection = SortDirection;
  creationObject: any;
  editionObject: any;
  imgModalVisible: any = { visible: false };
  itemValid = true;
  onCreation = false;
  onEdition = false;

  // tslint:disable-next-line: variable-name
  private _columns: TableColumnMetadata[] = [];

  // tslint:disable-next-line: variable-name
  private _selectedData: any[] = [];
  readonly inputType = GpFormFieldType;
  textModalVisible: any = { visible: false };

  @ViewChild('pg') paginator: Paginator;
  /*
   * Context params
   * $implicit, index, columns
   * */
  @Input() rowTemplate: TemplateRef<any>;
  /*
   * Context params
   * $implicit, index, columns
   * */
  @Input() formTemplate: TemplateRef<any>;
  /*
   * Context params
   * $implicit, index
   * */
  @Input() actionsTemplate: TemplateRef<any>;

  @Input()
  get columns(): TableColumnMetadata[] {
    return this._columns;
  }

  set columns(value: TableColumnMetadata[]) {
    if (!value) {
      this._columns = [];
    } else {
      this._columns = value.sort((item1, item2) => {
        return item1.order - item2.order;
      });
    }
  }

  @Input() config = new TableConfig();
  @Input() data: any[];

  @Input()
  get selectedData(): any[] {
    return this._selectedData;
  }

  set selectedData(value: any[]) {
    this._selectedData = value || [];
    this.selectedDataChange.emit(this._selectedData);
  }

  @Output() selectedDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() deletedItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() createdItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() startEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
  @Output() stopEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
  @Output() cancelEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
  @Output() edit: EventEmitter<ItemChangeEvent> = new EventEmitter<ItemChangeEvent>();
  @Output() save: EventEmitter<ItemChangeEvent> = new EventEmitter<ItemChangeEvent>();
  @Output() create: EventEmitter<ItemChangeEvent> = new EventEmitter<ItemChangeEvent>();
  @Output() delete: EventEmitter<ItemChangeEvent> = new EventEmitter<ItemChangeEvent>();
  @Output() downloadFile: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @ViewChildren(TableEditableCellComponent) inputs: QueryList<TableEditableCellComponent>;
  @ViewChildren('formInput', { read: ElementRef }) formInputs: QueryList<ElementRef>;

  get filteredData() {
    if (!this.data) {
      return [];
    }
    if (this.config.filterable) {
      return this.data.filter((data) => {
        let valid = true;
        for (const column of this.columns) {
          if (!column || !column.filter || !data[column.name]) {
            continue;
          }
          const value = String(data[column.name]).toUpperCase();
          const filter = String(column.filter).toUpperCase();
          if (value.indexOf(filter) === -1) {
            valid = false;
            break;
          }
        }
        return valid;
      });
    } else {
      return this.data;
    }
  }

  get sortedData() {
    if (!this.config.sortable || !this.config.sortField) {
      return this.filteredData;
    }
    return this.filteredData.sort((a, b) => {
      const valueA = a[this.config.sortField];
      const valueB = b[this.config.sortField];
      if (
        (valueA < valueB && this.config.sortDirection === SortDirection.ASC) ||
        (valueA > valueB && this.config.sortDirection === SortDirection.DESC)
      ) {
        return -1;
      }
      if (
        (valueA > valueB && this.config.sortDirection === SortDirection.ASC) ||
        (valueA < valueB && this.config.sortDirection === SortDirection.DESC)
      ) {
        return 1;
      }
      return 0;
    });
  }

  get currentPageData() {
    return this.sortedData.slice(
      this.config.currentPage * this.config.itemsPerPage,
      this.config.currentPage * this.config.itemsPerPage + this.config.itemsPerPage
    );
  }

  get footerColspan() {
    if (this.columns) {
      let columnNumber = this.columns.filter((column) => column.visible).length;
      if (this.config && this.config.actionsColumn) {
        columnNumber += 1;
      }
      if (this.config && this.config.selectable === SelectionType.MULTIPLE) {
        columnNumber += 1;
      }
      return columnNumber;
    }
    return 0;
  }

  constructor(
    private confirmationService: ConfirmationService,
    private metadataService: TableMetadataService
  ) {}

  changeSort(column: TableColumnMetadata) {
    if (!this.config.sortable || !column.sortable) {
      return;
    }
    if (this.config.sortField !== column.name) {
      this.config.sortField = column.name;
      this.config.sortDirection = SortDirection.ASC;
    } else {
      this.config.sortDirection =
        this.config.sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    }
  }

  itemValueChanged(event: TableFieldEvent, item: any) {
    if (event && event.column) {
      this.inputs.forEach((input: TableEditableCellComponent) => {
        if (
          !input.isFilter &&
          input.columnMetadata.type === GpFormFieldType.DROPDOWN_RELATED &&
          input.columnMetadata.relatedFields.find((field) => {
            return field.field === event.column.name;
          })
        ) {
          input.getOptions();
        }
      });
    }
    this.itemValid = this.isItemValid(item);
    this.stopEditingField.emit(event);
  }

  changeFilter(column: TableColumnMetadata, filterValue) {
    this.paginator.changePage(0);
    if (column && this.inputs) {
      column.filter = filterValue;
      this.inputs.forEach((input: TableEditableCellComponent) => {
        if (
          input.isFilter &&
          input.columnMetadata.type === GpFormFieldType.DROPDOWN_RELATED &&
          input.columnMetadata.relatedFields
        ) {
          const related = input.columnMetadata.relatedFields.find((item) => {
            return item.field === column.name;
          });
          if (related) {
            related.value = filterValue;
            input.getOptions();
          }
        }
      });
    }
  }

  changePage(first: number, rows: number, page: number, pageCount: number) {
    this.config.currentPage = page;
    this.config.itemsPerPage = rows;
  }

  clearFilters() {
    for (const column of this.columns) {
      column.filter = null;
    }
  }

  isSelectable(item: any): boolean {
    if (this.config.selectable === SelectionType.NONE) {
      return false;
    }
    return !(this.config.selectableFn && !this.config.selectableFn(item, null, this.selectedData));
  }

  toggleItemSelection(item: any, event?) {
    if (event) {
      event.stopPropagation();
    }
    if (event && !event.target.tagName.startsWith('TR') && !event.target.tagName.startsWith('TD')) {
      return;
    }
    if (!this.isSelectable(item)) {
      return;
    }
    if (this.config.selectable === SelectionType.SINGLE) {
      if (this.itemIsSelected(item)) {
        this.selectedData = [];
      } else {
        this.selectedData = [item];
      }
    }
    if (this.config.selectable === SelectionType.MULTIPLE) {
      if (this.itemIsSelected(item)) {
        this.selectedData.splice(this.itemIndex(item), 1);
        this.selectedDataChange.emit(this.selectedData);
      } else {
        this.selectedData.push(item);
        this.selectedDataChange.emit(this.selectedData);
      }
    }
  }

  itemIsSelected(item: any): boolean {
    return this.itemIndex(item) !== -1;
  }

  itemIndex(item: any): number {
    return this.selectedData.findIndex((data) => {
      if (this.config.compareFn) {
        return this.config.compareFn(data, item);
      } else {
        for (const column of this.columns) {
          if (column.isId) {
            if (data[column.name] !== item[column.name]) {
              return false;
            }
          }
        }
        return true;
      }
    });
  }

  allSelected(): boolean {
    if (!this.selectedData || this.selectedData.length === 0) {
      return false;
    }
    const selectableData = this.filteredData.filter((item, index, arr) => {
      if (this.config.selectableFn) {
        return this.config.selectableFn(item, index, arr);
      }
      return true;
    });
    if (selectableData.length !== this.selectedData.length) {
      return false;
    }
    this.selectedData.forEach((item, index) => {
      if (this.config.compareFn && !this.config.compareFn(item, selectableData[index])) {
        return false;
      }
      if (item !== selectableData[index]) {
        return false;
      }
    });
    return true;
  }

  // Select all filtered data
  toggleSelectAll() {
    if (
      this.config.selectable === SelectionType.NONE ||
      this.config.selectable === SelectionType.SINGLE
    ) {
      return;
    }
    if (!this.allSelected()) {
      this.selectedData = [];
      for (const item of this.filteredData) {
        if (this.config.selectableFn && !this.config.selectableFn(item, null, this.selectedData)) {
          continue;
        }
        this.selectedData.push(item);
        this.selectedDataChange.emit(this.selectedData);
      }
    } else {
      this.selectedData = [];
    }
  }

  exportToCsv() {
    const csvSeparator = ';';
    let data = this.filteredData;
    if (this.selectedData && this.selectedData.length > 0) {
      data = this.selectedData;
    }
    let csv = '\ufeff';
    // headers
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];
      csv += '"' + (column.label || column.name) + '"';
      if (i < this.columns.length - 1) {
        csv += csvSeparator;
      }
    }

    // body
    data.forEach((row) => {
      csv += '\n';
      for (let k = 0; k < this.columns.length; k++) {
        const column = this.columns[k];
        // TODO TypeService || TypePipe
        // var cellData = this.objectUtils.resolveFieldData(row, column.name);
        let cellData = row[column.name];
        if (cellData !== null) {
          cellData = String(cellData).replace(/"/g, '""');
        } else {
          cellData = '';
        }
        csv += '"' + cellData + '"';
        if (k < this.columns.length - 1) {
          csv += csvSeparator;
        }
      }
    });
    // Export file
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, this.config.exportFilename + '.csv');
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', this.config.exportFilename + '.csv');
        link.click();
      } else {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        window.open(encodeURI(csv));
      }
      document.body.removeChild(link);
    }
  }

  createItem() {
    if (this.onCreation || this.onEdition) {
      return;
    }

    this.creationObject = {};
    this.itemValid = this.isItemValid(this.creationObject);
    this.onCreation = true;

    this.columns.forEach((column) => {
      if (column.type === GpFormFieldType.CHECKBOX || column.type === GpFormFieldType.SWITCH) {
        if (!this.creationObject[column.name] && column.uncheckedValue) {
          this.creationObject[column.name] = column.uncheckedValue;
          this.startEditingField.emit({ value: this.creationObject[column.name], column });
          this.stopEditingField.emit({ value: this.creationObject[column.name], column });
        }
      }
    });
    this.startEdition.emit({ item: this.creationObject, columns: this.columns });
    this.startFocus();
  }

  // Arrow function to be used in external template without losing scope
  beforeDeleteItem = (item: any) => {
    this.confirmationService.confirm({
      message: 'Desea eliminar el registro?',
      accept: () => {
        this.deleteItem(item);
      },
    });
  };
  deleteItem = (item: any) => {
    this.delete.emit({
      original: item,
      modified: null,
      success: () => {
        this.deletedItem.emit(item);
      },
    });
  };

  isEditable(item: any): boolean {
    if (this.config.editableFn) {
      return this.config.editableFn(item, this.columns);
    }
    return true;
  }

  isDeletable(item: any): boolean {
    if (this.config.deletableFn) {
      return this.config.deletableFn(item, this.columns);
    }
    return true;
  }

  // Arrow function to be used in external template without losing scope
  editItem = (item: any) => {
    if (this.onCreation || this.onEdition) {
      return;
    }

    const editFn = (editItem: any) => {
      this.editionObject = Object.assign({}, editItem);
      this.itemValid = this.isItemValid(this.editionObject);
      this.onEdition = true;
      item._editting = true;
      this.startEdition.emit({ item: this.editionObject, columns: this.columns });
      this.startFocus();
    };
    if (this.config.requestItemOnEdit) {
      this.edit.emit({
        original: item,
        modified: null,
        success: editFn,
      });
    } else {
      editFn(item);
    }
  };

  startFocus() {
    setTimeout((_) => {
      const firstInput = this.formInputs.first;
      if (firstInput) {
        const input = firstInput.nativeElement.querySelector('input');
        if (input) {
          input.focus();
        }
      }
    }, 300);
  }

  beforeSaveItem(original: any, modified: any) {
    const successSaved = (savedItem: any) => {
      delete original._editting;
      this.onEdition = false;
      Object.assign(original, savedItem);
      this.editionObject = null;
      this.stopEdition.emit({ item: savedItem, columns: this.columns });
    };
    if (this.config.beforeSaveFn) {
      const modifiedItem = this.config.beforeSaveFn(original, modified);
      this.save.emit({
        original,
        modified: modifiedItem,
        success: successSaved,
      });
    } else {
      this.save.emit({ original, modified, success: successSaved });
    }
  }

  beforeCreateItem(item: any) {
    const successCreated = (savedItem: any) => {
      this.cancelCreate();
      this.createdItem.emit(savedItem);
    };
    if (this.config.beforeCreateFn) {
      const modifiedItem = this.config.beforeCreateFn(item);
      this.create.emit({
        original: null,
        modified: modifiedItem,
        success: successCreated,
      });
    } else {
      this.create.emit({ original: null, modified: item, success: successCreated });
    }
  }

  cancel() {
    if (this.onEdition) {
      const items = this.data.filter((item) => item._editting);
      for (const item of items) {
        this.cancelEdit(item);
      }
    } else {
      this.cancelCreate();
    }
  }

  cancelCreate() {
    this.creationObject = null;
    this.onCreation = false;
  }

  cancelEdit(item: any) {
    delete item._editting;
    this.onEdition = false;
    this.editionObject = null;
    this.cancelEdition.emit(item);
  }

  isItemValid(item: any): boolean {
    if (this.config.validateFn) {
      return this.config.validateFn(item, this.columns);
    }
    let valid = true; // Use temp var instead direct return to check each column
    for (const column of this.columns) {
      if (column.validateFn) {
        if (!column.validateFn(item[column.name], item, column)) {
          valid = false;
        }
      } else {
        if (
          item.hasOwnProperty(column.name) &&
          !this.metadataService.isValid(item[column.name], column, this.onCreation)
        ) {
          valid = false;
        }
      }
    }

    return valid;
  }

  hasFile(item: any, column: TableColumnMetadata): boolean {
    return item[`${column.name}Empty`] === false;
  }

  download(item: any, column: TableColumnMetadata) {
    this.downloadFile.emit({ value: item, column });
  }
}
