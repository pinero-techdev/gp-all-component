import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {NgControl} from "@angular/forms";

@Directive({
    selector: '[gp-uppercase]'
})

export class GPUppercaseDirective implements OnInit{
    @Input("gp-uppercase") active: boolean | string = true;
    constructor(private el:ElementRef,
                private control:NgControl) {
    }

    ngOnInit() {
        if(this.active === undefined || this.active === "") {
            this.active = true;
        }
    }

    @HostListener('input', ['$event']) onEvent($event) {
        if(this.active){
            this.control.control.setValue(this.el.nativeElement.value.toUpperCase());
        }
    }
}