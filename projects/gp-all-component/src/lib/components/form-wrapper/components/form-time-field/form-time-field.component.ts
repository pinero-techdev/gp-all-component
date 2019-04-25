import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/gp-form-field.model';
import { GPUtil } from '@lib/services/core/gp-util.service';
import { TableService } from '@lib/services/api/table/table.service';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';

@Component({
  selector: 'gp-form-time-field',
  templateUrl: './form-time-field.component.html',
  styleUrls: ['./form-time-field.component.scss'],
})
export class FormTimeFieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  timeFormat = 'hh:mm';

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = GPUtil.dateTohhmm(this.currentValue);
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    const value = editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValue = GPUtil.str2Date(value, this.timeFormat);
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

    // Tiene que cumplir con el formato hh:mm. Con formato 24h
    if (!/(([0-1][1-9])|(2[0-3])):[0-5][0-9]/.test(valorCampo)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(
        `El valor indicado no cumple con un formato 
                válido: "hh:mm". Ejemplo  de hora válida: 01:45`
      );
      this.formField.validField = false;
    }
    return this.formField.validField;
  }
}
