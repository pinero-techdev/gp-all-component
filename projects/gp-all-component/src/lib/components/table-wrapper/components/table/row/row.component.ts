import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TableBuilder } from '../table.builder';

@Component({
  // tslint:disable-next-line
  selector: '[gpRow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {
  @Input()
  row: any;

  @Input()
  index: any;

  @Input()
  builder: TableBuilder;

  @Input()
  tableEditing: boolean;

  @Output()
  editing: EventEmitter<boolean> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  @Output()
  save: any = new EventEmitter();

  set isEditing(status: boolean) {
    this.editing.emit(status);
    this._isEditing = status;
  }

  get isEditing(): boolean {
    return this._isEditing;
  }

  get disableAction() {
    return !this.isEditing && this.tableEditing;
  }

  // tslint:disable-next-line
  private _isEditing = false;

  startEdition() {
    this.isEditing = true;
  }

  persistEdition() {
    this.save.emit({
      row: this.row,
      index: this.index,
      save: () => this.cancelEdition(),
      error: (error: string) => console.error(error),
    });
  }

  cancelEdition() {
    this.isEditing = false;
  }

  deleteRow() {
    this.delete.emit(this.row);
  }
}
