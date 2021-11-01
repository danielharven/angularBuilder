import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'

@Injectable()
export class jwtAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string): Observable<any> {
    return this.http.post(environment.url + '/business/credentials/login', { email })
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(environment.url + '/api/auth/register', { email, password, name })
  }

  currentAccount(): Observable<any> {
    const accessToken = store.get('token')
    const params = accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // AccessToken: accessToken,
          },
        }
      : {}
    console.log(params)
    return this.http.get(environment.url + '/users/me', params)
  }

  logout(): Observable<any> {
    localStorage.clear()
    this.router.navigate(['/auth/logout'])
    return this.http.get(environment.url + '/api/auth/logout')
  }
}
