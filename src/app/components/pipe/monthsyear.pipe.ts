import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'monthsyear',
})
export class MonthsyearPipe implements PipeTransform {
  // months=["JAN","FEB"]
  transform(value: string, ...args: unknown[]): unknown {
    let year = parseInt(value.substring(0, 4))
    let month = parseInt(value.substring(4, value.length))
    let date = new Date()
    // date.setFullYear(year,month,25)
    return `${month}/25/${year}`
  }
}
