import {Component, Input, OnInit, Output} from "@angular/core";
import { EventEmitter } from '@angular/core';
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TableFieldEvent} from "../../resources/data/table.events";

@Component({
    selector: 'gp-form-calendar-field-with-column',
    templateUrl: './gp-form-calendar-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormCalendarFieldWithColumnComponent, multi: true}]

})
export class GpFormCalendarFieldWithColumnComponent extends CustomInput implements OnInit {
    @Input() columnMetadata: TableColumnMetadata;
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    dateFormat: string = "yy-mm-dd";

    es: any;

    ngOnInit() {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
        }
    }

    onFocus(event: any) {
        //event no controlado
        let tableFieldEvent: TableFieldEvent = {
            column: this.columnMetadata,
            value: event
        };

        this.startEditingField.emit(tableFieldEvent);
    }
    onStop(event: Date) {
        this.value = [event.getFullYear(), ('0' + (event.getMonth() + 1)).slice(-2), ('0' + (event.getDate())).slice(-2)].join('-');
        let tableFieldEvent: TableFieldEvent = {
            column: this.columnMetadata,
            value: event
        };

        this.stopEditingField.emit(tableFieldEvent);
    }

}
