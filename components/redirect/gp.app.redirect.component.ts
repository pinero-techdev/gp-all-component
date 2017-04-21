import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'gp-app-redirect',
    template: 'redirecting...'
})
export class GpAppRedirectComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private url: string;
    private new: boolean;

    constructor(private _route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.url = params['url'];
            this.new = params['new'];
            if (this.new){
                window.open('http://' + this.url );
            } else {
                window.location.href = 'http://' + this.url;
            }

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
