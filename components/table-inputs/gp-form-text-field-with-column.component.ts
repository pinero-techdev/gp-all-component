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
    @Input() isEditable: boolean;
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    textboxClass: string = 'full-width';

    translationKeys: string = '';

    textToUppercase(text) {
        this.value = this.columnMetadata.uppercase ? text.toUpperCase() : text;
    }

    onFocus(event: any) {
        this.startEditingField.emit({
            column: this.columnMetadata,
            value: event.target.value
        });
    }

    onStop(event: string) {
        this.stopEditingField.emit({
            column: this.columnMetadata,
            value: event
        });
    }
}
