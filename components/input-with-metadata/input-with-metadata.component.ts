import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableFieldEvent} from "../../resources/data/table.events";
import {InputType} from "../../resources/data/field-type.enum";
import {Observable} from "rxjs";
import {TableService} from "../../services/table.service";
import {TableMetadataService} from "../../services/table-metadata.service";
import {MessageService} from "primeng/components/common/messageservice";

@Component({
    selector: 'gp-app-input-with-metadata',
    templateUrl: './input-with-metadata.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: GpAppInputWithMetadataComponent, multi: true},MessageService
    ]
})
export class GpAppInputWithMetadataComponent extends CustomInput implements OnInit {
    constructor(private _service: TableService,private messageService: MessageService,
                private _metadataService: TableMetadataService) {
        super()
    }

    public editable: boolean;

    public optionsList = [];

    public valid: boolean;

    @Input('columnMetadata') column: TableColumnMetadata = new TableColumnMetadata();

    // item es el objeto row, con todos los campos
    @Input() item: any;
    @Input() isFilter: boolean;
    @Output() startEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    inputType = InputType;

    ngOnInit() {
        this.getOptions();
    }

    onModelChange(v: any) {
        if (this.column.beforeChangeFn) {
            // TODO check type of for Observable
            let newValue = this.column.beforeChangeFn(this.item, v, this.column);
            this.value = newValue;
            this.stopEditing.emit(this.value);
        } else {
            this.value = v;
            this.stopEditing.emit(this.value);
        }
    }

    isEditable() {
        if (this.column.validateFn) {
            return this.column.editableFn(this.value, this.item, this.column);
        } else {
            return this._metadataService.isEditable(this.value, this.item, this.column);
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


    getOptions(): any[] {
        // TODO get filter
        this._service.list(this.column.referencedTable, this.column.retrieveMetadata, this.column.optionsOrdered, this.column.fieldToOrderBy, this.column.filter).subscribe(data => {
                if (data.ok) {
                    if (this.column.setOptionsFn) {
                        // caso setOptionsFn es Observable
                        let opts = this.column.setOptionsFn(data.data, this.item, this.column);
                        if (opts instanceof Observable) {
                            opts.subscribe(data => {
                                this.setOptions(data)
                            }, e => {
                                this.optionsList = [{label: "Error recuperando datos.", value: null}];
                            }, () => {
                            })
                        } else {
                            // caso setOptionsFn es any[]
                            this.setOptions(opts)
                        }
                    } else {
                        // caso no tenemos una setOptionsFn
                        this.setOptions(data.data)
                    }
                } else {
                    this.optionsList = [{label: "Error recuperando datos.", value: null}];
                    this.messageService.add({severity:'error',summary:'error',detail:'Error interno cargando el registro.'})
                }
            },
            err => {
                this.optionsList = [{label: "Error recuperando datos.", value: null}];
                this.messageService.add({severity:'error',summary:'error',detail:'Error interno cargando el registro.'})
            });
        return this.optionsList;
    }

    setOptions(options: any[]) {
        let _options = [{
            label: "Seleccione " + this.column.name.toLowerCase() + " ...",
            value: null
        }];
        for (let row of options) {
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