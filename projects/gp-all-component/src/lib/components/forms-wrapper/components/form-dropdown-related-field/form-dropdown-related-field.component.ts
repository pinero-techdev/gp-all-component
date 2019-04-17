import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/gp-form-field-control';
import { TableService } from '@lib/services/api/table/table.service';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { DataTableMetaDataFieldDisplayInfoRelatedField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field-display-info-related-field.model';
import { InfoCampoModificado } from '@lib/resources/data/info-campo-modificado.model';
import { SelectItem } from 'primeng/api';
import { GpFormField } from '../../resources/gp-form-field.model';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'gp-form-dropdown-related-field',
    templateUrl: './form-dropdown-related-field.component.html',
    styleUrls: ['./form-dropdown-related-field.component.scss'],
})
export class FormDropdownRelatedFieldComponent extends GpFormFieldControl implements OnInit {
    @Input() formField: GpFormField;

    constructor(private _tableService: TableService, private _gpUtil: GPUtil) {
        super();
    }

    @Input()
    set relatedField(fieldsChanged) {
        if (fieldsChanged) {
            for (const fieldName of fieldsChanged) {
                const relatedField = this._gpUtil.getElementFromArray(
                    this._relatedFields,
                    'field',
                    fieldName
                );
                if (relatedField) {
                    relatedField.value = fieldsChanged[fieldName];
                }
            }
            if (!this.relatedFieldsSelected()) {
                const label = this.getLabel();
                this.listAllowedValuesOptions = [{ label, value: null }];
                // Si se ha modificado el valor, actualizamos
                if (this._currentValue != null) {
                    this._currentValue = null;
                }
            } else {
                // Si todos los campos dependientes se han seleccionado,
                // actualizamos la lista de opciones disponibles
                this.reinicia();
            }
        }
    }

    // Capturamos los eventos onchange del valor
    set _currentValue(value: string) {
        this.currentValue = value;
        const infoCampoModificado = new InfoCampoModificado(
            this.formField.fieldMetadata.fieldName,
            this.currentValue
        );
        this.valueChanged.emit(infoCampoModificado);
    }

    get _currentValue(): string {
        return this.currentValue;
    }

    _relatedFields: DataTableMetaDataFieldDisplayInfoRelatedField[] = [];

    @Output()
    valueChanged = new EventEmitter<InfoCampoModificado>();

    list: any;

    private listCharged = false;

    listAllowedValuesOptions: SelectItem[];

    public getFormField(): GpFormField {
        return this.formField;
    }

    getFieldMetadata(): DataTableMetaDataField {
        return this.formField.fieldMetadata;
    }

    ngOnInit() {
        this.inicializa();
    }

    inicializa() {
        this.listAllowedValuesOptions = [];
        this._relatedFields = this.formField.fieldMetadata.displayInfo.relatedFields;
        if (
            this.formField.fieldMetadata.displayInfo &&
            this.formField.fieldMetadata.displayInfo.referencedTable != null &&
            this.formField.fieldMetadata.displayInfo.referencedTable !== ''
        ) {
            // Cargamos los datos de una tabla?
            console.log(
                'GpFormDropdownFieldComponent.ngOnInit: loading from table ' +
                    this.formField.fieldMetadata.displayInfo.referencedTable
            );
            this.listAllowedValuesOptions = [
                { label: 'Cargando los datos del desplegable ...', value: null },
            ];
            console.log(this.formField.fieldMetadata.displayInfo.referencedTable);
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
                .pipe(finalize(() => (this.listCharged = true)))
                .subscribe(
                    (data) => {
                        if (data.ok) {
                            this.list = data.data;
                            this.processData();
                        } else {
                            this.list = null;
                            console.error('error al cargar datos');
                        }
                    },
                    (err) => {
                        this.list = null;
                        console.error('error al cargar datos');
                    }
                );
        } else {
            console.error(
                'No se ha indicado tabla relacionada para obtener los valores del campo ' +
                    this.formField.fieldMetadata.fieldName
            );
        }
    }

