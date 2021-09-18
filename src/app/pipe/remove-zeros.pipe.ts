import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeZeros'
})
export class RemoveZerosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
