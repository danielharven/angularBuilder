import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reservedenquiry'
})
export class ReservedenquiryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
