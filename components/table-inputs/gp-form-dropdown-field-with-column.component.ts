import {Component, Input, Output, EventEmitter} from "@angular/core";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableFieldEvent} from "../../resources/data/table.events";
import {TableMetadataService} from "../../services/table-metadata.service";

@Component({
    selector: 'gp-form-dropdown-field-with-column',
    templateUrl: './gp-form-dropdown-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormDropdownFieldWithColumnComponent, multi: true}]
})
export class GpFormDropdownFieldWithColumnComponent extends CustomInput {

    @Input() options: any[];
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
    onEdit() {
        this.startEditingField.emit();
        this.stopEditingField.emit();
    }

}
