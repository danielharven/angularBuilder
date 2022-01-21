import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'

@Injectable()
export class jwtAuthService {
  url =  environment.url
  constructor(private http: HttpClient, private router:Router) {}

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
    console.log('logging out')
    localStorage.clear();
    store.remove('accessToken');
    this.router.navigate(['/auth/login'])
    return new Observable<any>(observable=>{
      return observable.complete()
    })
  }
}
