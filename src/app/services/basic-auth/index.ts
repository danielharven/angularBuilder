import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment.dev'
import store from 'store'

@Injectable()
export class basicAuthService {
  private environment = environment;
  constructor(private http: HttpClient) {}

  login(role: string): Observable<any> {
    return of({role:role})
  }

  // user name password
  currentAccount(): Observable<any> {
    const role = store.get('role')
    return of({role:role})
  }

  logout(): Observable<any> {
    return of({role:''})
  }
}
