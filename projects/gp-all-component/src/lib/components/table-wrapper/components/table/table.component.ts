import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { EditableColumnTemplateDirective } from './directives/editable-column-template.directive';
import { TableBuilder } from './table.builder';
import { TableModel } from './models/table.model';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';
import { OnChange } from 'property-watch-decorator';
import { Table } from 'primeng/table';

@Component({
  selector: 'gp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterContentInit {
  @Input()
  data: any[];

  @Input()
  loading = false;

  @Input()
  pagination: PaginationOptions;

  @Input()
  selected = [];

  @Input()
  @OnChange<TableModel>('buildModel')
  model: TableModel;

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

  @ContentChild('caption')
  captionContent: TemplateRef<any>;

  @ContentChild('header')
  headerContent: TemplateRef<any>;

  @ContentChild('footer')
  footerContent: TemplateRef<any>;

  @ViewChild('table')
  table: Table;

  builder = new TableBuilder();

  tableEditing = false;

  ngAfterContentInit() {
    this.buildModel();
  }

  onFilter(event: any, column: TableColumn) {
    this.table.filter(event.srcElement.value, column.key, 'contains');
    this.filter.emit({ column: column.key, value: event.srcElement.value });
  }

  private buildModel() {
    this.builder = new TableBuilder(
      this.model,
      this.customColumns,
      this.editableColumns,
      this.pagination
    );
  }
}
