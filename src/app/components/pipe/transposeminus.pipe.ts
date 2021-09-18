import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transposeminus'
})
export class TransposeminusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let v = ''
    let arr = value.split('-')
    v = arr[1]+'-'
    if(arr.length ==1) return value
    return v
  }

}
