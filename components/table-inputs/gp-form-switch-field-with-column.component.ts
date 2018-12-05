import {Component, Input, Output} from "@angular/core";
import {FieldMetadata} from "../../services/table.service";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";
import {TableMetadataService} from "../../services/table-metadata.service";

@Component({
  selector: 'gp-form-switch-field-with-column',
  templateUrl: './gp-form-switch-field-with-column.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormSwitchFieldWithColumnComponent, multi: true}]

})
export class GpFormSwitchFieldWithColumnComponent extends CustomInput {

  @Input() columnMetadata: TableColumnMetadata;
  @Input() isEditable: boolean;
  @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

  onEdit(event: any) {
    this.startEditingField.emit({
        column: this.columnMetadata,
        value: event.checked
    });
    this.stopEditingField.emit({
        column: this.columnMetadata,
        value: event.checked
    });
  }


}
