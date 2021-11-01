import { Pipe, PipeTransform } from '@angular/core'
import { UtilitiesService } from '../services/utilities.service'

@Pipe({
  name: 'institutionName',
})
export class InstitutionNamePipe implements PipeTransform {
  constructor(private utility: UtilitiesService) {}
  async transform(value: string, ...args: unknown[]): Promise<any> {
    let api = '/institutions/' + value

    // console.log(institute)
    return await this.utility
      .sendAuthenticatedRequests({ api, method: 'GET' })
      // @ts-ignore
      .subscribe(data => data.name)
  }
}
