import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNil',
})
export class IsNilPipe implements PipeTransform {
  transform(value: any, condition = false): any {
    if(condition){
      return value != null;
    }else{
      return value = null;
    }
  }
}
