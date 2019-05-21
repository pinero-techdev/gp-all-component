import { Component, forwardRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MultiSelect, SelectItem } from 'primeng/primeng';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from 'rxjs/util/noop';
import { isNullOrUndefined } from 'util';

export const CUSTOM_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GpAppMultiSelectComponent),
  multi: true
};

@Component({
  selector: 'gp-app-multiselect',
  templateUrl: './gp.app.multi-select.component.html',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR]
})
export class GpAppMultiSelectComponent implements ControlValueAccessor {

  /**
   * Texto que se mostrará junto con el número de elementos seleccionados
   * @type {string}
   */
  @Input()
  selectionLabel = 'Opciones seleccionadas';

  /* PROPIEDADES DE MULTISELECT */
  @Input()
  options: SelectItem[] = null;

  @Input()
  disabled: boolean = false;

  @Input()
  defaultLabel: string = 'Elige una opción';

  @Input()
  appendTo: any;

  @Input()
  style: string = null;

  @Input()
  styleClass: string = null;

  @Input()
  filter: boolean = true;

  @Input()
  scrollHeight: string = '200px';

  @Input()
  overlayVisible: boolean = false;

  @Input()
  tabindex: number = null;

  @Output()
  onChange: EventEmitter<any> = new EventEmitter();

  //modelo de datos interno necesario para el ngModel
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get valor(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set valor(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.onChange.emit(v);
    }
  }

  @ViewChild(MultiSelect) multi: MultiSelect;

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  onChangeMultiselect() {
    let label: string;
    let selectionLabel = this.selectionLabel;
    if (!isNullOrUndefined(this.multi)) {
      this.multi.updateLabel = function() {
        if (this.value != null && this.value.length > 0) {
          label = this.value.length.toString() + ' ' + selectionLabel;
          this.valuesAsString = label;
        } else {
          label = this.defaultLabel;
          this.valuesAsString = label;
        }
      }
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeMultiselect();
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
