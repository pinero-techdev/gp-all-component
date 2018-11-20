import {Injectable} from "@angular/core";
import {TableColumnMetadata} from "../resources/data/table-column-metadata.model";
import {FieldMetadata} from "./table.service";

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
        if(metadata.displayInfo) {
            column.label = metadata.displayInfo.fieldLabel;
        }
        return column;
    }
}