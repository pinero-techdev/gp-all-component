import {NgModule} from "@angular/core";
import {PermissionSettingsDirective} from "./directives/permission-settings.directive";
import {PermissionSettingsService} from "./services/permission-settings.service";

@NgModule({
    declarations: [ PermissionSettingsDirective ],
    providers: [ PermissionSettingsService ],
    exports: [ PermissionSettingsDirective ]
})
export class PermissionSettingsModule { }
