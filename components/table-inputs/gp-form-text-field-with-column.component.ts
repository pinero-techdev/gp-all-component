import {Component, Input, OnInit, Output} from "@angular/core";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";
import {TableMetadataService} from "../../services/table-metadata.service";


@Component({
    selector: 'gp-form-text-field-with-column',
    templateUrl: './gp-form-text-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormTextFieldWithColumnComponent, multi: true}]

})
export class GpFormTextFieldWithColumnComponent extends CustomInput {
    @Input() columnMetadata: TableColumnMetadata;

    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    textboxClass: string = 'full-width';

    translationKeys: string = '';
    @Input() item: any;
    constructor(private tableService: TableMetadataService) {
        super();
    }

    isEditable() {
        return this.tableService.isEditable(this.value,this.item,this.columnMetadata);
    }

    textToUppercase(text) {
        this.value = this.columnMetadata.uppercase ? text.toUpperCase() : text;
    }

    onFocus(event: any) {
        let tableFieldEvent: TableFieldEvent = {
            column: this.columnMetadata,
            value: event.target.value
        };

        this.startEditingField.emit(tableFieldEvent);
    }

    onStop(event: any) {
        let tableFieldEvent: TableFieldEvent = {
            column: this.columnMetadata,
            value: event.target.value
        };

        this.stopEditingField.emit(tableFieldEvent);
    }
}
