import { Component, Input, OnInit } from '@angular/core';
import { TableService, FieldMetadata } from '../../services/table.service';
import { GPUtil } from '../../resources/data/gpUtil';
import { GpFormField, GpFormFieldControl } from './gp-app-table-crud-shared';

@Component({
  selector: 'gp-form-text-field',
  templateUrl: './gp-form-text-field.component.html'
})
export class GpFormTextFieldComponent extends GpFormFieldControl implements OnInit {
 
  @Input() formField: GpFormField;

  currentValueText: string;
  textboxClass: string = 'full-width';

  minLength: number;
  maxLength: number;

  translationKeys: string = '';

  // Vars control Insercion, edicion, borrado
  @Input() canAdd = true;
  @Input() canEdit = true;
  @Input() canDelete = true;

  public static FORM_FIELD_TYPE_TEXT_FIELD: string = 'gp-form-text-field';

  getFieldMetadata(): FieldMetadata {
    return this.formField.fieldMetadata;
  }

  ngOnInit() {
    this.inicializa();
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  inicializa() {
    if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.textProperties != null) {
      if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_UPPERCASE) != -1) {
        this.textboxClass = 'full-width text-uppercase';
      }
    }

    // Procesa restricciones.
    if (this.formField.fieldMetadata.restrictions) {
      for (let restriction of this.formField.fieldMetadata.restrictions) {
        if (restriction.restrictionType == TableService.RESTRICTION_MIN_LENGTH) {
          this.minLength = restriction.minLength;
        } else if (restriction.restrictionType == TableService.RESTRICTION_MAX_LENGTH) {
          this.maxLength = restriction.maxLength;
        }
      }
    }
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    let newValue = this.currentValueText;
    console.log("GpFormTextFieldComponent.changeItemValue currentValue '" + value + "' -> '" + newValue + "'");
    console.log(this.formField.fieldMetadata.displayInfo);
    if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
      console.log('GpFormTextFieldComponent. textProperties: ' + JSON.stringify(this.formField.fieldMetadata.displayInfo.textProperties));
      if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_UPPERCASE) >= 0) {
        newValue = newValue == null ? null : newValue.toUpperCase();
        this.currentValueText = newValue;
        console.log("GpFormTextFieldComponent.convert to upper case '" + newValue + "'");
      }
      if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) >= 0) {
        newValue = newValue == null ? null : newValue.trim();
        this.currentValueText = newValue;
        console.log("GpFormTextFieldComponent.trim '" + newValue + "'");
      }
    }

    // console.log("GpFormFieldComponent.changeItemValue newValue '" + newValue + "'" );
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;

  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormTextFieldComponent.changeSelectedRow: ' + JSON.stringify(this.formField.fieldMetadata));
    console.log('        editedRow: ' + JSON.stringify(editedRow));
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValueText = value;

    // Si tiene traducción, recogemos todos los valores de los campos que actuan como identificadores
    // y los juntamos para crear el identificador de la tabla de traducciones
    if (this.formField.fieldMetadata.displayInfo.translationInfo != null &&this.formField.fieldMetadata.displayInfo.translationInfo.keyFields != null) {
      this.translationKeys = '';
      for (let keyField of this.formField.fieldMetadata.displayInfo.translationInfo.keyFields) {
        this.translationKeys += editedRow[keyField];
      }
    }

  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
    if (typeof valorCampo == 'string' && this.formField.fieldMetadata.displayInfo.displayType == TableService.TEXT_DISPLAY_TYPE) {
      valorCampo = valorCampo.trim();
    }

    console.log('GpFormTextFieldComponent.validateField, valorCampo = ' + JSON.stringify(valorCampo));

    // Validacion del campo.
    // a) Null?
    if (this.formField.fieldMetadata.notNull && (valorCampo == '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      console.log('GpFormTextFieldComponent.validateField, no valid, null.');
      return false;
    }

    if (this.formField.fieldMetadata.restrictions) {
      for (let restriction of this.formField.fieldMetadata.restrictions) {
        if (restriction.restrictionType == TableService.RESTRICTION_MIN_LENGTH && typeof valorCampo == 'string') {
          if (valorCampo.length < restriction.minLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('Valor demasiado corto (longitud mínima ' + restriction.minLength + ')');
            console.log('GpFormTextFieldComponent.validateField, no valid, longitud massa curta.');
          }
        } else if (restriction.restrictionType == TableService.RESTRICTION_MAX_LENGTH && typeof valorCampo == 'string') {
          if (valorCampo.length > restriction.maxLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')');
            console.log('GpFormTextFieldComponent.validateField, no valid, longitud massa llarga.');
          }
        }
      }
    }

    if (!this.formField.fieldMetadata.allowAscii) {
      if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
        if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_NO_SPACE) != -1) {
          if (/\s/.test(valorCampo)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor indicado no puede contener espacios. Han sido eliminados. Seleccione guardar otra vez para aceptar los cambios.');
            valorCampo = valorCampo.replace(/\s/g, '');
            this.currentValueText = valorCampo;
          }
          /* 
             @author 3digits 
             Al pasar por la validación el nuevo valor se guarda en el editedRow 
          */
          editedRow[this.formField.fieldMetadata.fieldName] = valorCampo;
        }
      }

      // Por defecto, solo caracteres ASCII.
      if (/[\u0000-\u0019]/.test(valorCampo)) {
        this.formField.validField = false;
        this.validateFieldAddMsgs('El valor indicado contiene caracteres de control. Han sido sustituidos por espacios. Seleccione guardar otra vez para aceptar los cambios.');
        valorCampo = valorCampo.replace(/[\u0000-\u0019]/g, ' ');
        this.currentValueText = valorCampo;
      }
      if (/[\u0080-\uFFFF]/.test(valorCampo)) {
        this.formField.validField = false;
        this.validateFieldAddMsgs('El valor indicado contiene caracteres no válidos (acentos, eñes, c cedillas, ...). Han sido sustituidos por caracteres equivalentes o descartados. Seleccione guardar otra vez para aceptar los cambios.');
        valorCampo = GPUtil.normaliza(valorCampo);
        this.currentValueText = valorCampo;
      }
    }

    return this.formField.validField;
  }
}
