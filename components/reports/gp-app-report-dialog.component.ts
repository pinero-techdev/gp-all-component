import {ViewEncapsulation, OnInit, Input, ViewChildren, QueryList, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ReportService} from "../../services/report.service";
import {GlobalService} from "../../services/global.service";
import {GpFormControl, GpFormField, GpFormFieldControl} from "../tables/gp-app-table-crud-shared";
import {GpFormTextFieldComponent} from "../tables/gp-form-text-field.component";
import {GpFormImgFieldComponent} from "../tables/gp-form-img-field.component";
import {GpFormTextAreaFieldComponent} from "../tables/gp-form-textarea-field.component";
import {GpFormTimeFieldComponent} from "../tables/gp-form-time-field.component";
import {GpFormSwitchFieldComponent} from "../tables/gp-form-switch-field.component";
import {GpFormDropdownFieldComponent} from "../tables/gp-form-dropdown-field.component";
import {GpFormCheckboxFieldComponent} from "../tables/gp-form-checkbox-field.component";
import {GpFormCalendarFieldComponent} from "../tables/gp-form-calendar-field.component";
import {GpFormWysiwygFieldComponent} from "../tables/gp-form-wysiwyg-field.component";
import {FieldMetadata, TableService} from "../../services/table.service";
import {GpFormDropdownRelatedfieldComponent} from "../tables/gp-form-dropdown-related-field.component";
import {InfoCampoModificado} from "../../resources/data/infoCampoModificado";

