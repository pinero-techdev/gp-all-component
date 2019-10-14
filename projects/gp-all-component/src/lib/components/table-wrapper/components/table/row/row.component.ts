import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { TableBuilder } from '../table.builder';
import { CoreTableModel } from '../models/core-table.model';
import { TableColumn } from '../models/table-column.model';
import { SaveEvent } from '../models/save-event.model';
import {
  Field,
  FieldMetadata,
  IModifiedField,
  IModifiedRelatedField,
} from '../../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { DynamicFieldComponent } from '../../../../../shared/dynamic-field/dynamic-field.component';

@Component({
  // tslint:disable-next-line
  selector: '[gpRow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @ViewChildren(DynamicFieldComponent) $fields: QueryList<DynamicFieldComponent>;

  // tslint:disable-next-line
  private _row: any;

  @Input() set row(value: any) {
    this._row = value;
    // It should use pEditableRow (output/input) for PrimeNG
    if (Object.values(this._row).filter((item) => !!item).length === 0) {
      this.startEdition();
      this.disableSave = true;
    }
  }

  get row() {
    return this._row;
  }

  private fieldsNames: string[];

  @Input() isDynamic = false;

  @Input() fields: Field[];

  // tslint:disable-next-line
  private _metadata: FieldMetadata;
  @Input() set metadata(value: FieldMetadata) {
    this._metadata = null;
    if (value) {
      this._metadata = new FieldMetadata().assign(value, true);
      this.fieldsNames = this._metadata.getRelatedFieldNames();
      this.setRelatedFields(this.row);
    }
  }

  get metadata(): FieldMetadata {
    return this._metadata;
  }

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

  @Output() onCancelEdition = new EventEmitter();

  @Output()
  onValidChange = new EventEmitter<boolean>();

  builder = new TableBuilder();

  isValid = true;

  @Input() disableSave = true;
  @Input() relatedFields: IModifiedRelatedField;

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
    this.onCancelEdition.emit(true);
  }

  deleteRow(): void {
    this.delete.emit(this.row);
  }

  /**
   * When a dynamic field is change, the row should recalculate the related
   * fields if it's needed and also, grab the new value
   * @param event
   */
  onDynamicFieldChange(event: IModifiedField) {
    if (event.field && event.field.validField) {
      this.row[event.fieldName] = event.value;
      if (event.hasOwnProperty('label') && event.field.fieldMetadata.referenceDescription) {
        this.row[event.field.fieldMetadata.referenceDescription] = event.label;
      }
    }

    if (this.$fields.length) {
      this.isValid = this.$fields.filter(($field) => !$field.isValid()).length === 0;
    }

    // If there is related fields, they are setup
    if (this.fieldsNames && this.fieldsNames.indexOf(event.fieldName) > -1) {
      this.setRelatedFields(this.row);
    }

    this.disableSave = !this.isValid;
  }

  /*** Related Fields */
  private setRelatedFields(data: any) {
    if (data && this.metadata instanceof FieldMetadata) {
      this.relatedFields = this.metadata.getRelatedFields(data);
    }
  }
}
