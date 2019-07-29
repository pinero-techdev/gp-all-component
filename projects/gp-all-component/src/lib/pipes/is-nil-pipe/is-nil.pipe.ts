import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'isNil',
})
export class IsNilPipe implements PipeTransform {
  transform(value: unknown, condition = false): unknown {
    return condition ? !isNullOrUndefined(value) : isNullOrUndefined(value);
  }
}
