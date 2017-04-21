import {ViewEncapsulation, OnInit, Input} from "@angular/core";
import {Component} from "@angular/core/src/metadata/directives";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'gp-app-qlikview-frame',
    templateUrl: './gp.app.qlikview.frame.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GpAppQlikviewFrameComponent implements OnInit {
    safeResourceUrl: SafeResourceUrl = null;

    constructor( private _activatedRoute: ActivatedRoute, private _router: Router,private _globalService: GlobalService, private _domSanitizer: DomSanitizer ) {
    }

    ngOnInit() {
        let doc = "BP_CALIDAD%2FDashboardCRM.qvw";
        this.safeResourceUrl = this._domSanitizer.bypassSecurityTrustResourceUrl("http://qlikview/QvAJAXZfc/opendoc.htm?document="+doc+"&host=QVS%40qlikview&cnxuid="+this._globalService.session.cnxUid);
    }
}