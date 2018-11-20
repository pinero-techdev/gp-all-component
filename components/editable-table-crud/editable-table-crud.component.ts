import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {GPUtil} from "../../resources/data/gpUtil";
import {Router} from "@angular/router";
import {TableService} from "../../services/table.service";
import {Message} from "primeng/api";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableConfig} from "../../resources/data/table-config.model";
import {TableMetadataService} from "../../services/table-metadata.service";

@Component({
    selector: 'gp-app-editable-table-crud',
    templateUrl: './editable-table-crud.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [GPUtil]
})
export class GpAppEditableTableCrudComponent {
    private _tableName: string;
    private _selectedData: any[] = [];
    loading: boolean = true;
    // Mensaje global.
    msgsGlobal: Message[] = [];
    data: any[] = [];
    tableConfig = new TableConfig();
    columns: TableColumnMetadata[];
    // Nombre de la tabla a editar.
    @Input()
    get tableName(): string {
        return this._tableName;
    }
    set tableName(value: string) {
        this._tableName = value;
        this.loadTable();
    };
    @Input()
    get selectedData(): any[] {
        return this._selectedData;
    }
    set selectedData(value: any[]) {
        this._selectedData = value || [];
        this.selectedDataChange.emit(this._selectedData);
    };
    @Output() selectedDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() setTableColumns: EventEmitter<any> = new EventEmitter<any>();
    constructor(private router: Router, private tableService: TableService, private _gpUtil: GPUtil, private _tableMetadataService: TableMetadataService) {
        this.msgsGlobal = [];
    }

    loadTable() {
        this.loading = true;
        this.tableService.list(this.tableName, true, true)
            .finally(() => this.loading = false).subscribe(
            data => {
                this.tableConfig.title = data.metadata.tableLabel;
                this.columns = this._tableMetadataService.getTableColumnsFromMetadata(data.metadata.fields);
                this.setTableColumns.emit({columns: this.columns, setColumns: (tableColumns) => {
                    this.columns = tableColumns;
                }});
                this.data = data.data;
            },
            err => {
                console.error(err);
            },
            () => {
                console.log('getMetadata finalizado');
            }
        );
    }
}