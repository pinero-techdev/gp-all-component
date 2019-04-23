import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/gp-form-field-control';
import { InfoCampoModificado } from '@lib/resources/data/info-campo-modificado.model';
import { SelectItem } from 'primeng/api';
import { TableService } from '@lib/services/api/table/table.service';
import { GpFormField } from '../../resources/gp-form-field.model';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';

@Component({
    selector: 'gp-form-dropdown-field',
    templateUrl: './form-dropdown-field.component.html',
    styleUrls: ['./form-dropdown-field.component.scss'],
})
export class FormDropdownFieldComponent extends GpFormFieldControl implements OnInit {
    @Input() formField: GpFormField;

    @Output() valueChanged = new EventEmitter<InfoCampoModificado>();
    listAllowedValuesOptions: SelectItem[];

    constructor(private readonly _tableService: TableService) {
        super();
    }

    set _currentValueDropDown(value: string) {
        this.currentValue = value;
        const infoCampoModificado = new InfoCampoModificado(
            this.formField.fieldMetadata.fieldName,
            this.currentValue
        );
        this.valueChanged.emit(infoCampoModificado);
    }

    get _currentValueDropDown(): string {
        return this.currentValue;
    }

    public getFormField(): GpFormField {
        return this.formField;
    }

    ngOnInit() {
        this.inicializa();
    }

    getFieldMetadata(): DataTableMetaDataField {
        return this.formField.fieldMetadata;
    }

    // FIXME implement lifecycle OnInit
    inicializa() {
        this.listAllowedValuesOptions = [];
        if (
            this.formField.fieldMetadata.displayInfo &&
            this.formField.fieldMetadata.displayInfo.options != null &&
            this.formField.fieldMetadata.displayInfo.options.length > 0
        ) {
            this.listAllowedValuesOptions.push({
                label:
                    'Seleccione ' +
                    this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() +
                    ' ...',
                value: null,
            });
            for (const i of this.formField.fieldMetadata.displayInfo.options) {
                this.listAllowedValuesOptions.push({ label: i.description, value: i.value });
            }
        } else if (
            this.formField.fieldMetadata.displayInfo &&
            this.formField.fieldMetadata.displayInfo.referencedTable != null &&
            this.formField.fieldMetadata.displayInfo.referencedTable !== ''
        ) {
            // Cargamos los datos de una tabla?
            this.listAllowedValuesOptions = [
                { label: 'Cargando los datos del desplegable ...', value: null },
            ];
            const fieldToOrderBy = this.formField.fieldMetadata.displayInfo.fieldToOrderBy
                ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy]
                : null;
            this._tableService
                .list(
                    this.formField.fieldMetadata.displayInfo.referencedTable,
                    true,
                    true,
                    fieldToOrderBy,
                    this.formField.fieldMetadata.displayInfo.filters
                )
                .subscribe(
                    (data) => {
                        if (data.ok) {
                            // Recuperamos la lista.
                            this.listAllowedValuesOptions = [
                                {
                                    label:
                                        'Seleccione ' +
                                        this.formField.fieldMetadata.displayInfo.fieldLabel //
                                            .toLowerCase() +
                                        ' ...',
                                    value: null,
                                },
                            ];
                            for (const row of data.data) {
                                let optionLabel = '';
                                let separator = '';
                                for (const fieldDesc of this.formField.fieldMetadata.displayInfo
                                    .fieldDescriptions) {
                                    optionLabel += separator + row[fieldDesc];
                                    separator = ' - ';
                                }
                                this.listAllowedValuesOptions.push({
                                    label: optionLabel,
                                    value:
                                        row[
                                            this.formField.fieldMetadata.displayInfo.referencedField
                                        ],
                                });
                            }
                        } else {
                            this.listAllowedValuesOptions = [
                                { label: 'Error recuperando datos.', value: null },
                            ];
                        }
                    },
                    (err) => {
                        this.listAllowedValuesOptions = [
                            { label: 'Error recuperando datos.', value: null },
                        ];
                    }
                );
        }
    }

    copyValueFromControlToEditedRow(editedRow: any) {
        editedRow[this.formField.fieldMetadata.fieldName] = this._currentValueDropDown;
    }

    copyValueFromEditedRowToControl(editedRow: any) {
        this._currentValueDropDown = editedRow[this.formField.fieldMetadata.fieldName];
    }

    validateField(editedRow: any) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;

        const valorCampo = editedRow[this.formField.fieldMetadata.fieldName];

        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && (valorCampo === '' || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            return false;
        }
        return this.formField.validField;
    }

    onChange() {
        const infoCampoModificado = new InfoCampoModificado(
            this.formField.fieldMetadata.fieldName,
            this._currentValueDropDown
        );
        this.valueChanged.emit(infoCampoModificado);
    }
}
