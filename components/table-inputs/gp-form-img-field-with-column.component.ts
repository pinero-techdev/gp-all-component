import {Component, Input, OnInit, Output} from "@angular/core";
import {TableService, FieldMetadata} from "../../services/table.service";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import { EventEmitter } from '@angular/core';
import {TableFieldEvent} from "../../resources/data/table.events";

@Component({
    selector: 'gp-form-img-field-with-column',
    templateUrl: './gp-form-img-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormImgFieldWithColumnComponent, multi: true}]

})
export class GpFormImgFieldWithColumnComponent extends CustomInput implements OnInit {

    @Input() columnMetadata: TableColumnMetadata;
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    textboxClass: string = 'full-width';

    visible: boolean = false;

    ngOnInit() {
        this.inicializa();
    }

    inicializa() {
        if (this.columnMetadata.uppercase) {
            this.textboxClass = "full-width text-uppercase";
        }
    }

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
