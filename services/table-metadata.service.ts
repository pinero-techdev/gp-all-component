import {Injectable} from "@angular/core";
import {TableColumn} from "../resources/data/table-column.model";
import {FieldMetadata} from "./table.service";

@Injectable()
export class TableMetadataService{
    getTableColumnsFromMetadata(metadata: FieldMetadata[]): TableColumn[] {
        let columns: TableColumn[] = [];
        for (let field of metadata) {
            columns.push(this.getTableColumnFromFieldMetadata(field));
        }
        return columns;
    }

    getTableColumnFromFieldMetadata(metadata: FieldMetadata): TableColumn {
        let column = new TableColumn();
        column.name = metadata.fieldName;
        if(metadata.displayInfo) {
            column.label = metadata.fieldName;
        }
        return column;
    }
}