import { FieldMetadata } from './table.service';
import { GpFormFieldType } from './../../../components/form-wrapper/resources/form-field-type.enum';
import { TableColumnMetadata } from '../../../components/table-wrapper/components/table-editable-crud/resources/table-column-metadata.model';
import { TableService } from './table.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TableMetadataService {
  getTableColumnsFromMetadata(metadata: FieldMetadata[]): TableColumnMetadata[] {
    const columns: TableColumnMetadata[] = [];
    for (const field of metadata) {
      columns.push(this.getTableColumnFromFieldMetadata(field));
    }
    return columns;
  }

  getTableColumnFromFieldMetadata(metadata: FieldMetadata): TableColumnMetadata {
    const column = new TableColumnMetadata();
    column.name = metadata.fieldName;
    this.getRequired(metadata, column);
    column.editable = !metadata.readOnly;
    column.isId = metadata.id;
    column.allowAscii = metadata.allowAscii;
    column.referenceDescription = metadata.referenceDescription;
    column.visible = metadata.lengthInTable !== 0;
    column.hideInAddOperation = metadata.hideInAddOperation;
    column.lengthInTable = metadata.lengthInTable;
    this.getType(metadata, column);
    if (metadata.displayInfo) {
      column.label = metadata.displayInfo.fieldLabel;
      column.order = metadata.displayInfo.order;
      column.translationInfo = metadata.displayInfo.translationInfo;
      if (metadata.displayInfo.rowsTextArea) {
        column.rows = metadata.displayInfo.rowsTextArea;
      }
      column.referencedTable = metadata.displayInfo.referencedTable;
      column.fieldToOrderBy = [metadata.displayInfo.fieldToOrderBy];
      column.optionsValue = metadata.displayInfo.referencedField;
      column.options = metadata.displayInfo.options;
      column.checkedValue = metadata.displayInfo.checkedValue;
      column.uncheckedValue = metadata.displayInfo.uncheckedValue;
      column.relatedFields = metadata.displayInfo.relatedFields;
      if (
        metadata.displayInfo.fieldDescriptions &&
        metadata.displayInfo.fieldDescriptions.length > 0
      ) {
        column.optionsLabels = metadata.displayInfo.fieldDescriptions;
      }
    }
    this.getTextProperties(metadata, column);
    this.getRestrictions(metadata, column);
    return column;
  }

  getRequired(metadata: FieldMetadata, column: TableColumnMetadata) {
    if (metadata.id || metadata.notNull) {
      column.required = true;
    } else if (metadata.restrictions) {
      for (const restriction of metadata.restrictions) {
        if (restriction.restrictionType === TableService.RESTRICTION_NOT_NULL) {
          column.required = true;
          break;
        }
      }
    }
  }

  isEditable(value: any, item: any, column: TableColumnMetadata) {
    if (!column.editable) {
      return false;
    }
    if (column.editableFn) {
      return column.editableFn(value, item, column);
    }
    return true;
  }

  getType(metadata: FieldMetadata, column: TableColumnMetadata) {
    if (metadata.displayInfo.displayType) {
      switch (metadata.displayInfo.displayType) {
        case TableService.IMG_DISPLAY_TYPE: {
          column.type = GpFormFieldType.IMG;
          break;
        }
        case TableService.CHECKBOX_DISPLAY_TYPE: {
          column.type = GpFormFieldType.CHECKBOX;
          break;
        }
        case TableService.TEXT_DISPLAY_TYPE: {
          column.type = GpFormFieldType.TEXT;
          break;
        }
        case TableService.TEXT_AREA_DISPLAY_TYPE: {
          column.type = GpFormFieldType.TEXT_AREA;
          break;
        }
        case TableService.DROPDOWN_DISPLAY_TYPE: {
          column.type = GpFormFieldType.DROPDOWN;
          break;
        }
        case TableService.DROPDOWN_RELATED_DISPLAY_TYPE: {
          column.type = GpFormFieldType.DROPDOWN_RELATED;
          break;
        }
        case TableService.SWITCH_DISPLAY_TYPE: {
          column.type = GpFormFieldType.SWITCH;
          break;
        }
        case TableService.CALENDAR_DISPLAY_TYPE: {
          column.type = GpFormFieldType.CALENDAR;
          break;
        }
        case TableService.HOUR_MINUTE_DISPLAY_TYPE: {
          column.type = GpFormFieldType.TIME;
          break;
        }
        case TableService.WYSIWYG_DISPLAY_TYPE: {
          column.type = GpFormFieldType.WYSIWYG;
          break;
        }
        case TableService.FILE_DISPLAY_TYPE: {
          column.type = GpFormFieldType.FILE;
          break;
        }
        case TableService.NULLABLE_CHECKBOX_DISPLAY_TYPE: {
          column.type = GpFormFieldType.NULLABLE_CHECKBOX;
          break;
        }
        case TableService.NUMBER_FIELD_TYPE: {
          column.type = GpFormFieldType.NUMBER;
          break;
        }
      }
    } else {
      switch (metadata.fieldType) {
        case 'DATE': {
          column.type = GpFormFieldType.CALENDAR;
          break;
        }
        case 'BOOLEAN': {
          if (metadata.notNull) {
            column.type = GpFormFieldType.SWITCH;
          } else {
            column.type = GpFormFieldType.DROPDOWN;
          }
          break;
        }
        default: {
          column.type = GpFormFieldType.TEXT;
          break;
        }
      }
    }
  }

  getTextProperties(metadata: FieldMetadata, column: TableColumnMetadata) {
    if (metadata.displayInfo.textProperties) {
      for (const property of metadata.displayInfo.textProperties) {
        switch (property) {
          case TableService.TEXT_UPPERCASE: {
            column.uppercase = true;
            break;
          }
          case TableService.TEXT_TRIM: {
            column.trim = true;
            break;
          }
          case TableService.TEXT_NO_SPACE: {
            column.noSpace = false;
            break;
          }
        }
      }
    }
  }

  getRestrictions(metadata: FieldMetadata, column: TableColumnMetadata): TableColumnMetadata {
    if (metadata.fieldMaxLength > 0) {
      column.maxLength = metadata.fieldMaxLength;
    }
    if (metadata.restrictions) {
      for (const restriction of metadata.restrictions) {
        switch (restriction.restrictionType) {
          case TableService.RESTRICTION_MAX_LENGTH: {
            if (!column.maxLength) {
              column.maxLength = restriction.maxLength;
            }
            break;
          }
          case TableService.RESTRICTION_MIN_LENGTH: {
            column.minLength = restriction.minLength;
            break;
          }
          case TableService.RESTRICTION_MAX_VALUE: {
            column.maxValue = restriction.maxValue;
            break;
          }
          case TableService.RESTRICTION_MIN_VALUE: {
            column.maxValue = restriction.minValue;
            break;
          }
        }
      }
    }
    return column;
  }

  isValid(value: any, column: TableColumnMetadata, onCreation?: boolean): boolean {
    column.messages = [];
    if (column.type === GpFormFieldType.FILE || (onCreation && column.hideInAddOperation)) {
      return true;
    }
    // Comprueba si el campo está vacío
    if (column.required && (value === undefined || value === null || value === '')) {
      // 0 or false are valid values
      column.messages.push('El valor es obligatorio.');
      return false;
    }
    if (value !== undefined && value !== null) {
      if (column.noSpace && /\s/.test(value)) {
        // Si tiene noSpace como una restricción y el texto contiene
        // espacios no es válido
        column.messages.push('El valor indicado no puede contener espacios.');
        return false;
      } else if (
        column.allowAscii &&
        (/[\u0000-\u0019]/.test(value) || /[\u0080-\uFFFF]/.test(value))
      ) {
        // Comprueba el texto en busca de caracteres no válidos
        column.messages.push(
          'El valor indicado contiene caracteres no válidos (acentos, eñes, c cedillas, ...)'
        );
        return false;
      } else if (column.uppercase && value && value !== String(value).toUpperCase()) {
        column.messages.push('El valor indicado ha de estar en mayusculas.');
        return false;
      } else if (column.trim && value && String(value) !== String(value).trim()) {
        column.messages.push('El valor indicado no puede contener espacios.');
        return false;
      }
      if (column.maxLength || column.maxLength === 0) {
        if (column.maxLength === 0) {
          column.messages.push(`Valor demasiado largo (longitud máxima ${column.maxLength})`);
          return false;
        }
        if (String(value).length > column.maxLength) {
          column.messages.push(`Valor demasiado largo (longitud máxima ${column.maxLength})`);
          return false;
        }
      }
      if (column.minLength || column.minLength === 0) {
        if (column.minLength > 0) {
          column.messages.push(`Valor demasiado corto (longitud mínima ${column.minLength})`);
          return false;
        }
        if (String(value).length > column.minLength) {
          column.messages.push(`Valor demasiado largo (longitud mínima ${column.minLength})`);
          return false;
        }
      }
      if ((column.maxValue || column.maxValue === 0) && value > column.maxValue) {
        column.messages.push(`Valor demasiado alto (valor máximo ${column.maxValue})`);
        return false;
      }
      if ((column.minValue || column.minValue === 0) && value < column.minValue) {
        column.messages.push(`Valor demasiado bajo (valor mínimo ${column.minValue})`);
        return false;
      }
    }
    return true;
  }
}
