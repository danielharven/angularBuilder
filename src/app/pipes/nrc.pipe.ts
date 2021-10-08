import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'nrc',
})
export class NrcPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value.length == 9) {
      let nrc =
        value.substring(0, 5) +
        '/' +
        value.substring(6, 7) +
        '/' +
        value.substring(value.length - 1)
      return nrc
    }
    return value
  }
}
