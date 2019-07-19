import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { TableBuilder } from './table.builder';
import { TableModel } from './models/table.model';
import { TableColumn } from './models/table-column.model';

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

  @Output()
  filter = new EventEmitter<any>();

  @ContentChildren(ColumnTemplateDirective)
  customColumns: QueryList<ColumnTemplateDirective>;

  builder: TableBuilder;

  ngAfterContentInit() {
    this.builder = new TableBuilder(this.model, this.customColumns);
  }

  onFilter(event: any, column: TableColumn) {
    this.filter.emit({ column: column.key, value: event.srcElement.value });
  }
}
