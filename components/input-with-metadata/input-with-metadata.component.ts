import {Component, ViewEncapsulation} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../resources/data/custom-input";

@Component({
    selector: 'gp-app-input-with-metadata',
    templateUrl: './input-with-metadata.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: GpAppInputWithMetadataComponent, multi: true},
    ]
})
export class GpAppInputWithMetadataComponent extends CustomInput {
    
}