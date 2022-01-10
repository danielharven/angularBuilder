import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Observable, of, timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'

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
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('x-requested-with')) {
      const authReq = request.clone({
        headers: request.headers.delete('x-requested-with'),
      })
      const authToken = localStorage.getItem('cross')
      if (authToken) authReq.headers.set('Authorization', 'Bearer ' + authToken)
      // console.log(authReq)
      // send cloned request with header to the next handler.
      return next.handle(authReq)
    }

    return next.handle(request)
  }
}
