import { Component, OnInit, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from '@lib/services/api/table/table.service';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';
import { GPUtil } from '@lib/services/core/gp-util.service';

@Component({
  selector: 'gp-form-textarea-field',
  templateUrl: './form-text-area-field.component.html',
  styleUrls: ['./form-text-area-field.component.scss'],
})
export class FormTextAreaFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;

  textboxClass: string;

  minLength: number;
  maxLength: number;

  rows: number;

  translationKeys = '';

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  ngOnInit() {
    this.inicializa();
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  inicializa() {
    if (
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties != null
    ) {
      if (
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1
      ) {
        this.textboxClass = 'text-uppercase';
      }
    }

    // Procesa restricciones.
    if (this.formField.fieldMetadata.restrictions) {
      for (const restriction of this.formField.fieldMetadata.restrictions) {
        if (restriction.restrictionType === GpTableRestrictions.MIN_LENGTH) {
          this.minLength = restriction.minLength;
        } else if (restriction.restrictionType === GpTableRestrictions.MAX_LENGTH) {
          this.maxLength = restriction.maxLength;
        }
      }
    }

    if (this.formField.fieldMetadata.displayInfo.rowsTextArea > 0) {
      this.rows = this.formField.fieldMetadata.displayInfo.rowsTextArea;
    } else {
      this.rows = 3;
    }
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    let newValue = this.currentValue;
    if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
      if (
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) >= 0
      ) {
        newValue = newValue == null ? null : newValue.toUpperCase();
        this.currentValue = newValue;
      }
      if (
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) >= 0
      ) {
        newValue = newValue == null ? null : newValue.trim();
        this.currentValue = newValue;
      }
    }
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
    // Si tiene traducción, recogemos todos los valores de los campos que actuan como
    // identificadores y los juntamos para crear el identificador de la tabla de traducciones
    if (
      this.formField.fieldMetadata.displayInfo.translationInfo != null &&
      this.formField.fieldMetadata.displayInfo.translationInfo.keyFields != null
    ) {
      this.translationKeys = '';
      for (const keyField of this.formField.fieldMetadata.displayInfo.translationInfo.keyFields) {
        this.translationKeys += editedRow[keyField];
      }
    }
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
    if (
      typeof valorCampo === 'string' &&
      this.formField.fieldMetadata.displayInfo.displayType === TableService.TEXT_DISPLAY_TYPE
    ) {
      valorCampo = valorCampo.trim();
    }

    // Validacion del campo.
    // a) Null?
    if (this.formField.fieldMetadata.notNull && (valorCampo === '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    if (this.formField.fieldMetadata.restrictions) {
      for (const restriction of this.formField.fieldMetadata.restrictions) {
        if (
          restriction.restrictionType === GpTableRestrictions.MIN_LENGTH &&
          typeof valorCampo === 'string'
        ) {
          if (valorCampo.length < restriction.minLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(
              'Valor demasiado corto (longitud mínima ' + restriction.minLength + ')'
            );
          }
        } else if (
          restriction.restrictionType === GpTableRestrictions.MAX_LENGTH &&
          typeof valorCampo === 'string'
        ) {
          if (valorCampo.length > restriction.maxLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(
              'Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')'
            );
          }
        }
      }
    }

    // En el caso de que el campo no permita caracteres ASCII,
    // hacemos la conversión de dichos carácteres a carácteres válidos
    if (!this.formField.fieldMetadata.allowAscii) {
      if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
        if (
          this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
            TableService.TEXT_NO_SPACE
          ) !== -1
        ) {
          if (/\s/.test(valorCampo)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(
              `El valor indicado no puede contener espacios. Han sido eliminados.
                             Seleccione guardar otra vez para aceptar los cambios.`
            );
            valorCampo = valorCampo.replace(/\s/g, '');
            this.currentValue = valorCampo;
          }
        }
      }

      // Por defecto, solo caracteres ASCII.
      if (/[\u0000-\u0019]/.test(valorCampo)) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(
          `El valor indicado contiene caracteres de control. Han sido sustituidos por
                     espacios. Seleccione guardar otra vez para aceptar los cambios.`
        );
        valorCampo = valorCampo.replace(/[\u0000-\u0019]/g, ' ');
        this.currentValue = valorCampo;
      }
      if (/[\u0080-\uFFFF]/.test(valorCampo)) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(
          `El valor indicado contiene caracteres no válidos
                     (acentos, eñes ...). Han sido sustituidos por caracteres equivalentes
                      o descartados. Seleccione guardar otra vez para aceptar los cambios.`
        );
        valorCampo = GPUtil.normaliza(valorCampo);
        this.currentValue = valorCampo;
      }
    }

    return this.formField.validField;
  }
}
