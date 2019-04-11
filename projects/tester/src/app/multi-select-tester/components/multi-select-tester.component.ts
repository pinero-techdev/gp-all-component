import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MultiSelect } from 'primeng/primeng';
import { noop } from 'rxjs';

@Component({
    selector: 'gp-multi-select-tester',
    templateUrl: './multi-select-tester.component.html',
    styleUrls: ['./multi-select-tester.component.scss'],
})
export class MultiSelectTesterComponent implements ControlValueAccessor {
    /**
     * Text shown together the number of selected elements
     */
    @Input()
    selectionLabel = 'Opciones seleccionadas';

    /**
     * Multiselect options
     */
    @Input()
    options: SelectItem[] = null;

    @Input()
    disabled = false;

    @Input()
    defaultLabel = 'Elige una opción';

    @Input()
    appendTo: any;

    @Input()
    style = null;

    @Input()
    styleClass = null;

    @Input()
    filter = true;

    @Input()
    scrollHeight = '200px';

    @Input()
    overlayVisible = false;

    @Input()
    tabindex: number = null;

    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    @ViewChild(MultiSelect) multi: MultiSelect;

    // Inner model data mandatory for ngModel
    private innerValue = '';

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    /**
     * Get accessor for valor property
     */
    get valor(): string {
        return this.innerValue;
    }

    /**
     * Set accessor and call the onchange callback
     * @param v The new input value
     */
    set valor(v: string) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
            this.changed.emit(v);
        }
    }

    /**
     * Set touched on blur
     */
    onBlur(): void {
        this.onTouchedCallback();
    }

    /**
     * From ControlValueAccessor interface
     * @param value The new value to set
     */
    writeValue(value: string): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    /**
     * Sets the new values on selection changed
     */
    onChangeMultiselect(): void {
        let label: string;
        const self = this;
        const selectionLabel = this.selectionLabel;
        if (!(this.multi === null || this.multi === undefined)) {
            this.multi.updateLabel = function() {
                if (this.value != null && this.value.length > 0) {
                    label = this.value.length.toString() + ' ' + selectionLabel;
                    this.valuesAsString = label;
                } else {
                    label = self.defaultLabel;
                    this.valuesAsString = label;
                }
            };
        }
    }

    /**
     * From ControlValueAccessor interface
     * @param fn Passed in Function
     */
    registerOnChange(fn: () => void): void {
        this.onChangeMultiselect();
        this.onChangeCallback = fn;
    }

    /**
     * From ControlValueAccessor interface
     * @param fn Passed in Function
     */
    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
