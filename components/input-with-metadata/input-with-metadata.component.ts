import {AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {CustomInput} from "../../resources/data/custom-input";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableFieldEvent} from "../../resources/data/table.events";
import {InputType} from "../../resources/data/field-type.enum";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs";
import {Filter, TableService} from "../../services/table.service";
import {TableMetadataService} from "../../services/table-metadata.service";
import {MessageService} from "primeng/components/common/messageservice";
import {Attachment} from "../../resources/data/attachment";
import {AttachmentOperationEnum} from "../../resources/data/attachment-operation.enum";

@Component({
    selector: 'gp-app-input-with-metadata',
    templateUrl: './input-with-metadata.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: GpAppInputWithMetadataComponent, multi: true},MessageService
    ]
})
export class GpAppInputWithMetadataComponent extends CustomInput implements AfterViewInit {
    AttachmentOperationEnum = AttachmentOperationEnum;
    form: FormGroup;
    InputType = InputType;
    editable: boolean;
    optionsList = [];
    imgModalVisible: boolean = false;
    textareaModalVisible: boolean = false;
    wysiwygModalVisible: boolean = false;
    fileModalVisible: boolean = false;
    calendarLocale = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
    };
    dateFormat: string = "yy-mm-dd";
    translationKeys: string = "";
    temporalValue: string = "";
    temoralFile: Attachment = new Attachment();
    subject = new Subject();
    @Input('columnMetadata') column: TableColumnMetadata = new TableColumnMetadata();
    @Input() item: any; // item es el objeto row, con todos los campos
    @Input() isFilter: boolean;
    @Output() startEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditing: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() downloadFile: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();

    constructor(private _service: TableService,private messageService: MessageService,
                private _metadataService: TableMetadataService, private fb: FormBuilder) {
        super();
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            avatar: null
        });
    }

    ngAfterViewInit() {
        if (this.column.type == InputType.DROPDOWN_FIELD || this.column.type == InputType.DROPDOWN_RELATED_FIELD){
            this.getOptions();
        }
        if (!this.isFilter && (this.column.type == InputType.CHECKBOX_FIELD || this.column.type == InputType.SWITCH_FIELD)) {
            if(!this.value && this.column.uncheckedValue) {
                this.startStop(this.column.uncheckedValue);
            }
        }
        if(this.column.translationInfo && this.column.translationInfo.keyFields && this.item) {
            this.translationKeys = '';
            for (let keyField of this.column.translationInfo.keyFields) {
                this.translationKeys += this.item[keyField];
            }
        }
    }

    onModelChange(value: any) {
        if (this.column.beforeChangeFn) {
            let newValue = this.column.beforeChangeFn(this.item, value, this.column);
            this.value = newValue;
            this.stopEditing.emit({value:this.value, column: this.column});
        } else {
            this.value = value;
            this.stopEditing.emit({value:this.value, column: this.column});
        }
    }

    isCheckboxChecked(): boolean {
        if (this.column.checkedValue) {
            return this.column.checkedValue === this.value;
        } else {
            return this.value;
        }
    }

    onCheckboxChange(value: any) {
        if(value) {
            this.startStop(this.column.checkedValue || value)
        } else {
            this.startStop(this.column.uncheckedValue || value)
        }
    }

    startStop(value: any) {
        this.onStartEditing();
        this.onModelChange(value);
    }

    setTimeValue(date: Date) {
        let value = date.toLocaleTimeString().substr(0,5);
        this.startStop(value);
    }

    isEditable() {
        if (this.column.validateFn) {
            return this.column.editableFn(this.value, this.item, this.column);
        } else {
            return this._metadataService.isEditable(this.value, this.item, this.column);
        }
    }

    onStartEditing() {
        this.startEditing.emit({value: this.value, column: this.column});
    }

    openImgModal() {
        if(this.value){
            this.temporalValue = this.value.slice();
        } else {
            this.temporalValue = "";
        }
        this.imgModalVisible = true;
    }

    openTextareaModal() {
        if(this.value){
            this.temporalValue = this.value.slice();
        } else {
            this.temporalValue = "";
        }
        this.textareaModalVisible = true;
    }

    openWYSIWYGModal() {
        if(this.value){
            this.temporalValue = this.value.slice();
        } else {
            this.temporalValue = "";
        }
        this.wysiwygModalVisible = true;
    }

    openFileModal() {
        if(this.value){
            this.temoralFile = Object.assign(new Attachment(), this.value);
        } else {
            this.temoralFile = new Attachment();
        }
        this.fileModalVisible = true;
    }

    getOptions() {
        if(this.column.referencedTable) {
            this.getRelatedOptions();
        } else {
            if (this.column.setOptionsFn) {
                this.setCustomOptions(this.column.options || []);
            } else {
                this.setOptions(this.column.options || [])
            }
        }
    }

    getRelatedOptions() {
        if (this.subject.observers.length === 0) {
            this.subject
                .switchMap(() => {
                    let filters: Filter[] = [];
                    if (this.column && this.column.relatedFields) {
                        for (let related of this.column.relatedFields) {
                            // Validation disabled to prevent get All elements when related fields are not selected
                            // if (this.item[related.field] !== null && this.item[related.field] !== undefined) {
                            filters.push(new Filter('EQUAL',
                                (related.fieldExternal)? related.fieldExternal : related.field,
                                [(this.isFilter ? related.value : this.item[related.field])]));
                            // }
                        }
                    }
                    return this._service.list(
                        this.column.referencedTable,
                        this.column.retrieveMetadata,
                        false,
                        this.column.fieldToOrderBy || null,
                        filters)})
                .subscribe((data) => {
                    if (data.ok) {
                        if (this.column.setOptionsFn) {
                            this.setCustomOptions(data.data);
                        } else {
                            // caso no tenemos una setOptionsFn
                            this.setOptions(data.data)
                        }
                    } else {
                        if (this.column.setOptionsFn) {
                            this.setCustomOptions([]);
                        } else {
                            this.optionsList = [{label: "Error recuperando datos.", value: null}];
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'Error interno cargando el registro.'
                            });
                        }
                    }
                }, (err) => {
                    if (this.column.setOptionsFn) {
                        this.setCustomOptions([]);
                    } else {
                        this.optionsList = [{label: "Error recuperando datos.", value: null}];
                        this.messageService.add({
                            severity: 'error',
                            summary: 'error',
                            detail: 'Error interno cargando el registro.'
                        })
                    }
                })
        }
        this.subject.next();
        return this.optionsList;
    }

    setCustomOptions(customData: any[]) {
        // caso setOptionsFn es Observable
        let opts = this.column.setOptionsFn(customData, this.item, this.column);
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
    }

    readFile(event: any) {
        let reader = new FileReader();
        const [file] = event.target.files || event.srcElement.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
            let base64 = reader.result.split(',');
            if(base64 && base64.length > 1) {
                this.temoralFile.operation = AttachmentOperationEnum.MODIFY;
                this.temoralFile.fieldName = this.column.name;
                this.temoralFile.fileName = file.name;
                this.temoralFile.mimeType = file.type;
                this.temoralFile.content = base64[1];
            }
        };
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

    hasFile(): boolean {
        return (this.item[`${this.column.name}Empty`] === false && !this.value) ||
            (this.value && this.value.operation === AttachmentOperationEnum.MODIFY);
    }

    deleteFile() {
        if (!this.value) {
            const deleteAttachment = new Attachment();
            deleteAttachment.fieldName = this.column.name;
            deleteAttachment.operation = AttachmentOperationEnum.DELETE;
            this.startStop(deleteAttachment)
        } else {
            this.value = null;
            this.item[`${this.column.name}Empty`] = true;
            this.startStop(this.value);
        }
    }

}
