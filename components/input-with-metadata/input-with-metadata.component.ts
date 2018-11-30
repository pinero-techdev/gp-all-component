import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableFieldEvent} from "../../resources/data/table.events";
import {InputType} from "../../resources/data/field-type.enum";
import {Observable} from "rxjs";
import {TableService} from "../../services/table.service";
import {TableMetadataService} from "../../services/table-metadata.service";

@Component({
    selector: 'gp-app-input-with-metadata',
    templateUrl: './input-with-metadata.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: GpAppInputWithMetadataComponent, multi: true},
    ]
})
export class GpAppInputWithMetadataComponent extends CustomInput {
    constructor(private _service: TableService, private _tableMetadataService: TableMetadataService) {
        super()
    }

    isEditable() {
        return this._tableMetadataService.isEditable(this.value, this.item, this.column);
    }

    private _inputType = InputType;
    private _column: TableColumnMetadata = new TableColumnMetadata();
    private _options = [];
    public optionsList = [];


    @Input('columnMetadata')
    get column(): TableColumnMetadata {
        return this._column;
    }

    set column(value: TableColumnMetadata) {
        this._column = Object.assign({}, value);
        if (this._column.type === this._inputType.DROPDOWN_FIELD ||
            this._column.type === this._inputType.DROPDOWN_RELATED_FIELD) {
            this.getOptions();
        }
    }

    // item es el objeto row, con todos los campos
    @Input() item: any;
    @Input() isFilter: boolean;
    @Output() startEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    inputType = InputType;

    onModelChange(v: any) {
        if (this.column.beforeChangeFn) {
            // TODO check type of
            let newValue = this.column.beforeChangeFn(this.item, v, this.column);
            this.value = newValue;
        } else {
            this.value = v;
        }


    }

    onStartEditing() {
        this.startEditing.emit({value: this.value, column: this.column});
    }

    onStopEditing() {
        this.stopEditing.emit({value: this.value, column: this.column});
    }


    getOptions() {
        this._service.list(this.column.referencedTable, this.column.retrieveMetadata, this.column.optionsOrdered, this.column.fieldToOrderBy, this.column.filter)
            .subscribe(data => {
                    if (data.ok) {
                        if (this.column.setOptionsFn) {
                            // caso setOptionsFn es Observable
                            let opts = this.column.setOptionsFn(data.data, this.item, this.column);
                            if (opts instanceof Observable) {
                                opts.subscribe(data => {
                                    this._options = data;
                                    this.setOptions()
                                }, e => {
                                    this.optionsList = [{label: "Error recuperando datos.", value: null}];
                                }, () => {
                                })
                            } else {
                                // caso setOptionsFn es any[]
                                this._options = opts;
                                this.setOptions()
                            }
                        } else {
                            // caso no tenemos una setOptionsFn
                            this._options = data.data;
                            this.setOptions()
                        }
                    } else {
                        this.optionsList = [{label: "Error recuperando datos.", value: null}];
                    }
                },
                err => {
                    this.optionsList = [{label: "Error recuperando datos.", value: null}];
                });
    }

    setOptions() {
        let _options = [{
            label: "Seleccione " + this.column.name.toLowerCase() + " ...",
            value: null
        }];
        for (let row of this._options) {
            let optionLabel = "";
            let separator = "";
            row._label = "";
            for (let fieldDesc of this.column.optionsLabels) {
                row._label += separator + row[fieldDesc];
                separator = " - ";
            }
            _options.push({
                label: optionLabel,
                value: row[this.column.optionsValue]
            });
        }
        this.optionsList = _options;

    }
}