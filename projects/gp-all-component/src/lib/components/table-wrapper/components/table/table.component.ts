import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';
import { TableBuilder } from './table.builder';
import { TableModel } from './models/table.model';
import { CoreTableModel } from './models/core-table.model';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';
import { OnChange } from 'property-watch-decorator';
import { Table } from 'primeng/table';
import { LocaleES } from './../../../../resources/localization/es-ES.lang';
import {
  Field,
  FieldMetadata, //
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { RowComponent } from './row/row.component';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  @ViewChild('refCaption') $caption: ElementRef;
  @ViewChildren(RowComponent) $rows: QueryList<RowComponent>;
  // tslint:disable-next-line
  private _model: TableModel;

  @Input() loading = false;

  @Input() pagination: PaginationOptions;

  @Input() selected = null;

  @Input() @OnChange<FieldMetadata>('buildTable') metadata: FieldMetadata;

  @Input() @OnChange<any>('buildTable') data: any;

  @Input() emptyMessage = LocaleES.NO_RECORDS_FOUND;

  @Input()
  set model(value: TableModel) {
    const newValue = new TableModel().assign(value, true);
    this._model = this.isDynamic ? this.buildDynamicModel(newValue) : newValue;
  }

  get model() {
    return this._model;
  }

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @Output() page: EventEmitter<any> = new EventEmitter();

  @Output() sort: EventEmitter<any> = new EventEmitter();

  @Output() lazy: EventEmitter<any> = new EventEmitter();

  @Output() rowSelect: EventEmitter<any> = new EventEmitter();

  @Output() rowUnselect: EventEmitter<any> = new EventEmitter();

  @Output() selectedChange: EventEmitter<any[]> = new EventEmitter();

  @Output() saveRow: EventEmitter<any> = new EventEmitter();

  @Output() deleteRow: EventEmitter<any> = new EventEmitter();

  @ContentChildren(ColumnTemplateDirective)
  customColumns: QueryList<ColumnTemplateDirective>;

  @ContentChildren(EditableColumnTemplateDirective)
  editableColumns: QueryList<EditableColumnTemplateDirective>;

  @ContentChild('caption') captionContent: TemplateRef<any>;
  @ContentChild('header') headerContent: TemplateRef<any>;
  @ContentChild('footer') footerContent: TemplateRef<any>;
  @ContentChild('summary') summaryContent: TemplateRef<any>;

  @ViewChild('table') table: Table;

  builder = new TableBuilder();

  tableEditing = false;

  coreModel: CoreTableModel;

  isDynamic = false;

  isCreating = false;

  // when a row is editing
  isRowEditing = false;

  // when all rows are selected
  selectedAll = false;

  // selectionOnly
  selectionOnly = false;

  private cols: TableColumn[];

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (GPUtil.isNullOrUndefined(this.coreModel)) {
      this.buildModel();
    }
  }

  /**
   * Emit an event when any filter receives an input
   * @param event The filter input event
   * @param column The filter column
   */
  onFilter(event: any, column: TableColumn): void {
    this.table.filter(event.srcElement.value, column.field, 'contains');
    this.filter.emit({ column: column.field, value: event.srcElement.value });
  }

  /**
   * Builds the table model
   */
  private buildModel(): void {
    if (!GPUtil.isNullOrUndefined(this.model)) {
      this.coreModel = this.builder.createModel(
        this.model,
        this.customColumns,
        this.editableColumns,
        this.pagination
      );

      this.cd.detectChanges();
    }
  }

  private buildTable(): void {
    if (this.data) {
      if (this.metadata) {
        // The table is dynamic
        this.cols = this.metadata.fields
          .filter((field: Field) => !!field.displayInfo.displayType)
          .map((field) => {
            return new TableColumn().assign(
              {
                field: field.fieldName,
                header: field.displayInfo.fieldLabel,
              },
              true
            );
          });

        this.pagination = {
          rows: 10,
          totalRecords: this.data.length,
        } as PaginationOptions;
        this.builder.metadata = this.metadata;
        this.builder.data = this.data;
        this.builder.isDynamic = this.isDynamic = true;
        this._model = this.buildDynamicModel(this.model);
        this._model.editable = true;
      }

      this.buildModel();
    }
  }

  private buildDynamicModel(newValue: TableModel = null): TableModel {
    if (newValue && newValue.hasOwnProperty('columns')) {
      delete newValue.columns;
    }
    const model = new TableModel().assign({
      sortable: true,
      editable: true,
      columns: this.cols,
      pagination: true,
      lazy: false,
      native: {
        rowsPerPageOptions: [5, 10, 20],
        paginatorPosition: 'bottom',
        dataKey: 'id',
        defaultSortKey: 'id',
        defaultSortOrder: -1,
      },
    });
    return Object.assign(model, newValue);
  }

  createRow() {
    const newRow = {};
    if (this.builder.metadata && this.builder.metadata.fields) {
      for (const key of this.builder.metadata.fields) {
        newRow[key.fieldName] = null;
      }
    }
    return newRow;
  }

  cancelCreateRow() {
    if (this.isCreating) {
      this.isCreating = false;
      this.table.value.shift();
    }
    return null;
  }

  onPageEvent($event) {
    this.cancelCreateRow();
    this.cancelRowEdition();
    this.page.emit($event);
  }

  onRowEditionEvent($event: boolean) {
    this.isRowEditing = $event;
    this.tableEditing = $event;
  }

  onCreateRow() {
    this.isCreating = true;
  }

  onCancelEditionEvent() {
    if (this.isCreating) {
      this.cancelCreateRow();
    }
    this.isRowEditing = false;
  }

  onSort($event) {
    this.onCancelEditionEvent();
    this.cancelRowEdition();
    this.sort.emit($event);
  }

  onRowSelect($event) {
    this.rowSelect.emit($event);
  }

  onRowUnSelect($event) {
    this.selectionOnly = true;
    this.rowUnselect.emit($event);
  }

  onSelectedChangeEvent($event) {
    if ($event.length === this.data.length || $event.length === 0) {
      this.selectedAll = $event.length === this.data.length;
      this.selectionOnly = $event.length === this.data.length;
    }
    this.selectedChange.emit($event);
  }

  cancelRowEdition() {
    if (!GPUtil.isNullOrUndefined(this.$rows) && this.isRowEditing) {
      this.$rows.forEach(($row) => $row.cancelEdition());
    }
  }
}
