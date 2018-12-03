import {Component, Input, OnInit, Output} from "@angular/core";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";
import {TableMetadataService} from "../../services/table-metadata.service";

@Component({
  selector: 'gp-form-wysiwyg-field-with-column',
  templateUrl: './gp-form-wysiwyg-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormWysiwygFieldWithColumnComponent, multi: true}]

})
export class GpFormWysiwygFieldWithColumnComponent extends CustomInput {

  @Input() columnMetadata: TableColumnMetadata;
    @Input() isEditable: boolean;
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

  visible: boolean = false;

  setVisible() {
    //StartEditing
    this.visible = true;
    this.startEditingField.emit();
  }

  stopEditing() {
    this.stopEditingField.emit();
  }

}
