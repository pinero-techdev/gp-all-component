import {Component, Input, OnInit, Output} from "@angular/core";
import {TableService, FieldMetadata} from "../../services/table.service";
import {GPUtil} from "../../resources/data/gpUtil";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";


@Component({
    selector: 'gp-form-textarea-field-with-column',
    templateUrl: './gp-form-textarea-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormTextareaFieldWithColumnComponent, multi: true}]
})
export class GpFormTextareaFieldWithColumnComponent extends CustomInput {
    @Input() columnMetadata : TableColumnMetadata;
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    visible: boolean = false;

    translationKeys: string = '';

    onStart() {
        this.visible = true;
        let tableFieldEvent: TableFieldEvent = {
            column: this.columnMetadata,
            value: this.value
        };

        this.startEditingField.emit(tableFieldEvent);
    }

    onStop() {
        let tableFieldEvent: TableFieldEvent = {
            column: this.columnMetadata,
            value: this.value
        };

        this.stopEditingField.emit(tableFieldEvent);
    }
}
