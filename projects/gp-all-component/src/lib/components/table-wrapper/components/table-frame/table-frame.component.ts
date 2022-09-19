import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableCrudComponent } from '../table-crud/table-crud.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'gp-table-frame',
  templateUrl: './table-frame.component.html',
  styleUrls: ['./table-frame.component.scss'],
})
export class TableFrameComponent implements OnInit, OnDestroy {
  @ViewChild(TableCrudComponent,{static : false})
  viewChild: TableCrudComponent;

  /**
   * Name for wrapping table
   */
  tableName: string;

  /**
   * Lifecycle check for this component
   */
  private isAlive = true;

  constructor(private readonly route: ActivatedRoute) {}

  /**
   * Angular OnInit lifecycle hook
   */
  ngOnInit(): void {
    this.route.params.pipe(takeWhile(() => this.isAlive)).subscribe((params) => {
      if (!params.tabla) {
        return;
      }

      this.tableName = params.tabla;

      this.viewChild.closeDialog();
      this.viewChild.changeTable(this.tableName);
    });
  }

  /**
   * Angular OnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
