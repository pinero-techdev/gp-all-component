import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from 'primeng/components/common/api';
import {GPUtil} from '../../resources/data/gpUtil';
import {InfoCampoModificado} from '../../resources/data/infoCampoModificado';
import {RelatedField} from '../../resources/data/related-field.model';
import {FieldMetadata, TableService} from '../../services/table.service';
import {GpFormField, GpFormFieldControl} from './gp-app-table-crud-shared';

@Component({
             selector: 'gp-form-dropdown-related-field',
             templateUrl: './gp-form-dropdown-related-field.component.html'
           })
export class GpFormDropdownRelatedfieldComponent extends GpFormFieldControl {

  public static FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD: string = 'gp-form-dropdown-related-field';

  @Input() formField: GpFormField;
  @Input()
  set relatedField( fieldsChanged ) {

    if ( fieldsChanged ) {
      for ( let fieldName in fieldsChanged ) {
        const relatedField = this._gpUtil.getElementFromArray(this._relatedFields, 'field', fieldName );
        if (relatedField) {
          relatedField.value = fieldsChanged[fieldName];
        }
      }
      if ( !this.relatedFieldsSelected() ) {
        const label = this.getLabel();
        this.listAllowedValuesOptions = [{label: label, value: null}];
        // Si se ha modificado el valor, actualizamos
        if ( this._currentValueDropDown != null ) {
          this._currentValueDropDown = null;
        }
      } else {
        // Si todos los campos dependientes se han seleccionado, actualizamos la lista de opciones disponibles
        this.reinicia();
      }
    }

  }
  _relatedFields: RelatedField[] = [];

  @Output()
  valueChanged = new EventEmitter<InfoCampoModificado>();


  list: any;
  // Drop down.
  currentValueDropDown: string;
  listAllowedValuesOptions: SelectItem[];
  // lo utilizamos para conocer si los datos ya se han cargado
  private listCharged: boolean = false;

  constructor(private _tableService: TableService, private _gpUtil: GPUtil) {
    super();
  }

  set _currentValueDropDown(value:string) {
    this.currentValueDropDown = value;
    let infoCampoModificado = new InfoCampoModificado(this.formField.fieldMetadata.fieldName, this.currentValueDropDown);
    this.valueChanged.emit(infoCampoModificado);
  }

  get _currentValueDropDown():string {
    return this.currentValueDropDown;
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
    if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.referencedTable != null && this.formField.fieldMetadata.displayInfo.referencedTable != '') {
      // Cargamos los datos de una tabla?
      console.log('GpFormDropdownFieldComponent.ngOnInit: loading from table ' + this.formField.fieldMetadata.displayInfo.referencedTable);
      this.listAllowedValuesOptions = [{label: 'Cargando los datos del desplegable ...', value: null}];
      console.log(this.formField.fieldMetadata.displayInfo.referencedTable);
      let fieldToOrderBy = this.formField.fieldMetadata.displayInfo.fieldToOrderBy ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy] : null;
      this._tableService.list(this.formField.fieldMetadata.displayInfo.referencedTable, true, true, fieldToOrderBy, this.formField.fieldMetadata.displayInfo.filters)
        .finally(() => this.listCharged = true)
        .subscribe(
          data => {
            if (data.ok) {

              this.list = data.data;
              this.processData();
            } else {
              this.list = null;
              console.error('error al cargar datos');
            }
          },
          err => {
            this.list = null;
            console.error('error al cargar datos');
          });
    } else {
      console.error('No se ha indicado tabla relacionada para obtener los valores del campo ' + this.formField.fieldMetadata.fieldName);
    }
  }

  reinicia() {

    if (this.listCharged && this.list) {

      this.processData();

      // Solo tiene cargado la info de selecciÃ³n
      if (this.listAllowedValuesOptions.length == 1) {
        this.listAllowedValuesOptions = [{
          label: 'No existen opciones para el valor seleccionado',
          value: null
        }];
      }
      // Si el valor no existe dentro de las opciones, se reinicia el valor
      if (this.listAllowedValuesOptions.filter(item => {
        return item.value == this._currentValueDropDown;
      }).length == 0) {
        this._currentValueDropDown = null;
      }
    } else if (!this.listCharged) {
      // Si los datos se encuentran pendientes de cargarse, esperamos un 0.2 segundos
      setTimeout(() => {
        this.reinicia();
      }, 200);
    } else {
      this.listAllowedValuesOptions = [{label: 'No existen opciones para el valor seleccionado', value: null}];
    }


  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = this._currentValueDropDown;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormTextFieldComponent.changeSelectedRow: ' + JSON.stringify(this.formField.fieldMetadata));
    console.log('        editedRow: ' + JSON.stringify(editedRow));
    this._currentValueDropDown = editedRow[this.formField.fieldMetadata.fieldName];
    console.log('        value dropdown: ' + this._currentValueDropDown);
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];

    if (this.formField.fieldMetadata.notNull && (valorCampo == '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    return this.formField.validField;
  }

  /**
   * FunciÃ³n que devuelve la descripciÃ³n de la opciÃ³n con los campos relacionados que faltan por seleccionar.
   */
  getLabel(): string {
    let fields = this._relatedFields.filter(field => field.value == null )
                                    .map(
                                      item =>
                                        item.fieldDescription.toLowerCase()
                                    );


    let label = 'Primero debe seleccionar ';
    if ( fields.length === 1 ) {
      label +=  fields.toString();
    } else {
      const fieldsString = fields.join(',');
      const indexLastComa = fieldsString.lastIndexOf(',');
      label += fieldsString.substring(0, indexLastComa) + ' y ' + fieldsString.substring(indexLastComa + 1)
    }

    return label;
  }

  /**
   * FunciÃ³n que determina si todos los campos relacionados han sido seleccionados
   */
  relatedFieldsSelected(): boolean {
    let allFieldsSelected = true;
    if (this._relatedFields) {
      this._relatedFields.forEach(field => allFieldsSelected = allFieldsSelected && field.value != null);
    }
    return allFieldsSelected;
  }

  /**
   * Procedimiento que segÃºn se cumplan los campos relacionados introducirÃ¡ el listado de opciones que cumplen
   * con ellos. En el caso contrario, el listado de opciones contendrÃ¡ un solo item, con la informaciÃ³n de los campos
   * relacionados que faltan por seleccionar
   */
  processData() {
    if (!this.relatedFieldsSelected) {
      const label = this.getLabel();
      this.listAllowedValuesOptions = [{label: label, value: null}];
    } else {
      this.listAllowedValuesOptions = [{
        label: "Seleccione " + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + " ...",
        value: null
      }];
      const optionsAllowed = this.list.filter(item => {
                                                      let valid = true;
                                                      for (let relatedField  of this._relatedFields) {
                                                        var fieldExt = relatedField.fieldExternal || relatedField.field;
                                                        valid = valid && relatedField.value == item[ fieldExt ];
                                                      }
                                                      return valid;
                                                    })
                                      .map((item) => {
                                                      let optionLabel = '';
                                                      let separator = '';
                                                      for (let fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
                                                        optionLabel += separator + item[fieldDesc];
                                                        separator = ' - ';
                                                      }
                                                      return {label: optionLabel, value: item[this.formField.fieldMetadata.displayInfo.referencedField]};
                                                    } );
      this.listAllowedValuesOptions = this.listAllowedValuesOptions.concat( optionsAllowed );
    }
  }

}


