import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
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
import { LocaleES } from '../../../../resources/localization/es-ES.lang';

@Component({
  selector: 'gp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterContentInit {
  @Input() data: any[];

  @Input() loading = false;

  @Input() pagination: PaginationOptions;

  @Input() selected;

  @Input() emptyMessage = LocaleES.NO_RECORDS_FOUND;

  @Input()
  @OnChange<TableModel>('buildModel')
  model: TableModel;

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @Output() page: EventEmitter<any> = new EventEmitter();

  @Output() sort: EventEmitter<any> = new EventEmitter();

  @Output() lazy: EventEmitter<any> = new EventEmitter();

  @Output() rowSelect: EventEmitter<any> = new EventEmitter();

  @Output() rowUnselect: EventEmitter<any> = new EventEmitter();

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

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

  ngAfterContentInit(): void {
    this.buildModel();
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
    this.coreModel = new TableBuilder().createModel(
      this.model,
      this.customColumns,
      this.editableColumns,
      this.pagination
    );
  }
}
