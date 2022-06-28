import { Pipe, PipeTransform } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
const URL = environment.url
@Pipe({
  name: 'getCustomerName'
})
export class GetCustomerNamePipe implements PipeTransform {
constructor(private http:HttpClient) {
}
  async transform(value: string, ...args: unknown[]) {
  if(value.includes("+")){
    let v= value.split("+")
    value=v[1]
  }
 if (value.length <8) return "Service Number"
   let customer = await this.http.get(URL+'/customers?_q='+value).toPromise()
    if(Array.isArray(customer)){
      if (customer.length===0) return "Unknown"
      return customer[0].name
    }
    return "Unknown";
  }

}
