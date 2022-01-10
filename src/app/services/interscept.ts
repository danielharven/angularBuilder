import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification'
import { environment } from '../../environments/environment'
import store from 'store'
import { Router } from '@angular/router'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private msg: NzNotificationService, private router: Router) {}
  notifyUser(msg) {
    this.msg.error(environment.app, msg)
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = store.get('accessToken')
    console.log(authToken)
    if (!authToken || req.url.includes('auth/local')) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = ''
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error')
            errorMsg = `Error: ${error.error.message}`
          } else {
            this.evaluateError(error)
            return throwError(error)
            return
          }
          // console.log(errorMsg)
          return throwError(errorMsg)
        }),
      )
    }
    if (!req.headers.get('Authorization')) {
      let authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      })
      authReq = authReq.clone({
        headers: authReq.headers.delete('x-requested-with'),
      })
      // authReq.headers.delete('x-requested-with')
      // send cloned request with header to the next handler.
      return next.handle(authReq).pipe(
        catchError(error => {
          let errorMsg = ''
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error')
            errorMsg = `Error: ${error.error.message}`
          } else {
            this.evaluateError(error)
            return throwError(error)
            return
          }
          // console.log(error)
          return throwError(errorMsg)
        }),
      )
    }
    if (req.headers.get('x-requested-with')) {
      const authReq = req.clone({
        headers: req.headers.delete('x-requested-with'),
      })
      authReq.headers.set('Authorization', 'Bearer ' + authToken)
      console.log(authReq)
      // send cloned request with header to the next handler.
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = ''
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error')
            errorMsg = `Error: ${error.error.message}`
          } else {
            this.evaluateError(error)
            return throwError(error)
          }
          // console.log(errorMsg)
          return throwError(errorMsg)
        }),
      )
    }

    // send cloned request with header to the next handler.
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = ''
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error')
          errorMsg = `Error: ${error.error.message}`
        } else {
          this.evaluateError(error)
          return throwError(error)
          return
        }
        // console.log(errorMsg)
        return throwError(errorMsg)
      }),
    )
  }

  private evaluateError(error: HttpErrorResponse) {
    let codes = error.status + ''
    switch (codes) {
      case '403': {
        this.notifyUser('Forbidden')
        break
      }
      case '405': {
        // method not allowed
        // this.notifyUser('Method not Allowed')
        break
      }
      case '401': {
        this.notifyUser('Kindly login to proceed')
        store.remove('accessToken')
        this.router.navigate(['/auth/login'])
        break
      }
      case '400': {
        // data field error
        break
      }
      case '500': {
        this.notifyUser('Server side error')
        break
      }
      default: {
        this.notifyUser('An error occurred in network')
        break
      }
    }
  }
}
