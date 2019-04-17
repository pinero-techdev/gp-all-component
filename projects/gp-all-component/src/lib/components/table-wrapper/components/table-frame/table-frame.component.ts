import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableCrudComponent } from '../table-crud/table-crud.component';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'gp-app-table-frame',
    templateUrl: './table-frame.component.html',
    styleUrls: ['./table-frame.component.scss'],
})
export class TableFrameComponent implements OnInit, OnDestroy {
    @ViewChild(TableCrudComponent)
    viewChild: TableCrudComponent;

    /**
     * Name for the wrapping table
     */
    tableName: string;

    /**
     * Lifecycle check for this component
     */
    private _isAlive = true;

    constructor(private readonly _route: ActivatedRoute) {}

    /**
     * Angular OnInit lifecycle hook
     */
    ngOnInit(): void {
        this._route.params.pipe(takeWhile(() => this._isAlive)).subscribe((params) => {
            const tableName = params.tabla;
            this.viewChild.closeDialog();
            this.viewChild.cambiaTabla(tableName);
        });
    }

    /**
     * Angular OnDestroy lifecycle hook
     */
    ngOnDestroy(): void {
        this._isAlive = false;
    }
}
