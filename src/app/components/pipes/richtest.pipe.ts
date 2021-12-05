import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'richtest'
})
export class RichtestPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let x =value.replace(/-/g,'<br>-')
    // console.log(x)
    return x;
  }

}