    reinicia() {
        if (this.listCharged && this.list) {
            this.processData();

            // Solo tiene cargado la info de selección
            if (this.listAllowedValuesOptions.length === 1) {
                this.listAllowedValuesOptions = [
                    {
                        label: 'No existen opciones para el valor seleccionado',
                        value: null,
                    },
                ];
            }
            // Si el valor no existe dentro de las opciones, se reinicia el valor
            if (
                this.listAllowedValuesOptions.filter((item) => {
                    return item.value === this._currentValue;
                }).length === 0
            ) {
                this._currentValue = null;
            }
        } else if (!this.listCharged) {
            // Si los datos se encuentran pendientes de cargarse, esperamos un 0.2 segundos
            setTimeout(() => {
                this.reinicia();
            }, 200);
        } else {
            this.listAllowedValuesOptions = [
                { label: 'No existen opciones para el valor seleccionado', value: null },
            ];
        }
    }

    copyValueFromControlToEditedRow(editedRow: any) {
        editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue;
    }

    copyValueFromEditedRowToControl(editedRow: any) {
        this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
    }

    validateField(editedRow: any) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        const valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if (this.formField.fieldMetadata.notNull && (valorCampo === '' || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            return false;
        }
        return this.formField.validField;
    }

    /**
     * Función que devuelve la descripción de la opción
     * con los campos relacionados que faltan por seleccionar.
     */
    getLabel(): string {
        const fields = this._relatedFields
            .filter((field) => field.value == null)
            .map((item) => item.fieldDescription.toLowerCase());

        let label = 'Primero debe seleccionar ';
        if (fields.length === 1) {
            label += fields.toString();
        } else {
            const fieldsString = fields.join(',');
            const indexLastComa = fieldsString.lastIndexOf(',');
            label +=
                fieldsString.substring(0, indexLastComa) +
                ' y ' +
                fieldsString.substring(indexLastComa + 1);
        }

        return label;
    }

    /**
     * Función que determina si todos los campos relacionados han sido seleccionados
     */
    relatedFieldsSelected(): boolean {
        let allFieldsSelected = true;
        if (this._relatedFields) {
            this._relatedFields.forEach(
                (field) => (allFieldsSelected = allFieldsSelected && field.value != null)
            );
        }
        return allFieldsSelected;
    }

    /**
     * Procedimiento que según se cumplan los campos
     * relacionados introducirá el listado de opciones que cumplen
     * con ellos. En el caso contrario, el listado de opciones
     * contendrá un solo item, con la información de los campos
     * relacionados que faltan por seleccionar
     */
    processData() {
        if (!this.relatedFieldsSelected) {
            const label = this.getLabel();
            this.listAllowedValuesOptions = [{ label, value: null }];
        } else {
            this.listAllowedValuesOptions = [
                {
                    label:
                        'Seleccione ' +
                        this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() +
                        ' ...',
                    value: null,
                },
            ];
            const optionsAllowed = this.list
                .filter((item) => {
                    let valid = true;
                    for (const relatedField of this._relatedFields) {
                        const fieldExt = relatedField.fieldExternal || relatedField.field;
                        valid = valid && relatedField.value === item[fieldExt];
                    }
                    return valid;
                })
                .map((item) => {
                    let optionLabel = '';
                    let separator = '';
                    for (const fieldDesc of this.formField.fieldMetadata.displayInfo
                        .fieldDescriptions) {
                        optionLabel += separator + item[fieldDesc];
                        separator = ' - ';
                    }
                    return {
                        label: optionLabel,
                        value: item[this.formField.fieldMetadata.displayInfo.referencedField],
                    };
                });
            this.listAllowedValuesOptions = this.listAllowedValuesOptions.concat(optionsAllowed);
        }
    }
}
