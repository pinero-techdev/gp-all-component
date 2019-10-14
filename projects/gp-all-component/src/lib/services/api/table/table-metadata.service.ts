import { GpFormFieldType } from './../../../components/form-wrapper/resources/form-field-type.enum';
import { TableColumnMetadata } from '../../../components/table-wrapper/components/table-editable-crud/resources/table-column-metadata.model';
import { Injectable } from '@angular/core';
import {
  Field,
  DisplayType,
  FieldType,
  RestrictionType,
  TextPropertyType,
} from '../../../resources/data/data-table/meta-data/meta-data-field.model';

@Injectable()
export class TableMetadataService {
  getTableColumnsFromMetadata(metadata: Field[]): TableColumnMetadata[] {
    const columns: TableColumnMetadata[] = [];
    for (const field of metadata) {
      columns.push(this.getTableColumnFromFieldMetadata(field));
    }
    return columns;
  }

  getTableColumnFromFieldMetadata(metadata: Field): TableColumnMetadata {
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
      column.fieldToOrderBy = metadata.displayInfo.fieldToOrderBy;
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

  getRequired(metadata: Field, column: TableColumnMetadata) {
    if (metadata.id || metadata.notNull) {
      column.required = true;
    } else if (metadata.restrictions) {
      for (const restriction of metadata.restrictions) {
        if (restriction.restrictionType === RestrictionType.NOT_NULL) {
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

  getType(metadata: Field, column: TableColumnMetadata) {
    if (metadata.displayInfo.displayType) {
      switch (metadata.displayInfo.displayType) {
        case DisplayType.IMG: {
          column.type = GpFormFieldType.IMG;
          break;
        }
        case DisplayType.CHECKBOX: {
          column.type = GpFormFieldType.CHECKBOX;
          break;
        }
        case DisplayType.TEXT: {
          column.type = GpFormFieldType.TEXT;
          break;
        }
        case DisplayType.TEXT_AREA: {
          column.type = GpFormFieldType.TEXT_AREA;
          break;
        }
        case DisplayType.DROPDOWN: {
          column.type = GpFormFieldType.DROPDOWN;
          break;
        }
        case DisplayType.DROPDOWN_RELATED: {
          column.type = GpFormFieldType.DROPDOWN_RELATED;
          break;
        }
        case DisplayType.SWITCH: {
          column.type = GpFormFieldType.SWITCH;
          break;
        }
        case DisplayType.CALENDAR: {
          column.type = GpFormFieldType.CALENDAR;
          break;
        }
        case DisplayType.HOUR_MINUTE: {
          column.type = GpFormFieldType.TIME;
          break;
        }
        case DisplayType.WYSIWYG: {
          column.type = GpFormFieldType.WYSIWYG;
          break;
        }
        case DisplayType.FILE: {
          column.type = GpFormFieldType.FILE;
          break;
        }
        case DisplayType.NULLABLE_CHECKBOX: {
          column.type = GpFormFieldType.NULLABLE_CHECKBOX;
          break;
        }
        case DisplayType.NUMBER: {
          column.type = GpFormFieldType.NUMBER;
          break;
        }
      }
    } else {
      switch (metadata.fieldType) {
        case FieldType.DATE: {
          column.type = GpFormFieldType.CALENDAR;
          break;
        }
        case FieldType.BOOLEAN: {
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

  getTextProperties(metadata: Field, column: TableColumnMetadata) {
    if (metadata.displayInfo.textProperties) {
      for (const property of metadata.displayInfo.textProperties) {
        switch (property) {
          case TextPropertyType.UPPERCASE: {
            column.uppercase = true;
            break;
          }
          case TextPropertyType.TRIM: {
            column.trim = true;
            break;
          }
          case TextPropertyType.NO_SPACE: {
            column.noSpace = false;
            break;
          }
        }
      }
    }
  }

  getRestrictions(
    metadata: Field,
    column: TableColumnMetadata
  ): TableColumnMetadata {
    if (metadata.fieldMaxLength > 0) {
      column.maxLength = metadata.fieldMaxLength;
    }
    if (metadata.restrictions) {
      for (const restriction of metadata.restrictions) {
        switch (restriction.restrictionType) {
          case RestrictionType.MAX_LENGTH: {
            if (!column.maxLength) {
              column.maxLength = restriction.maxLength;
            }
            break;
          }
          case RestrictionType.MIN_LENGTH: {
            column.minLength = restriction.minLength;
            break;
          }
          case RestrictionType.MAX_VALUE: {
            column.maxValue = restriction.maxValue;
            break;
          }
          case RestrictionType.MIN_VALUE: {
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
