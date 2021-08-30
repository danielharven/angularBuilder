import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Observable, of, throwError, timer } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { NzNotificationService } from 'ng-zorro-antd/notification'

const fakeJwtToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTA4Njk0MDEsImV4cCI6MTkwNjQwMjIwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.E3kbVuYOL_CVQIDZ25iUXHlyIXTzt2XGO--JkK8LmKY'
const users = [
  {
    id: 1,
    email: 'demo@visualbuilder.cloud',
    password: 'VisualBuilder',
    name: 'Tom Jones',
    avatar: '',
    role: 'admin',
    accessToken: fakeJwtToken,
  },
]

@Injectable()
export class MockHttpCallInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private notification: NzNotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.headers.get('Authorization'))
    if (request.headers.get('Authorization') == null && request.url.includes('graphql')) {
      const authReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + JSON.parse(localStorage.getItem('accessToken')) || '',
        ),
      })
      return next.handle(authReq).pipe(
        catchError(error => {
          console.log('error is intercept')
          console.error(error)
          this.notification.error('DNRPC', error.error.data[0].messages[0].message)
          return throwError(error.message)
        }),
      )
      console.log(request.headers.get('Authorization'))
    }
    let auth = request.url.includes('auth')
    if (request.headers.get('Authorization') == null && !auth) {
      const authReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + JSON.parse(localStorage.getItem('accessToken')) || '',
        ),
      })
      return next.handle(authReq).pipe(
        catchError(error => {
          console.log('error is intercept')
          console.error(error)
          this.notification.error('DNRPC', error.error.data[0].messages[0].message)
          return throwError(error.message)
        }),
      )
      console.log(request.headers.get('Authorization'))
    }
    return next.handle(request).pipe(
      catchError(error => {
        console.log('error is intercept')
        console.error(error)
        this.notification.error('DNRPC', error.error.data[0].messages[0].message)
        return throwError(error.message)
      }),
    )
  }
}
