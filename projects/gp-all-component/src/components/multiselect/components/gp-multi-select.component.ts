import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {MultiSelect, SelectItem} from 'primeng/primeng';
import {noop} from 'rxjs';
import {CUSTOM_CONTROL_VALUE_ACCESSOR} from '../constants/custom-control-value-accessor.constant';

@Component({
  selector: 'gp-multiselect',
  templateUrl: './gp-multi-select.component.html',
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR]
})
export class GpMultiSelectComponent implements ControlValueAccessor {

  /**
   * Texto que se mostrará junto con el número de elementos seleccionados
   */
  @Input()
  selectionLabel = 'Opciones seleccionadas';

  /* PROPIEDADES DE MULTISELECT */
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
  scrollHeight = '200px';

  @Input()
  overlayVisible = false;

  @Input()
  tabindex: number = null;

  @Output()
  onChange: EventEmitter<any> = new EventEmitter();

  // modelo de datos interno necesario para el ngModel
  private innerValue = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get valor(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set valor(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.onChange.emit(v);
    }
  }

  @ViewChild(MultiSelect) multi: MultiSelect;

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  onChangeMultiselect() {
    let label: string;
    const selectionLabel = this.selectionLabel;
    if (!(this.multi === null || this.multi === undefined)) {
      this.multi.updateLabel = function () {
        if (this.value != null && this.value.length > 0) {
          label = this.value.length.toString() + ' ' + selectionLabel;
          this.valuesAsString = label;
        } else {
          label = this.defaultLabel;
          this.valuesAsString = label;
        }
      };
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeMultiselect();
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
