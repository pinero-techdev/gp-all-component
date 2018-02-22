import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {GpAppTableCrudComponent} from "./gp-app-table-crud.component";

@Component({
    templateUrl: './gp-app-table-frame.component.html'
})
export class GpAppTableFrameComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    tableName: string;
    @ViewChild(GpAppTableCrudComponent) viewChild: GpAppTableCrudComponent;

    constructor(private _route: ActivatedRoute,
                private _router: Router) {
    }

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.tableName = params['tabla'];
            this.viewChild.closeDialog();
            this.viewChild.cambiaTabla(this.tableName);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
