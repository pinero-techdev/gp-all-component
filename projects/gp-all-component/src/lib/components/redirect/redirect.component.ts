import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'gp-redirect',
    template: 'Redirecting...',
})
export class RedirectComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    constructor(private readonly _route: ActivatedRoute, private readonly _router: Router) {}

    ngOnInit() {
        this.sub = this._route.queryParams.subscribe((params) => {
            const url = params.url;
            const newUrl = params.new;

            const existingParams = !isNullOrUndefined(url) && !isNullOrUndefined(newUrl);

            if (!existingParams) {
                return;
            }

            const isNewUrl = (isNew: string): boolean => {
                return !isNullOrUndefined(isNew) && isNew === 'true';
            };

            isNewUrl(newUrl)
                ? window.open('http://' + url)
                : this._router.navigate(['/']).then(() => (window.location.href = 'http://' + url));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
