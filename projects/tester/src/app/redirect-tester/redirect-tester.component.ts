import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-redirect-tester',
    templateUrl: './redirect-tester.component.html',
    styleUrls: ['./redirect-tester.component.scss'],
})
export class RedirectTesterComponent implements OnInit {
    constructor(private readonly _router: Router) {}

    ngOnInit() {}

    navigate() {
        this._router.navigate([], { queryParams: { new: true, url: 'http://localhost' } });
    }
}
