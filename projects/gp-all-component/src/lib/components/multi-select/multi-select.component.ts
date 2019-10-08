import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MultiSelect } from 'primeng/primeng';
import { noop } from 'rxjs';
import { LocaleES } from './../../resources/localization/es-ES.lang';

@Component({
  selector: 'gp-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements ControlValueAccessor {
  /**
   * Text shown near the number of selected elements
   */
  @Input()
  selectionLabel = LocaleES.SELECTED_OPTIONS;

  /**
   * Multiselect options
   */
  @Input()
  options: SelectItem[] = null;

  @Input()
  disabled = false;

  @Input()
  defaultLabel = LocaleES.CHOOSE_AN_OPTION;

  @Input()
  optionLabel = 'label';

  @Input()
  dataKey = 'value';

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

  @Input()
  selectModel: string;

  @Output()
  selectModelChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild(MultiSelect) multi: MultiSelect;

  // Inner model data mandatory for ngModel
  public innerValue = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  /**
   * Get accessor for value property
   */
  get value(): string {
    return this.innerValue;
  }

  /**
   * Set accessor and call the onchange callback
   * @param v The new input value
   */
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.onChange.emit(v);
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
        if (this.value !== null && this.value !== undefined && this.value.length > 0) {
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
   * Emit event when value changes
   * @param event The event to dispatch
   */
  updateSelectModel(event: any) {
    this.selectModelChange.emit(
      event.map((item) => {
        return item.value;
      })
    );
    this.onChange.emit(
      event.map((item) => {
        return item.value;
      })
    );
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
