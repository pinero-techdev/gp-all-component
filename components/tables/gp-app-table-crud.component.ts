import {Component, Input, OnInit, ViewChildren, QueryList, ViewEncapsulation, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {Message} from 'primeng/primeng';

import {TableService, TableMetadata, FieldMetadata} from "../../services/table.service";
import {GpFormDropdownFieldComponent} from "./gp-form-dropdown-field.component";
import {GpFormTextFieldComponent} from "./gp-form-text-field.component";
import {GpFormSwitchFieldComponent} from "./gp-form-switch-field.component";
import {GpFormControl, GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";
import {GpFormCheckboxFieldComponent} from "./gp-form-checkbox-field.component";
import {GpFormWysiwygFieldComponent} from "./gp-form-wysiwyg-field.component";
import {GpFormCalendarFieldComponent} from "./gp-form-calendar-field.component";
import {GpFormTextAreaFieldComponent} from "./gp-form-textarea-field.component";
import {GpFormTimeFieldComponent} from "./gp-form-time-field.component";
import {GpFormImgFieldComponent} from "./gp-form-img-field.component";
import {GpFormDropdownRelatedfieldComponent} from "./gp-form-dropdown-related-field.component";
import {InfoCampoModificado} from "../../resources/data/infoCampoModificado";

@Component({
  selector: 'gp-app-table-crud',
  templateUrl: './gp-app-table-crud.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GpAppTableCrudComponent implements OnInit {

  // Nombre de la tabla a editar.
  @Input() tableName : string;

  // Indicador de trabajando.
  working : boolean = true;

  // Descripcion de la tabla a editar.
  tableLabel: string;

  // Columnas de la tabla.
  columnas : GpFormField[] = [];
  columnasTabla : GpFormField[] = [];

  // Elementos de la tabla.
  elementos: any[] = [];

  // Fila seleccionada.
  selectedRow: any;

  columnasTablaDetail: GpFormField[] = [];
  elementosDetail: any[] = [];
  selectedDetailRow: any;

  // Indica si se muestra el control de edicion.
  displayEdicion = false;

  // Indica si se han producido errores en el dialog. Si es así, se recarga la tabla.
  dialogErrors = false;

  // Puede el usuario borrar registros?
  canDelete: boolean = false;

  // Puede el usuario editar registros=
  canEdit: boolean = false;

  // Mensajes de edicion.
  msgsDialog: Message[] = [];

  // Mensaje global.
  msgsGlobal: Message[] = [];

  // Form control
  formControl: GpFormControl = new GpFormControl();

  // Campo que ha sido modificado por el usuario
  fieldChanged: InfoCampoModificado = null;

  @ViewChildren(GpFormTextFieldComponent) textFormFields: QueryList<GpFormTextFieldComponent>;
  @ViewChildren(GpFormImgFieldComponent) imgFormFields: QueryList<GpFormImgFieldComponent>;
  @ViewChildren(GpFormTextAreaFieldComponent) textAreaFormFields: QueryList<GpFormTextAreaFieldComponent>;
  @ViewChildren(GpFormTimeFieldComponent) timeFormFields: QueryList<GpFormTimeFieldComponent>;
  @ViewChildren(GpFormSwitchFieldComponent) switchFormFields: QueryList<GpFormSwitchFieldComponent>;
  @ViewChildren(GpFormDropdownFieldComponent) dropdownFormFields: QueryList<GpFormDropdownFieldComponent>;
  @ViewChildren(GpFormCheckboxFieldComponent) checkboxFormFields: QueryList<GpFormCheckboxFieldComponent>;
  @ViewChildren(GpFormCalendarFieldComponent) calendarFormFields: QueryList<GpFormCalendarFieldComponent>;
  @ViewChildren(GpFormWysiwygFieldComponent) wysiwygFormFields: QueryList<GpFormWysiwygFieldComponent>;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private tableService: TableService ) {
    // TODO Controlar.
    this.canEdit = true;
    this.canDelete = true;
    this.msgsGlobal = [];
    this.closeDialog();
  }

  ngOnInit() {
  }

  // Se llama cuando se selecciona una nueva tabla.
  cambiaTabla(tableName: string) {
    //	TODO Chequear que no estemos en medio de una edicion.
    if( tableName == this.tableName ) {
      this.working = false;
      return;
    }

    this.working = true;
    this.columnas = [];
    this.columnasTabla = [];
    this.tableName = tableName;
    this.elementos = [];
    this.selectedRow = null;
    this.elementosDetail = [];
    this.selectedDetailRow = null;
    this.formControl.originalRow = null;
    this.msgsDialog = [];
    this.msgsGlobal = [{severity:'info', detail:'Cargando los datos de la tabla.' }];
    this.dialogErrors = false;
    let listRs = this.tableService.list(this.tableName, true).subscribe(
      data => {
        // console.log('getMetadata response:' + JSON.stringify( data ) );
        if (data.ok) {
          this.actualizaDefinicion( data.metadata );
          this.elementos = data.data;
        } else {
          if (data.error != null && data.error.errorMessage != null) {
            if (data.error.errorMessage == "No se ha establecido sesion o se ha perdido."){
              this.router.navigate(['login']);
            }
            this.showError(data.error.errorMessage.toString());
          } else {
            this.showError('');
          }
        }
      },
      err => {
        console.error(err);
        this.showError('');
      },
      () => {
        console.log('getMetadata finalizado');
        this.working = false;
      }
    );
  }

  actualizaDefinicion(tableMetadata: TableMetadata) {
    let tempColumnas : GpFormField[] = [];
    let tempColumnasTabla : GpFormField[] = [];
    let tempMastersDetails : GpFormField[] = [];
    // console.log('Table label: ' + tableMetadata.tableLabel );
    this.tableLabel = tableMetadata.tableLabel;
    for (let metadata of tableMetadata.fields ) {
      let formField = new GpFormField( this.formControl, metadata );
      tempColumnas.push( formField );
      if( metadata.displayInfo.displayType == "MASTER_DETAIL" )
      {
        tempMastersDetails.push( formField );
      }
      else {
        if( formField.fieldMetadata.lengthInTable != 0 )
        {
          tempColumnasTabla.push( formField );
        }
      }
    }
    for( var col of tempColumnas )
    {
      this.calcFieldType( col );
    }
    this.columnas = tempColumnas;
    this.columnasTabla = tempColumnasTabla;
    this.columnasTablaDetail = tempMastersDetails;
  }

  calcFieldType( formField : GpFormField ) {
    // TODO Calcula el tipo de componente a utilizar para el control.
    //console.log( "GpAppTableCrudComponent.calcFieldType( " + JSON.stringify( formField.fieldMetadata ) + ")" );
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
    //console.log( "GpAppTableCrudComponent.calcFieldType, result -> " + JSON.stringify( formField ) );
  }

  showError(message: string) {
    message = message || "Se ha producido un error realizando la operación solicitada.";
    this.msgsGlobal = [{severity:'error', summary:'Atención', detail:message }];
  }

  onRowSelect(event: any) {
    console.log("RowSelect: " + JSON.stringify(event));
    this.tableService.selectOneRow( this.tableName, JSON.stringify( this.selectedRow ) ).subscribe(
      data => {
        if( !data.ok ) {
          this.showErrorDialogo( "Error recuperando el registro." );
          console.log("onRowSelect. Error recuperando: " + JSON.stringify( data ) );
        }
        else {
          this.formControl.editedRow = JSON.parse(JSON.stringify( data.data ));
          this.formControl.originalRow = JSON.parse(JSON.stringify( data.data ));
          console.log("Edited row: " + JSON.stringify(this.formControl.editedRow));
          let self = this;
          this.forEachFieldControl( function( col : GpFormFieldControl ) {
            console.log( "onRowSelect, cvfertc: " + JSON.stringify( col.getFormField() ) );
            col.copyValueFromEditedRowToControl( self.formControl.editedRow );
            col.clearValidations();
          } );
          this.formControl.edicionEdit = true;
          this.displayEdicion = true;
        }
      },
      err => {
        this.showErrorDialogo( "Error interno recuperando el registro." );
        console.log("onRowSelect. Error seleccionando: " + JSON.stringify( err ) );
      },
      () => {
        this.formControl.lockFields = false;
        console.log("onRowSelect. end select." );
      } );
  }

  onRowUnselect(){
    console.log("RowUnselect: " + JSON.stringify(event));
    this.closeDialog();
  }

  onDialogClose() {
    this.closeDialog();
  }

  onDialogDelete() {
    this.formControl.lockFields = true;
    console.log("onDialogDelete.");
    console.log("onDialogDelete. original: " + JSON.stringify( this.formControl.originalRow ));
    let jsonDeleteRow = JSON.stringify( this.formControl.originalRow );
    console.log("onDialogDelete. original: " + jsonDeleteRow);
    this.tableService.deleteRow( this.tableName, jsonDeleteRow ).subscribe(
      data => {
        if( data.ok ) {
          // Borramos el registro.
          let i = this.elementos.indexOf( this.selectedRow );
          if( i >= 0 )
          {
            console.log("onDialogDelete. before: " + JSON.stringify( this.elementos ) );
            this.elementos.splice(i,1);
            console.log("onDialogDelete. after: " + JSON.stringify( this.elementos ) );
          }
          // Y cerramos el dialog.
          this.closeDialog();
        }
        else {
          this.showErrorDialogo( "Error borrando el registro: " + data.error.errorMessage );
        }
      },
      err => {
        this.showErrorDialogo( "Error interno borrando el registro." );
        console.log("onDialogDelete. Error borrando: " + JSON.stringify( err ) );
      },
      () => {
        this.formControl.lockFields = false;
        console.log("onDialogDelete. end delete." );
      });
  }

  validateEditRow() {
    let valid = true;
    let self = this;
    let inAddOperation = this.formControl.edicionAdd;
    this.forEachFieldControl( function( col : GpFormFieldControl ) {
      // El orden del and hace que siempre se ejecute el validateField. Si se pone
      // al reves, cuando valid pase a ser falso no se volvera a llamar a
      // col.validateField por la evaluacion en cortocircuito.
      if (!inAddOperation || !col.getFormField().fieldMetadata.hideInAddOperation) {
        valid = col.validateField(self.formControl.editedRow) && valid;
      }
    } );
    return valid;
  }

  onDialogSave() {
    this.formControl.lockFields = true;
    //console.log("onDialogSave.");
    let self = this;
    this.forEachFieldControl( function( col : GpFormFieldControl ) {
      col.copyValueFromControlToEditedRow( self.formControl.editedRow );
    } );
    if( !this.validateEditRow() ) {
      this.formControl.lockFields = false;
      return;
    }
    let jsonModifiedRow = JSON.stringify(this.formControl.editedRow);
    console.log("onDialogSave. modified: " + jsonModifiedRow);
    if( this.selectedRow != null ) {
      let jsonOriginalRow = JSON.stringify( this.formControl.originalRow );
      console.log("onDialogSave. original: " + jsonOriginalRow);
      this.tableService.updateRow( this.tableName, jsonOriginalRow, jsonModifiedRow ).subscribe(
        data => {
          if( data.ok ) {
            // Actualizamos el registro.
            this.forEachField( function( col : GpFormField ) {
              self.selectedRow[col.fieldMetadata.fieldName] = self.formControl.editedRow[col.fieldMetadata.fieldName];
            } );
            // Y cerramos el dialog.
            this.closeDialog();
          }
          else {
            this.showErrorDialogo( "Error actualizando el registro: " + data.error.errorMessage );
          }
        },
        err => {
          this.showErrorDialogo( "Error interno actualizando el registro." );
          console.log("onDialogSave. Error actualizando: " + JSON.stringify( err ) );
        },
        () => {
          this.formControl.lockFields = false;
          console.log("onDialogSave. end update." );
        });
    }
    else {
      this.tableService.insertRow( this.tableName, jsonModifiedRow ).subscribe(
        data => {
          if( data.ok ) {
            // Insertamos el registro.
            this.elementos.push( data.insertedRow );
            // Y cerramos el dialog.
            this.closeDialog();
          }
          else {
            this.showErrorDialogo( "Error insertando el registro: " + data.error.errorMessage );
          }
        },
        err => {
          this.showErrorDialogo( "Error interno insertando el registro." );
          console.log("onDialogSave. Error insertando: " + JSON.stringify( err ) );
        },
        () => {
          this.formControl.lockFields = false;
          console.log("onDialogSave. end insert." );
        });
    }
  }

  closeDialog() {
    this.displayEdicion = false;
    this.formControl.lockFields = false;
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.formControl.edicionAdd = false;
    this.formControl.edicionEdit = false;
    this.msgsDialog = [];
    if( this.dialogErrors )
    {
      this.cambiaTabla( this.tableName );
    }
  }

  onDialogChangeField( change: any ) {
    console.log("onDialogChangeField: " + JSON.stringify( change.name ));
    change.formField.copyValueFromControlToEditedRow( this.formControl.editedRow );
  }

  onDialogAdd() {
    console.log("onDialogAdd");
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.formControl.editedRow = {};
    let self = this;
    this.forEachFieldControl( function( col : GpFormFieldControl ) {
      self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = null;
      col.copyValueFromEditedRowToControl( self.formControl.editedRow );
      col.clearValidations();
    } );
    this.formControl.edicionEdit = false;
    this.formControl.edicionAdd = true;
    this.displayEdicion = true;
  }

  showErrorDialogo( msg : string )
  {
    console.log("showErrorDialog " + msg );
    this.dialogErrors = true;
    this.msgsDialog.push( {severity:'error', summary:'Error', detail:msg} );
  }

  forEachField( f : ( col : GpFormField ) => void ) {
    let self = this;
    this.columnas.forEach( col => {
        f(col);
    } );
  }

  forEachFieldControl( f : ( col : GpFormFieldControl ) => void ) {
    let self = this;
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

  changeEvent(info: InfoCampoModificado)
  {
    this.fieldChanged = info;
  }

}


