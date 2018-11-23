import {Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation} from "@angular/core";
import {GPUtil} from "../../resources/data/gpUtil";
import {Router} from "@angular/router";
import {TableService} from "../../services/table.service";
import {Message} from "primeng/api";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {TableConfig} from "../../resources/data/table-config.model";
import {TableMetadataService} from "../../services/table-metadata.service";
import {DataChangeEvent, TableFieldEvent, TableRowEvent} from "../../resources/data/table.events";

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
    /*
    * Context params
    * $implicit, index, columns
    * */
    @Input() rowTemplate: TemplateRef<any>;
    /*
    * Context params
    * $implicit, index, columns
    * */
    @Input() formTemplate: TemplateRef<any>;
    /*
    * Context params
    * $implicit, index
    * */
    @Input() actionsTemplate: TemplateRef<any>;
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
    @Output() setTableConfig: EventEmitter<DataChangeEvent<TableConfig>> = new EventEmitter<DataChangeEvent<TableConfig>>();
    @Output() setTableColumns: EventEmitter<DataChangeEvent<TableColumnMetadata[]>> = new EventEmitter<DataChangeEvent<TableColumnMetadata[]>>();
    @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    @Output() startEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
    @Output() stopEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
    @Output() cancelEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();

    constructor(private router: Router, private tableService: TableService, private _gpUtil: GPUtil, private _tableMetadataService: TableMetadataService) {
        this.msgsGlobal = [];
    }

    loadTable() {
        this.loading = true;
        this.tableService.list(this.tableName, true, true)
            .finally(() => this.loading = false).subscribe(
            data => {
                if(!this.tableConfig.title){
                    this.tableConfig.title = data.metadata.tableLabel;
                    this.setTableConfig.emit({data: this.tableConfig, changeValue: (data) => {
                            this.tableConfig = data;
                        }});
                }
                if(!this.columns) {
                    this.columns = this._tableMetadataService.getTableColumnsFromMetadata(data.metadata.fields);
                    this.setTableColumns.emit({data: this.columns, changeValue: (data) => {
                            this.columns = data;
                        }});
                }
                this.data = data.data;
            },
            err => {
                console.error(err);
            },
            () => {
            }
        );
    }

    saveItem(event) {
        console.log('save',event);
        event.success(event.modified);
        // {original: this.editionOriginal, modified: item, success: save}
    }

    deleteItem() {

    }
}