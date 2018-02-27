import {Component, HostListener, OnInit} from "@angular/core";

@Component({
    selector: 'gp-app-base',
    templateUrl: './gp.app.base.component.html'
})
export class GpAppBaseComponent implements OnInit {
    width:number;
    height:number;

    constructor() {
    }

    ngOnInit() {
        this.height = window.innerHeight * 0.95;
        this.width = window.innerWidth * 0.95;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.height = event.target.innerHeight * 0.95;
        this.width = event.target.innerWidth * 0.95;
    }
}