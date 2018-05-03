import {Component, HostListener, OnInit} from "@angular/core";

@Component({
    selector: 'gp-app-base',
    templateUrl: './gp.app.base.component.html'
})
export class GpAppBaseComponent implements OnInit {
    width:number;
    height:number;
    working:boolean = false;
    jobs:number = 0;

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

    pushQueue(jobs:number) {
        this.jobs = this.jobs + jobs;
        this.working = true;
    }

    popQueue() {
        if (this.working = true && this.jobs > 0) {
            this.jobs = this.jobs - 1;
            this.working = this.jobs != 0;
        }
    }
}