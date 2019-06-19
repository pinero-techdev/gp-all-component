import { finalize } from 'rxjs/operators';
import { TableService, FieldMetadata } from './../../../../../../services/api/table/table.service';
import { GpFormFieldType } from './../../../../../form-wrapper/resources/form-field-type.enum';
import { AttachmentOperationEnum } from './../../resources/attachment-operation.enum';
import { TableMetadataService } from './../../../../../../services/api/table/table-metadata.service';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { Message, MessageService } from 'primeng/api';
import { TableConfig } from '../../resources/table-config.model';
import { TableColumnMetadata } from '../../resources/table-column-metadata.model';
import {
  TableFieldEvent,
  DataChangeEvent,
  TableRowEvent,
  ItemChangeEvent,
} from '../../resources/table-events.interface';
import { Attachment } from '../../resources/attachment.class';

@Component({
  selector: 'gp-table-editable-crud',
  templateUrl: './table-editable-crud.component.html',
})
export class TableEditableCrudComponent {
  // tslint:disable-next-line: variable-name
  private _tableName: string;
  // tslint:disable-next-line: variable-name
  private _selectedData: any[] = [];
  loading = true;
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
  }
  @Input()
  get selectedData(): any[] {
    return this._selectedData;
  }
  set selectedData(value: any[]) {
    this._selectedData = value || [];
    this.selectedDataChange.emit(this._selectedData);
  }
  @Output() selectedDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() deletedItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() createdItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() setTableConfig: EventEmitter<DataChangeEvent<TableConfig>> = new EventEmitter<
    DataChangeEvent<TableConfig>
  >();
  @Output() setTableColumns: EventEmitter<
    DataChangeEvent<TableColumnMetadata[]>
  > = new EventEmitter<DataChangeEvent<TableColumnMetadata[]>>();
  @Output() startEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() stopEditingField: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
  @Output() startEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
  @Output() stopEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();
  @Output() cancelEdition: EventEmitter<TableRowEvent> = new EventEmitter<TableRowEvent>();

  constructor(
    private tableService: TableService,
    private messageService: MessageService,
    private tableMetadataService: TableMetadataService
  ) {
    this.msgsGlobal = [];
  }

  loadTable() {
    this.loading = true;
    this.tableService
      .list(this.tableName, true, true)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.data = data.data;
          if (!this.tableConfig.title) {
            this.tableConfig.title = data.metadata.tableLabel;
            this.setTableConfig.emit({
              data: this.tableConfig,
              changeValue: (d) => {
                this.tableConfig = d;
              },
            });
          }
          if (!this.columns) {
            this.columns = this.tableMetadataService.getTableColumnsFromMetadata(
              data.metadata.fields.map(
                (field) =>
                  new FieldMetadata(
                    field.fieldMaxLength,
                    field.fieldName,
                    field.fieldType,
                    field.id,
                    field.notNull,
                    field.readOnly,
                    field.allowAscii,
                    field.lengthInTable,
                    null,
                    field.displayInfo,
                    null
                  )
              )
            );
            this.setTableColumns.emit({
              data: this.columns,
              changeValue: (d) => {
                this.columns = d;
              },
            });
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Error interno cargando el registro.',
          });
        }
      );
  }

  getOne(event: ItemChangeEvent) {
    const jsonRow = JSON.stringify(event.original);
    this.tableService.selectOneRow(this.tableName, jsonRow).subscribe(
      (data) => {
        if (data.ok) {
          event.success(data.data);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Error obteniendo el registro: ' + data.error.errorMessage,
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Error interno obteniendo el registro.',
        });
      }
    );
  }

  getAttachments(item: any): Attachment[] {
    const attachments: Attachment[] = [];
    for (const column of this.columns) {
      if (
        column.type === GpFormFieldType.FILE &&
        (item[column.name].operation === AttachmentOperationEnum.MODIFY ||
          item[column.name].operation === AttachmentOperationEnum.DELETE)
      ) {
        attachments.push(item[column.name]);
        delete item[column.name];
      }
    }
    return attachments;
  }

  saveItem(event: ItemChangeEvent) {
    const attachments: Attachment[] = this.getAttachments(event.modified);
    const jsonOriginalRow = JSON.stringify(event.original);
    const jsonModifiedRow = JSON.stringify(event.modified);
    this.tableService
      .updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow, attachments)
      .subscribe(
        (data) => {
          if (data.ok) {
            event.success(event.modified);
            this.messageService.add({
              severity: 'success',
              summary: 'Success Message',
              detail: 'Order submitted',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Error actualizando el registro: ' + data.error.errorMessage,
            });
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Error interno actualizando el registro.',
          });
        }
      );
  }

  createItem(event: ItemChangeEvent) {
    const attachments: Attachment[] = this.getAttachments(event.modified);
    const jsonModifiedRow = JSON.stringify(event.modified);
    this.tableService.insertRow(this.tableName, jsonModifiedRow, attachments).subscribe(
      (data) => {
        if (data.ok) {
          event.success(event.modified);
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Order submitted',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Error insertando el registro: ' + data.error.errorMessage,
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Error interno insertando el registro.',
        });
      }
    );
  }

  deleteItem(event: ItemChangeEvent) {
    const jsonDeleteRow = JSON.stringify(event.original);
    this.tableService.deleteRow(this.tableName, jsonDeleteRow).subscribe(
      (data) => {
        if (data.ok) {
          event.success(event.modified);
          this.messageService.add({
            severity: 'success',
            summary: 'Borrado',
            detail: 'El registro se ha borrado correctamente',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Error borrando el registro: ' + data.error.errorMessage,
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Error interno borrando el registro.',
        });
      }
    );
  }

  // TODO
  downloadFile(event: TableFieldEvent) {
    // this.tableService
    //   .downloadFile(this.tableName, event.value, event.column.name)
    //   .subscribe((file) => {
    //     saveAs(file.blob, file.fileName);
    //   });
  }

  showErrorDialogo(msg: string) {
    this.msgsGlobal.push({ severity: 'error', summary: 'Error', detail: msg });
  }
}
