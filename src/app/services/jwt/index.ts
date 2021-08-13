import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { environment } from '../../../environments/environment'

@Injectable()
export class jwtAuthService {
  url =  environment.url
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    let identifier = email;
    return this.http.post(this.url+'/auth/local',
      { identifier, password })
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(this.url+'/auth/register', { email, password, name })
  }

  currentAccount(): Observable<any> {
    const accessToken = store.get('accessToken')
    const params = accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // AccessToken: accessToken,
          },
        }
      : {}

    return this.http.get(this.url+'/users/me', params)
  }

  logout(): Observable<any> {
    return this.http.get(this.url+'/auth/logout')
  }
}
