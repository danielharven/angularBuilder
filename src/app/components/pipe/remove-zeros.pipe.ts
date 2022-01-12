import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'removeZeros',
})
export class RemoveZerosPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value == null) return ''
    if (value.includes('undefined')) return ''
    if (value == '0.00') return ''
    return value
  }
}
