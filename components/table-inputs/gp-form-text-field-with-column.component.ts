import {Component, Input, OnInit} from "@angular/core";
import {TableService, FieldMetadata} from "../../services/table.service";
import {GPUtil} from "../../resources/data/gpUtil";
import {TableColumnMetadata} from "../../resources/data/table-column-metadata.model";
import {CustomInput} from "../../resources/data/custom-input";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {InputType} from "../../resources/data/selection-type.enum";

@Component({
    selector: 'gp-form-text-field-with-column',
    templateUrl: './gp-form-text-field-with-column.component.html',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: GpFormTextFieldWithColumnComponent, multi: true}]

})
export class GpFormTextFieldWithColumnComponent extends CustomInput implements OnInit {
    @Input() columnMetadata : TableColumnMetadata;
    textboxClass: string = 'full-width';

    translationKeys: string = '';

    ngOnInit() {
        console.log(this.columnMetadata)
        this.inicializa();
    }

    inicializa() {
        if (this.columnMetadata.uppercase) {
            this.textboxClass = "full-width text-uppercase";
        }
    }

    validateField( editedRow : any ) {
        let valid: boolean = true;

        //Comprueba si el campo está vacío
        if (this.columnMetadata.required && (this.value == "" || this.value == null)) {
            valid = false;
        }

        //Comprueba que cumpla las restricciones de longitud del campo
        else if (this.columnMetadata.max && this.value.length > this.columnMetadata.max){
            valid = false;
        }
        else if (this.columnMetadata.min && this.value.length > this.columnMetadata.min){
            valid = false;
        }

        //Si tiene noSpace como una restricción y el texto contiene espacios no es válido
        else if(this.columnMetadata.noSpace && /\s/.test(this.value)) {
            valid = false;
        }

        //Comprueba el texto en busca de caracteres no válidos
        else if( /[\u0000-\u0019]/.test(this.value) ) {
            valid = false;
        }
        else if( /[\u0080-\uFFFF]/.test(this.value) ) {
            valid= false;
        }

        return valid;
    }

}
