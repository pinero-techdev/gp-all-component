import {Component, Input, OnInit, Output} from "@angular/core";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";


@Component({
    selector: 'gp-form-text-field-with-column',
    templateUrl: './gp-form-text-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormTextFieldWithColumnComponent, multi: true}]

})
export class GpFormTextFieldWithColumnComponent extends CustomInput implements OnInit {
    @Input() columnMetadata: TableColumnMetadata;
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    textboxClass: string = 'full-width';

    translationKeys: string = '';

    ngOnInit() {
        this.inicializa();
    }

    inicializa() {
        if (this.columnMetadata.uppercase) {
            this.textboxClass = "full-width text-uppercase";
        }
    }

    onFocus(event: any) {
        let tableFieldEvent: TableFieldEvent = new class implements TableFieldEvent {
            column: TableColumnMetadata;
            value: any;
        };

        tableFieldEvent.column = this.columnMetadata;
        tableFieldEvent.value = event.target.value;

        this.startEditingField.emit(tableFieldEvent);
    }

    onStop(event: any) {
        let tableFieldEvent: TableFieldEvent = new class implements TableFieldEvent {
            column: TableColumnMetadata;
            value: any;
        };

        tableFieldEvent.column = this.columnMetadata;
        tableFieldEvent.value = event.target.value;

        this.stopEditingField.emit(tableFieldEvent);
    }
}
