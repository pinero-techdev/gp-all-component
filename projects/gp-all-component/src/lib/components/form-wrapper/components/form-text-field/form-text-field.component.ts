import { Component, OnInit, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from './../../../../services/api/table/table.service';
import { GpTableRestrictions } from './../../../../components/table-wrapper/resources/gp-table-restrictions.enum';
import { GPUtil } from './../../../../services/core/gp-util.service';
import { RegexValidations } from '../../resources/regex-validations.type';
@Component({
  selector: 'gp-form-text-field',
  templateUrl: './form-text-field.component.html',
})
export class FormTextFieldComponent extends GpFormFieldControl implements OnInit {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  /**
   * Class for textbox
   */
  textboxClass = 'full-width';

  /**
   * Min length validation value
   */
  minLength: number;

  /**
   * Max length validation value
   */
  maxLength: number;

  /**
   * Translation keys for field
   */
  translationKeys = '';

  ngOnInit() {
    this.inicializa();
  }

  /**
   * Returns current field metadata
   */
  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  /**
   * Returns current form field
   */
  getFormField(): GpFormField {
    return this.formField;
  }

  /**
   * Initializes current component,
   * and sets length validation properties
   */
  inicializa() {
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties !== null;

    if (hasTextProperties) {
      const markedAsUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      if (markedAsUppercase) {
        this.textboxClass = 'full-width text-uppercase';
      }
    }

    const restrictions = this.formField.fieldMetadata.restrictions;

    // Setup restrictions
    if (restrictions) {
      for (const restriction of restrictions) {
        const isMinLength = restriction.restrictionType === GpTableRestrictions.MIN_LENGTH;
        const isMaxLength = restriction.restrictionType === GpTableRestrictions.MAX_LENGTH;

        if (isMinLength) {
          this.minLength = restriction.minLength;
        }

        if (isMaxLength) {
          this.maxLength = restriction.maxLength;
        }
      }
    }
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    let newValue = this.currentValue;
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties !== null;

    if (hasTextProperties) {
      const markedAsUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      const markedAsTrim =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) >=
        0;

      if (markedAsUppercase) {
        newValue = newValue === null ? null : newValue.toUpperCase();
        this.currentValue = newValue;
      }

      if (markedAsTrim) {
        newValue = newValue === null ? null : newValue.trim();
        this.currentValue = newValue;
      }
    }
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    const hasTranslationKeyFields =
      this.formField.fieldMetadata.displayInfo.translationInfo !== null &&
      this.formField.fieldMetadata.displayInfo.translationInfo.keyFields !== null;

    this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];

    if (hasTranslationKeyFields) {
      const keyFields = this.formField.fieldMetadata.displayInfo.translationInfo.keyFields;

      this.translationKeys = '';
      for (const keyField of keyFields) {
        this.translationKeys += editedRow[keyField];
      }
    }
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];

    const isDisplayType =
      typeof valorCampo === 'string' &&
      this.formField.fieldMetadata.displayInfo.displayType === TableService.TEXT_DISPLAY_TYPE;

    if (isDisplayType) {
      valorCampo = valorCampo.trim();
    }

    // Start field validation rules

    // a) Check nullability
    const notNullable =
      this.formField.fieldMetadata.notNull && (valorCampo === '' || valorCampo === null);

    if (notNullable) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    // b) Check length restrictions
    const restrictions = this.formField.fieldMetadata.restrictions;

    if (restrictions) {
      for (const restriction of restrictions) {
        const hasMinLength =
          restriction.restrictionType === GpTableRestrictions.MIN_LENGTH &&
          typeof valorCampo === 'string';

        const hasMaxLength =
          restriction.restrictionType === GpTableRestrictions.MAX_LENGTH &&
          typeof valorCampo === 'string';

        if (hasMinLength) {
          if (valorCampo.length < restriction.minLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(
              'Valor demasiado corto (longitud mínima ' + restriction.minLength + ')'
            );
          }
        }

        if (hasMaxLength) {
          if (valorCampo.length > restriction.maxLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(
              'Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')'
            );
          }
        }
      }
    }

    // c) Check ascii and special characters
    const allowsAscii = this.formField.fieldMetadata.allowAscii;

    if (!allowsAscii) {
      const hasBlankSpace = RegexValidations.hasBlankSpace(valorCampo);
      const disallowsSpaces =
        this.formField.fieldMetadata.displayInfo.textProperties !== null &&
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_NO_SPACE
        ) !== -1;

      if (disallowsSpaces && hasBlankSpace) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(
          `El valor indicado no puede contener espacios. Han sido
                             eliminados. Seleccione guardar otra vez para aceptar los cambios.`
        );
        valorCampo = valorCampo.replace(RegexValidations.BLANK_SPACE, '');
        this.currentValue = valorCampo;
      }

      if (RegexValidations.hasControlSpace(valorCampo)) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(
          `El valor indicado contiene caracteres de control. Han sido
                     sustituidos por espacios. Seleccione guardar
                      otra vez para aceptar los cambios.`
        );
        valorCampo = valorCampo.replace(/[\u0000-\u0019]/g, ' ');
        this.currentValue = valorCampo;
      }

      if (RegexValidations.hasSpecialCharacters(valorCampo)) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(
          `El valor indicado contiene caracteres no válidos (acentos, eñes ...).
                     Han sido sustituidos por caracteres equivalentes o descartados.
                      Seleccione guardar otra vez para aceptar los cambios.`
        );
        valorCampo = GPUtil.normaliza(valorCampo);
        this.currentValue = valorCampo;
      }
    }
    return this.formField.validField;
  }
}
