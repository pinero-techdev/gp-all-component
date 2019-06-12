import { ControlValueAccessor } from '@angular/forms';
const noop = () => {};

export class CustomInput implements ControlValueAccessor {
  private innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
    this.onChangeCallback(v);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  onBlur() {
    this.onTouchedCallback();
  }
  onChange(event) {
    this.value = event;
    this.onChangeCallback(event);
  }
}
