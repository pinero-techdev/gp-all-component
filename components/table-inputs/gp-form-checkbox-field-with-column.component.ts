import {Component, Input, Output} from "@angular/core";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";

@Component({
  selector: 'gp-form-checkbox-field-with-column',
  templateUrl: './gp-form-checkbox-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormCheckboxFieldWithColumnComponent, multi: true}]

})
export class GpFormCheckboxFieldWithColumnComponent extends CustomInput {

  @Input() columnMetadata: TableColumnMetadata;
  @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

  onEdit(event: boolean) {
    let tableFieldEvent: TableFieldEvent = new class implements TableFieldEvent {
        column: TableColumnMetadata;
        value: any;
    };

    tableFieldEvent.column = this.columnMetadata;
    tableFieldEvent.value = event;

    this.startEditingField.emit(tableFieldEvent);
    this.stopEditingField.emit(tableFieldEvent);
  }

}

