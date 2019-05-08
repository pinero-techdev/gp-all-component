import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'gp-redirect',
    template: 'Redirecting...',
})
export class RedirectComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

    ngOnInit() {
        this.route.queryParams.pipe(take(1)).subscribe((params) => {
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
                : this.router.navigate(['/']).then(() => (window.location.href = 'http://' + url));
        });
    }
}
