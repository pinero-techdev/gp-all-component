import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectTesterComponent } from '../components/multi-select-tester.component';

export const CUSTOM_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectTesterComponent),
    multi: true,
};
