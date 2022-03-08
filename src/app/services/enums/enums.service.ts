import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  standards = {
    tadya_link: 'https://mytadya.me',
    app_name: 'Tadya',
  }
  constructor() {}
}