@Component({
    selector: 'gp-app-report-dialog',
    templateUrl: './gp-app-report-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GpAppReportDialogComponent implements OnInit {
    //Nombre del listado
    _reportName: string;
    _reportTitle: string;
    reportMetadatas: FieldMetadata[];
    reportFields:  GpFormField[];
    fieldChanged: InfoCampoModificado = null;
    formControl: GpFormControl = new GpFormControl();
    extraArgs: string;


    /**
     * Realizamos un setter, para cambiar los atributos de la clase con los metadatos del nuevo report
     * @param name
     */
    @Input()
    set reportName( name: string ){

        this.cambiaReport(name);
        let response = this._reportService.getDialogElements(name);
        this.reportMetadatas =  response.metadata;
        this.formControl.editedRow = response.data;
        this._reportTitle = response.title;
        this.createFormFields(this.reportMetadatas);
    }

    @ViewChildren(GpFormTextFieldComponent) textFormFields: QueryList<GpFormTextFieldComponent>;
    @ViewChildren(GpFormImgFieldComponent) imgFormFields: QueryList<GpFormImgFieldComponent>;
    @ViewChildren(GpFormTextAreaFieldComponent) textAreaFormFields: QueryList<GpFormTextAreaFieldComponent>;
    @ViewChildren(GpFormTimeFieldComponent) timeFormFields: QueryList<GpFormTimeFieldComponent>;
    @ViewChildren(GpFormSwitchFieldComponent) switchFormFields: QueryList<GpFormSwitchFieldComponent>;
    @ViewChildren(GpFormDropdownFieldComponent) dropdownFormFields: QueryList<GpFormDropdownFieldComponent>;
    @ViewChildren(GpFormDropdownRelatedfieldComponent) dropdownFormRelatedFields: QueryList<GpFormDropdownRelatedfieldComponent>;
    @ViewChildren(GpFormCheckboxFieldComponent) checkboxFormFields: QueryList<GpFormCheckboxFieldComponent>;
    @ViewChildren(GpFormCalendarFieldComponent) calendarFormFields: QueryList<GpFormCalendarFieldComponent>;
    @ViewChildren(GpFormWysiwygFieldComponent) wysiwygFormFields: QueryList<GpFormWysiwygFieldComponent>;

    constructor( private _activatedRoute: ActivatedRoute, private _router: Router, private _reportService: ReportService, private _globalService: GlobalService ) {
    }

    ngOnInit() {
        this.cambiaReport(this._reportName);
        let response = this._reportService.getDialogElements(this._reportName);
        this.reportMetadatas = response.metadata;
        this.formControl.editedRow = response.data;
        this._reportTitle = response.title;
        this.createFormFields(this.reportMetadatas);
    }

    cambiaReport(reportName: string) {
        if (!this._globalService.logged) {
            this._router.navigate(['login']);
            return;
        }

        if (reportName == this._reportName) {
            return;
        }

        this._reportName = reportName;
    }


    openReport(){

        let self = this;
        this.forEachFieldControl( function( col : GpFormFieldControl ) {
            col.copyValueFromControlToEditedRow( self.formControl.editedRow );
        } );

        if( this.validateEditRow() ) {

            this.extraArgs = '';

            for (let metadata of this.reportMetadatas) {
                let fieldName = metadata.fieldName;
                let field = this.formControl.editedRow[fieldName];

                if (field != null) {
                    if (metadata.fieldType.toUpperCase() == 'DATE') {
                        // Si es una fecha, la obtenemos en formato yyyy-mm-dd, cuando tendría que ser dd/mm/yyyy
                        this.extraArgs += '&' + fieldName + '=' + field.substr(8, 2) + '/' + field.substr(5, 2) + '/' + field.substr(0, 4);

                    } else {
                        this.extraArgs += '&' + fieldName + '=' + field;
                    }

                }
            }
            window.open(this._reportService.getReportCal(this._reportName, this.extraArgs));
        }

    }

    goHome() {
        this._router.navigate(['home']);
    }

    forEachFieldControl( f : ( col : GpFormFieldControl ) => void ) {

        this.textFormFields.forEach( col => {
            f(col);
        } );
        this.textAreaFormFields.forEach( col => {
            f(col);
        } );
        this.timeFormFields.forEach( col => {
            f(col);
        } );
        this.switchFormFields.forEach( col =>  {
            f(col);
        } );
        this.dropdownFormFields.forEach( col =>  {
            f(col);
        } );
        this.dropdownFormRelatedFields.forEach( col => {
            f(col);
        } );
        this.checkboxFormFields.forEach( col =>  {
            f(col);
        } );
        this.calendarFormFields.forEach( col =>  {
            f(col);
        } );
        this.wysiwygFormFields.forEach( col =>  {
            f(col);
        } );
        this.imgFormFields.forEach( col =>  {
            f(col);
        } );
    }

    private createFormFields(reportMetadatas: FieldMetadata[]) {

        this.reportFields = [];

        for (let metadata of reportMetadatas) {
            
            let formField = new GpFormField( this.formControl, metadata );

            this.calcFieldType( formField );

            this.reportFields.push( formField );

        }

    }

    /**
     * Metodo para obtener el tipo de componente a partir de sus metadatos
     * @param formField
     */
    calcFieldType( formField : GpFormField ) {
        // Calcula el tipo de componente a utilizar para el control.
        // Si no se encuentra una representación mejor, se usa string.
        let selectedDisplay = false;
        if (formField.fieldMetadata.displayInfo.displayType == TableService.TEXT_AREA_DISPLAY_TYPE) {
            formField.formFieldType = GpFormTextAreaFieldComponent.FORM_FIELD_TYPE_TEXT_AREA_FIELD;
            selectedDisplay = true;
        }
        if (formField.fieldMetadata.displayInfo.displayType == TableService.DROPDOWN_DISPLAY_TYPE) {
            formField.formFieldType = GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
            selectedDisplay = true;
        }
        if (formField.fieldMetadata.displayInfo.displayType == TableService.DROPDOWN_RELATED_DISPLAY_TYPE) {
            formField.formFieldType = GpFormDropdownRelatedfieldComponent.FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.CHECKBOX_DISPLAY_TYPE) {
            formField.formFieldType = GpFormCheckboxFieldComponent.FORM_FIELD_TYPE_CHECKBOX_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.SWITCH_DISPLAY_TYPE) {
            formField.formFieldType = GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.HOUR_MINUTE_DISPLAY_TYPE ) {
            formField.formFieldType = GpFormTimeFieldComponent.FORM_FIELD_TYPE_TIME_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.fieldType == "DATE") {
            formField.formFieldType = GpFormCalendarFieldComponent.FORM_FIELD_TYPE_CALENDAR_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.WYSIWYG_DISPLAY_TYPE ) {
            formField.formFieldType = GpFormWysiwygFieldComponent.FORM_FIELD_TYPE_WYSIWYG_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.fieldType == "BOOLEAN") {
            if (formField.fieldMetadata.notNull) {
                formField.formFieldType = GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
                selectedDisplay = true;
            }
            else {
                // Si puede ser null, usamos un combo con Si/No y vacio.
                formField.formFieldType = GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
                selectedDisplay = true;
            }
        }
        if (formField.fieldMetadata.displayInfo.displayType == TableService.IMG_DISPLAY_TYPE) {
            formField.formFieldType = GpFormImgFieldComponent.FORM_FIELD_TYPE_IMG_FIELD;
            selectedDisplay = true;
        }
        // Si no se encuentra una representación mejor, se usa string.
        if (!selectedDisplay) {
            formField.formFieldType = GpFormTextFieldComponent.FORM_FIELD_TYPE_TEXT_FIELD;
        }
    }

    validateEditRow() {
        let valid = true;
        let self = this;
        this.forEachFieldControl( function( col : GpFormFieldControl ) {
            // El orden del and hace que siempre se ejecute el validateField. Si se pone
            // al reves, cuando valid pase a ser falso no se volvera a llamar a
            // col.validateField por la evaluacion en cortocircuito.
            valid = col.validateField( self.formControl.editedRow ) && valid;
        } );
        return valid;
    }

    changeEvent(info: InfoCampoModificado)
    {
        this.fieldChanged = info;
    }

}