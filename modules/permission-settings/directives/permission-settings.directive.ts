import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {PermissionSettingsService} from "../services/permission-settings.service";

@Directive({
    selector: '[gp-settings-form]'
})

export class PermissionSettingsDirective implements OnInit {
    @Input('gp-settings-form') form: string;
    @Input('gp-st-action') action: string;
    constructor(private renderer: Renderer2, private el: ElementRef, private _settingsService: PermissionSettingsService) {
    }

    ngOnInit(): void {
        if(!this._settingsService.isVisible(this.form, this.action)) {
            this.renderer.setStyle(this.el.nativeElement, 'display', "none");
        }
        if(!this._settingsService.isEnabled(this.form, this.action)) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', "disabled");
        }
    }
}
