import { Component, OnInit, ViewChild } from '@angular/core';
import { TableCrudComponent } from 'gp-all-component';

@Component({
  selector: 'app-table-crud-tester',
  templateUrl: './table-crud-tester.component.html',
  styleUrls: ['./table-crud-tester.component.scss'],
})
export class TableCrudTesterComponent implements OnInit {
  @ViewChild(TableCrudComponent) tableRef: TableCrudComponent;
  ngOnInit() {
    this.tableRef.changeTable('BpgTeco');
  }
}
