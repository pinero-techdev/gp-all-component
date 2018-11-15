/** @author 3digits */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { GpFormFieldDetail } from 'gp-all-component/components/tables/gp-app-table-crud-shared';
import { TreeTableService } from 'gp-all-component/services/treetable.service';

@Component({
  selector: 'gp-treetable',
  templateUrl: './gp-treetable.component.html'
})
export class GPTreeTableComponent {
  @Input()
  exclusionsTable: string[] = [];

  @Input()
  lockFields: boolean;

  @Input()
  fieldsRq: string[] = [];

  @Input()
  elementosDetail: TreeNode[] = [];

  @Input()
  columnasDetail: GpFormFieldDetail[] = [];

  @Input()
  columnasTablaDetail: any[] = [];

  @Input()
  tableLabelDetail: string[];

  @Input()
  selectedTree: TreeNode;

  // Cantidad registros por pagina del grid
  @Input()
  cantRows: number = 10;

  @Output()
  onRowSelect: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDialogAddDetail: EventEmitter<null> = new EventEmitter<null>();

  constructor(private treeTableService: TreeTableService) {}

  checkExcludeFieldsTable(col: any): boolean {
    let showCol: boolean = true;
    if (this.exclusionsTable.length > 0) {
      this.exclusionsTable.forEach(valor => {
        if (col.fieldMetadata.fieldName == valor) {
          showCol = false;
        }
      });
    }
    return showCol;
  }

  nodeSelect = (event: any) => this.onRowSelect.emit(event);
  dialogAddDetail = () => this.onDialogAddDetail.emit();
  obtenerAtributoId = (): string => this.treeTableService.obtenerAtributoId(this.columnasTablaDetail);
}
