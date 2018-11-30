import {Component, Input, Output} from "@angular/core";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";
import {TableMetadataService} from "../../services/table-metadata.service";

@Component({
  selector: 'gp-form-checkbox-field-with-column',
  templateUrl: './gp-form-checkbox-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormCheckboxFieldWithColumnComponent, multi: true}]

})
export class GpFormCheckboxFieldWithColumnComponent extends CustomInput {

  @Input() columnMetadata: TableColumnMetadata;
  @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

  @Input() item: any;
  constructor(private tableService: TableMetadataService) {
    super();
  }

  isEditable() {
    return this.tableService.isEditable(this.value,this.item,this.columnMetadata);
  }

  onEdit(event: boolean) {
    let tableFieldEvent: TableFieldEvent =  {
        column: this.columnMetadata,
        value: event
    };

    this.startEditingField.emit(tableFieldEvent);
    this.stopEditingField.emit(tableFieldEvent);
  }

}

