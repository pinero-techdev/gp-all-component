import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {GpTableCrudComponent} from './gp-table-crud.component';

@Component({
  templateUrl: './gp-table-frame.component.html'
})
export class GpTableFrameComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  tableName: string;
  @ViewChild(GpTableCrudComponent) viewChild: GpTableCrudComponent;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.tableName = params['tabla'];
      this.viewChild.closeDialog();
      this.viewChild.cambiaTabla(this.tableName);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
