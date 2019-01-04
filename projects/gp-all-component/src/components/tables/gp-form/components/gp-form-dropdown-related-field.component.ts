import {Component, Input} from '@angular/core';
import {SelectItem} from 'primeng/components/common/api';
import {finalize} from 'rxjs/operators';
import {DataTableMetaDataField} from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import {InfoCampoModificado} from '../../../../resources/data/info-campo-modificado.model';
import {TableService} from '../../../../services/table.service';
import {GpFormFieldControl} from '../resources/gp-form-field-control';
import {GpFormField} from '../resources/gp-form-field.model';

@Component({
  selector: 'gp-form-dropdown-related-field',
  templateUrl: './gp-form-dropdown-related-field.component.html'
})
export class GpFormDropdownRelatedfieldComponent extends GpFormFieldControl {
  constructor(private _tableService: TableService) {
    super();
  }

  @Input()
  set relatedField(info: InfoCampoModificado) {
    if (info != null && info.field === this.formField.fieldMetadata.displayInfo.relatedField) {
      this._relatedField.value = info.value;
      if (info.value == null) {
        this.listAllowedValuesOptions = [{
          label: 'Seleccione primero el campo del que depende ...',
          value: null
        }];
      } else {
        const relatedFieldExt = this.formField.fieldMetadata.displayInfo.relatedFieldExt || this.formField.fieldMetadata.displayInfo.relatedField;
        this.reinicia(relatedFieldExt, info.value);
      }
    }
  }

  _relatedField = new InfoCampoModificado();

  list: any;

  private listCharged = false;

  listAllowedValuesOptions: SelectItem[];

  public getFormField(): GpFormField {
    return this.formField;
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  // FIXME implement lifecycle OnInit
  inicializa() {
    this.listAllowedValuesOptions = [];
    this._relatedField.field = this.formField.fieldMetadata.displayInfo.relatedField;
    if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.referencedTable != null
      && this.formField.fieldMetadata.displayInfo.referencedTable !== '') {
      // Cargamos los datos de una tabla?
      this.listAllowedValuesOptions = [{label: 'Cargando los datos del desplegable ...', value: null}];
      const fieldToOrderBy =
        this.formField.fieldMetadata.displayInfo.fieldToOrderBy ? [this.formField.fieldMetadata.displayInfo.fieldToOrderBy] : null;
      this._tableService.list(this.formField.fieldMetadata.displayInfo.referencedTable, true, true,
        fieldToOrderBy, this.formField.fieldMetadata.displayInfo.filters)
        .pipe(finalize(() => this.listCharged = true))
        .subscribe(
          data => {
            if (data.ok) {
              this.list = data.data;
              if (!this._relatedField || !this._relatedField.value) {
                this.listAllowedValuesOptions = [{
                  label: 'Seleccione primero el campo del que depende ...',
                  value: null
                }];
              }
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

  reinicia(field: string, value: any) {

    if (this.listCharged && this.list) {
      this.listAllowedValuesOptions = [{
        label: 'Seleccione ' + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + ' ...',
        value: null
      }];
      for (const row of this.list) {
        if (row[field] === value) {
          let optionLabel = '';
          let separator = '';
          for (const fieldDesc of this.formField.fieldMetadata.displayInfo.fieldDescriptions) {
            optionLabel += separator + row[fieldDesc];
            separator = ' - ';
          }
          this.listAllowedValuesOptions.push({
            label: optionLabel,
            value: row[this.formField.fieldMetadata.displayInfo.referencedField]
          });
        }
      }
      // Solo tiene cargado la info de selección
      if (this.listAllowedValuesOptions.length === 1) {
        this.listAllowedValuesOptions = [{
          label: 'No existen opciones para el valor seleccionado',
          value: null
        }];
      }
      // Si el valor no existe dentro de las opciones, se reinicia el valor
      if (this.listAllowedValuesOptions.filter(item => {
        return item.value === this.currentValue;
      }).length === 0) {
        this.currentValue = null;
      }
    } else if (!this.listCharged) {
      // Si los datos se encuentran pendientes de cargarse, esperamos un segundo
      setTimeout(() => {
        this.reinicia(field, value);
      }, 200);
    } else {
      this.listAllowedValuesOptions = [{label: 'No existen opciones para el valor seleccionado', value: null}];
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
}
