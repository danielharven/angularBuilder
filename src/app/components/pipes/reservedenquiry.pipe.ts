import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UtilitiesService } from '../../services/utilities.service'

@Pipe({
  name: 'reservedenquiry'
})
export class ReservedenquiryPipe implements PipeTransform {
  constructor(private utility :UtilitiesService) {
  }
  transform(value: string, ...args: unknown[]): Promise<string> {
    return new Promise(async (res,rej)=>{
      // get the status
      // let api = '/questions/reserved/'+value
      // let method = 'get'
      // let z = await this.utility.httpRequest({api,method})
      // //@ts-ignore
      if(value) return  res('Question is reserved')
      return res('')
    })
  }

}
