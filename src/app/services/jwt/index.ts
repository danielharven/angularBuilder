import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { environment } from '../../../environments/environment'

@Injectable()
export class jwtAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.url + '/auth/local', { identifier: email, password })
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(environment.url + '/auth/register', { email, password, username: name })
  }

  currentAccount(): Observable<any> {
    const accessToken = store.get('accessToken')
    const params = accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : {}

    return this.http.get(environment.url + '/users/me', params)
  }

  logout(): Observable<any> {
    return this.http.get(environment.url + '/logout')
  }
}
