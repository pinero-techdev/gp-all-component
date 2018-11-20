import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {TableConfig} from "../../resources/data/table-config.model";
import {Paginator} from "primeng/primeng";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {SortDirection} from "../../resources/data/sort-direction.enum";
import {SelectionType} from "../../resources/data/selection-type.enum";
import {SaveEvent} from "../../resources/data/save-event.model";

/*
*  Data order: data -> filteredData -> sortedData -> currentPageData
*
* */
@Component({
    selector: 'gp-app-editable-table',
    templateUrl: './editable-table.component.html',
    styleUrls: ['./editable-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GpAppEditableTableComponent implements OnInit {
    private _selectedData: any[] = [];
    private _columns: TableColumnMetadata[] = [];
    SelectionType = SelectionType;
    SortDirection = SortDirection;
    editionOriginal: any;
    onEdition: boolean = false;
    onCreation: boolean = false;
    @ViewChild('pg') paginator: Paginator;
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
    @Input()
    get columns(): TableColumnMetadata[] {
        return this._columns;
    }
    set columns(value: TableColumnMetadata[]) {
        this._columns = value.sort( (item1, item2) => {
            return item1.order - item2.order;
        }) || [];
    };
    @Input() config: TableConfig = new TableConfig();
    @Input() data: any[];
    @Input()
    get selectedData(): any[] {
        return this._selectedData;
    }
    set selectedData(value: any[]) {
        this._selectedData = value || [];
        this.selectedDataChange.emit(this._selectedData);
    };
    @Output() selectedDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    @Output() beforeSave: EventEmitter<SaveEvent> = new EventEmitter<SaveEvent>();
    // @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    // @Output() onCancelEdit: EventEmitter<any> = new EventEmitter<any>();
    // @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

    get filteredData() {
        if(this.config.filterable) {
            return this.data.filter((data) => {
                let valid = true;
                for(let column of this.columns){
                    // TODO add column types
                    if(column.filter && data[column.name] && data[column.name].toUpperCase().indexOf(column.filter.toUpperCase()) == -1) {
                        valid = false;
                        break;
                    }
                }
                return valid ;
            });
        } else {
            return this.data;
        }
    }

    get sortedData() {
        if(!this.config.sortable || !this.config.sortField) {
            return this.filteredData;
        }
        return this.filteredData.sort( (a, b) => {
            let valueA = a[this.config.sortField].toUpperCase();
            let valueB = b[this.config.sortField].toUpperCase();
            if((valueA < valueB && this.config.sortDirection == SortDirection.ASC) ||
                (valueA > valueB && this.config.sortDirection == SortDirection.DESC)
            ) {
                return -1;
            }
            if((valueA > valueB && this.config.sortDirection == SortDirection.ASC) ||
                (valueA < valueB && this.config.sortDirection == SortDirection.DESC)
            ) {
                return 1;
            }

            return 0;
        })
    }

    get currentPageData() {
        return this.sortedData.slice(this.config.currentPage * this.config.itemsPerPage, this.config.currentPage * this.config.itemsPerPage + this.config.itemsPerPage);
    }

    get footerColspan() {
        let columnNumber = this.columns.length;
        if(this.config && this.config.actionsColumn) {
            columnNumber += 1;
        }
        if(this.config && this.config.selectable == SelectionType.MULTIPLE) {
            columnNumber += 1;
        }
        return columnNumber;
    }

    constructor() { }

    ngOnInit() {
    }

    hasActionsColumn() {

    }

    changeSort(column: TableColumnMetadata) {
        if (!this.config.sortable || !column.sortable) {
            return;
        }
        if(this.config.sortField !== column.name) {
            this.config.sortField = column.name;
            this.config.sortDirection = SortDirection.ASC;
        } else {
            this.config.sortDirection = (this.config.sortDirection === SortDirection.ASC) ? SortDirection.DESC: SortDirection.ASC;
        }
    }

    changeFilter(column: TableColumnMetadata, filterValue) {
        this.paginator.changePage(0);
        column.filter = filterValue;
    }

    changePage(first: number, rows: number, page: number, pageCount: number) {
        this.config.currentPage = page;
        this.config.itemsPerPage = rows;
    }

    clearFilters() {
        for (let column of this.columns) {
            column.filter = null;
        }
    }

    isSelectable(item: any): boolean {
        if(this.config.selectable == SelectionType.NONE) {return false;}
        return !(this.config.selectableFn && !this.config.selectableFn(item, null, this.selectedData));

    }

    toggleItemSelection(item: any, event?) {
        if(event) {event.stopPropagation();}
        if( (!event.target.tagName.startsWith('TR')) && (!event.target.tagName.startsWith('TD')) ) return;
        if(!this.isSelectable(item)) {return;}
        if(this.config.selectable == SelectionType.SINGLE) {
            if(this.itemIsSelected(item)){
                this.selectedData = [];
            } else {
                this.selectedData = [item];
            }
        }
        if(this.config.selectable == SelectionType.MULTIPLE) {
            if(this.itemIsSelected(item)){
                this.selectedData.splice(this.itemIndex(item), 1);
                this.selectedDataChange.emit(this.selectedData);
            } else {
                this.selectedData.push(item);
                this.selectedDataChange.emit(this.selectedData);
            }
        }
    }

    itemIsSelected(item: any): boolean {
        return (this.itemIndex(item) != -1);
    }

    itemIndex(item: any): number {
        return this.selectedData.findIndex( (data) => {
            if(this.config.compareFn){
                return this.config.compareFn(data, item);
            } else {
                return item == data;
            }
        })
    }

    allSelected(): boolean {
        let selectableData = this.filteredData.filter(this.config.selectableFn);
        if(selectableData.length != this.selectedData.length) {
            return false;
        }
        this.selectedData.forEach((item, index) => {
            if(this.config.compareFn && !this.config.compareFn(item, selectableData[index])) { return false; }
            if(item != selectableData[index]) { return false; }
        });
        return true;
    }

    // Select all filtered data
    toggleSelectAll() {
        if(this.config.selectable == SelectionType.NONE || this.config.selectable == SelectionType.SINGLE) {return;}
        if(!this.allSelected()){
            this.selectedData = [];
            for (let item of this.filteredData) {
                if(this.config.selectableFn && !this.config.selectableFn(item, null, this.selectedData)) {continue;}
                this.selectedData.push(item);
                this.selectedDataChange.emit(this.selectedData);
            }
        } else {
            this.selectedData = [];
        }
    }

    exportToCsv() {
        let csvSeparator = ";";
        let data = this.filteredData;
        let csv = '\ufeff';
        //headers
        for (let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            csv += '"' + (column.label || column.name) + '"';
            if (i < (this.columns.length - 1)) {
                csv += csvSeparator;
            }
        }
        //body
        data.forEach( (row) => {
            csv += '\n';
            for (let i_1 = 0; i_1 < this.columns.length; i_1++) {
                let column = this.columns[i_1];
                // TODO TypeService || TypePipe
                // var cellData = this.objectUtils.resolveFieldData(row, column.name);
                let cellData = row[column.name];
                if (cellData != null)
                    cellData = String(cellData).replace(/"/g, '""');
                else
                    cellData = '';
                csv += '"' + cellData + '"';
                if (i_1 < (this.columns.length - 1)) {
                    csv += csvSeparator;
                }
            }
        });
        // Export file
        let blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.config.exportFilename + '.csv');
        }
        else {
            let link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.config.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }

    createItem() {
        // TODO hacer
    }
    
    deleteItem(item: any) {
        // TODO hacer
    }

    isEditable(): boolean {
        if(!this.config.editable) { return false; }
        return true;
    }

    editItem(item: any) {
        if(this.onCreation || this.onEdition) { return; }
        if(!this.config.editable) { this.edit.emit(item); }
        this.onEdition = true;
        this.editionOriginal = Object.assign({}, item);
        item._editting = true;
    }
    
    saveItem(item: any) {
        this.beforeSave.emit({
            original: this.editionOriginal,
            modified: item,
            save: () => {
                delete item._editting;
                this.onEdition = false;
            },
            cancel: () => {
                this.cancelItem(item);
            }
        });
    }
    
    cancelItem(item: any) {
        Object.assign(item, this.editionOriginal );
        delete item._editting;
        this.onEdition = false;

    }

    itemValid(item: any): boolean {
        if(this.config.validateFn) {
            return this.config.validateFn(item, this.columns);
        }
        for(let column of this.columns) {
            if(column.validateFn) {
                if(!column.validateFn(item[column.name], item, column)) {
                    return false;
                }
            }
        }
        return true;
    }

    isEditableColumn(value: any, item: any, column: TableColumnMetadata): boolean {
        return true;
    }
}
