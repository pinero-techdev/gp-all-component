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
    constructor(private _service: TableService,
                private _metadataService: TableMetadataService) {
        super()
    }

    public editable: boolean;

    private _inputType = InputType;
    private _column: TableColumnMetadata = new TableColumnMetadata();
    private _options = [];
    // usar optionsList para las opciones de los dropdown
    public optionsList = [];

    public valid: boolean;

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
        // this.validate();
    }

    isEditable() {
        if (this.column.validateFn) {
            this.editable = this.column.validateFn(this.value, this.item, this.column);
        } else {
            this.editable = this._metadataService.isEditable(this.value, this.item, this.column);
        }
    }

    validate() {
        if (this.column.validateFn) {
            this.valid = this.column.validateFn(this.item, this.value, this.column);
        } else {
            this.valid = this._metadataService.validateField(this.item, this.column);
        }
    }

    onStartEditing() {
        this.startEditing.emit({value: this.value, column: this.column});
    }

    onStopEditing() {
        this.stopEditing.emit({value: this.value, column: this.column});
    }


    getOptions(related?: any): any[] {
        // TODO get filter
        this._service.list(this.column.referencedTable, this.column.retrieveMetadata, this.column.optionsOrdered, this.column.fieldToOrderBy, this.column.filter).subscribe(data => {
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
        return this.optionsList;
    }

    setOptions() {
        let _options = [{
            label: "Seleccione " + this.column.name.toLowerCase() + " ...",
            value: null
        }];
        for (let row of this._options) {
            let optionLabel = "";
            let separator = "";
            // row._label = "";
            for (let fieldDesc of this.column.optionsLabels) {
                optionLabel += separator + row[fieldDesc];
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