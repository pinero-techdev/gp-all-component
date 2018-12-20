import {Component, Input} from "@angular/core";
import {GPUtil} from '../../resources/data/gpUtil';
import {RelatedField} from '../../resources/data/related-field.model';
import {FieldMetadata, TableService} from "../../services/table.service";
import {SelectItem} from "primeng/components/common/api";
import {GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";
import {InfoCampoModificado} from "../../resources/data/infoCampoModificado";

@Component({
  selector: 'gp-form-dropdown-related-field',
  templateUrl: './gp-form-dropdown-related-field.component.html'
})
export class GpFormDropdownRelatedfieldComponent extends GpFormFieldControl {

    @Input() formField: GpFormField;

    _relatedFields: RelatedField[] = [];

    list: any;

    // lo utilizamos para conocer si los datos ya se han cargado
    private listCharged: boolean = false;

    // Drop down.
    currentValueDropDown: string;
    listAllowedValuesOptions: SelectItem[];

    public static FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD: string = "gp-form-dropdown-related-field";

    constructor(private _tableService: TableService, private _gpUtil: GPUtil) {
        super();
    }

    @Input()
    set relatedField(info: InfoCampoModificado) {

        const relatedField: RelatedField = this._gpUtil.getElementFromArray(this.getFieldMetadata().displayInfo.relatedFields, "field", info.field);
        if (info != null && relatedField != null) {
            this.manageRelatedFields(info);

            if ( !this.relatedFieldsSelected ) {
                const label = this.getLabel();
                this.listAllowedValuesOptions = [{label: label, value: null}];
            } else {
                const relatedFieldExt = relatedField.fieldExternal || relatedField.field;
                this.reinicia(relatedFieldExt, info.value);
            }
        }
    }

    public getFormField(): GpFormField {
        return this.formField;
    }

    getFieldMetadata(): FieldMetadata {
        return this.formField.fieldMetadata;
    }

    ngOnInit() {
        this.inicializa();
    }

    inicializa() {
        this.listAllowedValuesOptions = [];
        this._relatedFields = this.formField.fieldMetadata.displayInfo.relatedFields;
        if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.referencedTable != null && this.formField.fieldMetadata.displayInfo.referencedTable != "") {
            // Cargamos los datos de una tabla?
            console.log("GpFormDropdownFieldComponent.ngOnInit: loading from table " + this.formField.fieldMetadata.displayInfo.referencedTable);
            this.listAllowedValuesOptions = [{label: "Cargando los datos del desplegable ...", value: null}];
            console.log(this.formField.fieldMetadata.displayInfo.referencedTable);
            let fieldToOrderBy = this.formField.fieldMetadata.displayInfo.fieldToOrderBy ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy] : null;
            this._tableService.list(this.formField.fieldMetadata.displayInfo.referencedTable, true, true, fieldToOrderBy, this.formField.fieldMetadata.displayInfo.filters)
                .finally(() => this.listCharged = true)
                .subscribe(
                    data => {
                        if (data.ok) {

                            this.list = data.data;
                            if ( !this.relatedFieldsSelected ) {
                                const label = this.getLabel();
                                this.listAllowedValuesOptions = [{label: label, value: null}];
                            }
                        }
                        else {
                            this.list = null;
                            console.error("error al cargar datos");
                        }
                    },
                    err => {
                        this.list = null;
                        console.error("error al cargar datos");
                    });
        } else {
            console.error("No se ha indicado tabla relacionada para obtener los valores del campo " + this.formField.fieldMetadata.fieldName);
        }
    }

    reinicia(field: string, value: any) {

        if (this.listCharged && this.list) {
            this.listAllowedValuesOptions = [{
                label: "Seleccione " + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + " ...",
                value: null
            }];
            for (let row of this.list) {

                if (row[field] == value) {

                    let optionLabel = "";
                    let separator = "";
                    for (let fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
                        optionLabel += separator + row[fieldDesc];
                        separator = " - ";
                    }
                    this.listAllowedValuesOptions.push({
                                                           label: optionLabel,
                                                           value: row[this.formField.fieldMetadata.displayInfo.referencedField]
                                                       });
                }
            }
            // Solo tiene cargado la info de selección
            if (this.listAllowedValuesOptions.length == 1) {
                this.listAllowedValuesOptions = [{
                    label: "No existen opciones para el valor seleccionado",
                    value: null
                }];
            }
            // Si el valor no existe dentro de las opciones, se reinicia el valor
            if (this.listAllowedValuesOptions.filter(item => {
                return item.value == this.currentValueDropDown
            }).length == 0) {
                this.currentValueDropDown = null;
            }
        } else if (!this.listCharged) {
            // Si los datos se encuentran pendientes de cargarse, esperamos un segundo
            setTimeout(() => {
                this.reinicia(field, value)
            }, 200);
        } else {
            this.listAllowedValuesOptions = [{label: "No existen opciones para el valor seleccionado", value: null}];
        }


    }

    copyValueFromControlToEditedRow(editedRow: any) {
        editedRow[this.formField.fieldMetadata.fieldName] = this.currentValueDropDown;
    }

    copyValueFromEditedRowToControl(editedRow: any) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        this.currentValueDropDown = editedRow[this.formField.fieldMetadata.fieldName];
        console.log("        value dropdown: " + this.currentValueDropDown);
    }

    validateField(editedRow: any) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;

        let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];

        if (this.formField.fieldMetadata.notNull && (valorCampo == "" || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            return false;
        }

        return this.formField.validField;
    }

    /**
     * Informa el estado de los campos relacionados
     * @param info: campo relacionado que ha sido modificado
     */
    manageRelatedFields(info: InfoCampoModificado) {

        const relatedField = this._gpUtil.getElementFromArray(this._relatedFields, 'field', info.field);
        if (relatedField) {
            relatedField.selected = info.value != null;
        }

        console.log(this._relatedFields);
    }

    getLabel(): string {
        let fields = this._relatedFields.filter((value) => {
            value.selected == false
        })
            .map(value => value.fieldDescription.toLowerCase()).join(', ');
        const indexLastComa = fields.lastIndexOf(',');

        return 'Primero debe seleccionar ' + fields.substring(0, indexLastComa) + ' y' + fields.substring(indexLastComa + 1);
    }

    relatedFieldsSelected(): boolean {
        let allFieldsSelected = true;
        if (this._relatedFields) {
            this._relatedFields.forEach(value => allFieldsSelected = allFieldsSelected && value.selected);
        }
        return allFieldsSelected;
    }
}


