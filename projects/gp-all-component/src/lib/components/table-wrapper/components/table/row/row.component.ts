import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { TableBuilder } from '../table.builder';
import { CoreTableModel } from '../models/core-table.model';
import { TableColumn } from '../models/table-column.model';
import { SaveEvent } from '../models/save-event.model';

@Component({
  // tslint:disable-next-line
  selector: '[gpRow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @Input()
  row: any;

  @Input()
  model = new CoreTableModel();

  @Input()
  index: number;

  @Input()
  tableEditing: boolean;

  @Output()
  editing: EventEmitter<boolean> = new EventEmitter();

  @Output()
  delete: EventEmitter<TableColumn> = new EventEmitter();

  @Output()
  save: EventEmitter<SaveEvent> = new EventEmitter();

  builder = new TableBuilder();

  set isEditing(status: boolean) {
    this.editing.emit(status);
    this._isEditing = status;
  }

  get isEditing(): boolean {
    return this._isEditing;
  }

  get disableAction(): boolean {
    return !this.isEditing && this.tableEditing;
  }

  // tslint:disable-next-line
  private _isEditing = false;

  startEdition(): void {
    this.isEditing = true;
  }

  persistEdition(): void {
    const saveEvent = {
      row: this.row,
      index: this.index,
      save: () => this.cancelEdition(),
      error: (error: string) => console.error(error),
    } as SaveEvent;

    this.save.emit(saveEvent);
  }

  cancelEdition(): void {
    this.isEditing = false;
  }

  deleteRow(): void {
    this.delete.emit(this.row);
  }
}
