import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { TableBuilder } from './table.builder';
import { TableModel } from './models/table.model';
import { TableColumn } from './models/table-column.model';
import { PaginationOptions } from './models/pagination-options.model';

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
  // @Watch(model => this.builder = buildModel(model))
  model: TableModel;

  @Input()
  loading = false;

  @Input()
  pagination: PaginationOptions;

  @Input()
  selectedRows: any[];

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @Output() page: EventEmitter<any> = new EventEmitter();

  @Output() sort: EventEmitter<any> = new EventEmitter();

  @Output() lazy: EventEmitter<any> = new EventEmitter();

  @Output() rowSelect: EventEmitter<any> = new EventEmitter();

  @Output() rowUnselect: EventEmitter<any> = new EventEmitter();

  @Output() selectedRowsChange: EventEmitter<any[]> = new EventEmitter();

  @ContentChildren(ColumnTemplateDirective)
  customColumns: QueryList<ColumnTemplateDirective>;

  @ContentChild('caption')
  captionContent: TemplateRef<any>;

  @ContentChild('header')
  headerContent: TemplateRef<any>;

  @ContentChild('footer')
  footerContent: TemplateRef<any>;

  builder: TableBuilder;

  ngAfterContentInit() {
    this.builder = new TableBuilder(this.model, this.customColumns, this.pagination);
  }

  onFilter(event: any, column: TableColumn) {
    this.filter.emit({ column: column.key, value: event.srcElement.value });
  }
}
