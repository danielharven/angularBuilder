import { Injectable } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Apollo, gql } from 'apollo-angular'

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  provinces: any = []
  districts: any = []
  constructor(private nzNotify: NzNotificationService, private apollo: Apollo) {
    this.getProvinces().valueChanges.subscribe((result: any) => {
      this.provinces = result?.data?.provinces
      // this.loading = result.loading;
      // this.error = result.error;
    })
    this.getDistricts().valueChanges.subscribe((result: any) => {
      this.districts = result?.data?.districts
      // this.loading = result.loading;
      // this.error = result.error;
    })
  }

  notify = {
    success: msg => {
      this.nzNotify.success(`DNRPC`, msg)
    },
    info: msg => {
      this.nzNotify.info(`DNRPC`, msg)
    },
    error: msg => {
      this.nzNotify.error(`DNRPC`, msg)
    },
  }

  getProvinces() {
    return this.apollo.watchQuery({
      query: gql`
        {
          provinces {
            id
            name
          }
        }
      `,
    })
  }
  getDistricts() {
    return this.apollo.watchQuery({
      query: gql`
        {
          districts {
            id
            label
            province {
              id
            }
          }
        }
      `,
    })
  }
  getAllDistricts() {
    return this.apollo.watchQuery({
      query: gql`
        {
          districts {
            id
            label
            province {
              id
            }
          }
        }
      `,
    })
  }

  createNrc(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          createNrc(
            input: {
              data: {
                district:"${data.district}",
                confirmed: ${data.confirmed},
                nrc:"${data.nrc}",
                pic_id1: "${data.pic1}",
                pic_id2: "${data.pic2}"
              }
            }
          ){
            nrc{
              id
              nrc
            }
          }
        }
      `,
    })
  }
}
