import { Injectable } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private nzNotify: NzNotificationService) {}

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

  getProvinces() {}
  getDistrictsByProvince() {}
}
