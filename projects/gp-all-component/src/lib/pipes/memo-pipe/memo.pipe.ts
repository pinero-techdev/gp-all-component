import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memo',
})
export class MemoPipe implements PipeTransform {
  // tslint:disable-next-line
  transform(fn: Function, ...args: any[]): any {
    return fn(...args);
  }
}
