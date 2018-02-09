import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {GpAppReportDialogComponent} from "./gp-app-report-dialog.component";
import {ReportService} from "../../services/report.service";

@Component({
    templateUrl: './gp-app-report-frame.component.html'
})
export class GpAppReportFrameComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    reportName: string;
    @ViewChild(GpAppReportDialogComponent) viewChild: GpAppReportDialogComponent;

    constructor(private _route: ActivatedRoute, private _router: Router,
                private _reportService: ReportService) {
    }

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.reportName = params['listado'];
            this.viewChild.cambiaReport(this.reportName);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
