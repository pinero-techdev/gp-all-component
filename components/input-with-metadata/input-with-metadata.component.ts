import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableFieldEvent} from "../../resources/data/table.events";

@Component({
    selector: 'gp-app-input-with-metadata',
    templateUrl: './input-with-metadata.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: GpAppInputWithMetadataComponent, multi: true},
    ]
})
export class GpAppInputWithMetadataComponent extends CustomInput {
    @Input('columnMetadata') column: TableColumnMetadata;

    //item es la row entera
    @Input() item: any;
    @Input() isFilter: boolean;
    @Output() startEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();


    onModelChange(v: any ) {
        console.log('change',v);
        if(this.column.beforeChangeFn) {
            // TODO check type of
            let newValue = this.column.beforeChangeFn(this.item, v, this.column);
            this.value = newValue;
        } else {
            this.value = v;
        }


    }
    onStartEditing() {
        this.startEditing.emit({value: this.value, column:this.column});

    }
    onStopEditing() {
        this.stopEditing.emit({value: this.value, column:this.column});

    }

}