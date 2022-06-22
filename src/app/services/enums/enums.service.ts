import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  standards = {
    essap_link: '',
    szi_link: 'https://zone-tech.org',
    szi_name: 'Zone Technology Zambia',
    esapp_name: 'ZedSms',
    testUserName:'admin@zedsms.com',
    testUserPassword: 'Q!weRTy@134'
  }
  constructor() {}
}
