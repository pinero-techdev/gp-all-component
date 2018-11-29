import {Injectable} from "@angular/core";
import {TableColumnMetadata} from "../resources/data/table-column-metadata.model";
import {FieldMetadata, TableService} from "./table.service";
import {InputType} from "../resources/data/selection-type.enum";

@Injectable()
export class TableMetadataService{
    getTableColumnsFromMetadata(metadata: FieldMetadata[]): TableColumnMetadata[] {
        let columns: TableColumnMetadata[] = [];
        for (let field of metadata) {
            columns.push(this.getTableColumnFromFieldMetadata(field));
        }
        return columns;
    }

    getTableColumnFromFieldMetadata(metadata: FieldMetadata): TableColumnMetadata {
        let column = new TableColumnMetadata();
        column.name = metadata.fieldName;
        this.getRequired(metadata,column);
        column.editable = !metadata.readOnly;
        this.getType(metadata, column);
        if(metadata.displayInfo) {
            column.label = metadata.displayInfo.fieldLabel;
            column.order = metadata.displayInfo.order;
            column.translationInfo = metadata.displayInfo.translationInfo;
            column.rows = metadata.displayInfo.rowsTextArea > 0 ? metadata.displayInfo.rowsTextArea : 3;
            column.referencedTable = metadata.displayInfo.referencedTable;
            column.fieldToOrderBy = [metadata.displayInfo.fieldToOrderBy];
            column.optionsValue = metadata.displayInfo.referencedField;
            // column.optionsLabels = metadata.displayInfo;

        }
        this.getTextProperties(metadata, column);
        this.getRestrictions(metadata, column);
        return column;
    }

    getRequired(metadata: FieldMetadata, column: TableColumnMetadata) {
        if (metadata.id || metadata.notNull) {
            column.required = true;
        } else {
            for (let restriction of metadata.restrictions) {
                if (restriction.restrictionType == TableService.RESTRICTION_NOT_NULL){
                    column.required = true;
                    break;
                }
            }
        }
    }

    getType(metadata: FieldMetadata, column: TableColumnMetadata) {
        if (metadata.displayInfo.displayType) {
            switch (metadata.displayInfo.displayType) {
                case TableService.IMG_DISPLAY_TYPE:{
                    column.type = InputType.IMG_FIELD;
                    break;
                }
                case TableService.CHECKBOX_DISPLAY_TYPE:{
                    column.type = InputType.CHECKBOX_FIELD;
                    break;
                }
                case TableService.TEXT_DISPLAY_TYPE:{
                    column.type = InputType.TEXT_FIELD;
                    break;
                }
                case TableService.TEXT_AREA_DISPLAY_TYPE: {
                    column.type = InputType.TEXTAREA_FIELD;
                    break;
                }
                case TableService.DROPDOWN_DISPLAY_TYPE:{
                    column.type = InputType.DROPDOWN_FIELD;
                    break;
                }
                case TableService.DROPDOWN_RELATED_DISPLAY_TYPE: {
                    column.type = InputType.DROPDOWN_RELATED_FIELD;
                    break;
                }
                case TableService.SWITCH_DISPLAY_TYPE:{
                    column.type = InputType.SWITCH_FIELD;
                    break;
                }
                case TableService.CALENDAR_DISPLAY_TYPE:{
                    column.type = InputType.CALENDAR_FIELD
                    break;
                }
                case TableService.HOUR_MINUTE_DISPLAY_TYPE:{
                    column.type = InputType.TIME_FIELD;
                    break;
                }
                case TableService.WYSIWYG_DISPLAY_TYPE: {
                    column.type = InputType.WYSIWYG_FIELD;
                    break;
                }

            }
        } else {
            switch (metadata.fieldType) {
                case 'DATE':{
                    column.type = InputType.CALENDAR_FIELD;
                    break;
                }
                case 'BOOLEAN':{
                    if (metadata.notNull) {
                        column.type = InputType.SWITCH_FIELD;
                    } else {
                        column.type = InputType.DROPDOWN_FIELD;
                    }
                    break;
                }
                default:{
                    column.type = InputType.TEXT_FIELD;
                    break;
                }
            }
        }
    }

    getTextProperties(metadata: FieldMetadata, column: TableColumnMetadata) {
        if (metadata.displayInfo.textProperties) {
            for (let property of metadata.displayInfo.textProperties) {
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
            column.max = metadata.fieldMaxLength;
        }
        for (let restriction of metadata.restrictions) {
            switch (restriction.restrictionType) {
                case TableService.RESTRICTION_MAX_LENGTH:{
                    if (!column.max) {
                        column.max = restriction.maxLength;
                    }
                    break;
                }
                case TableService.RESTRICTION_MIN_LENGTH:{
                    column.min = restriction.minLength;
                    break;
                }
                case TableService.RESTRICTION_MAX_VALUE:{
                    column.maxValue = restriction['maxValue'];
                    break;
                }
                case TableService.RESTRICTION_MIN_VALUE:{
                    column.maxValue = restriction['minValue'];
                    break;
                }
            }
        }
        return column;
    }

    validateField(row: any, column: TableColumnMetadata) {
        let valid: boolean = true;

        //Comprueba si el campo está vacío
        if (column.required && (row[column.name] == "" || row[column.name] == null)) {
            valid = false;
        }

        //Si tiene noSpace como una restricción y el texto contiene espacios no es válido
        else if(column.noSpace && /\s/.test(row[column.name])) {
            valid = false;
        }

        //Comprueba el texto en busca de caracteres no válidos
        else if( /[\u0000-\u0019]/.test(row[column.name])) {
            valid = false;
        }
        else if( /[\u0080-\uFFFF]/.test(row[column.name])) {
            valid = false;
        }

        else if (row[column.name].length > column.max) {
            valid = false;
        }
        else if (row[column.name].length < column.min) {
            valid = false;
        }
        else if (row[column.name] > column.maxValue) {
            valid = false;
        }
        else if (row[column.name] < column.minValie) {
            valid = false;
        }
        else if (column.uppercase && row[column.name] !== row[column.name].toUpperCase()) {
            valid = false;
        }
        else if (column.trim && row[column.name] !== row[column.name].trim()) {
            valid = false;
        }

        return valid;
    }

}