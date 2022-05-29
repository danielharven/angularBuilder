import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification'
import { environment } from '../../environments/environment'
import store from 'store'
// import { UtilitiesService } from './utilities.service'
import { Router } from '@angular/router'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private msg: NzNotificationService,
    private router: Router) {}
  notifyUser(msg) {
    this.msg.error("ZedSMS OOPS!",msg,{nzDuration:0})
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authToken = store.get('accessToken')

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
        catchError((error) => {
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
    console.log(error)
    let codes = error.status + ''
    // console.log(codes)
    let {href} = window.location
    switch (codes) {
      case '403': {
        if(!href.includes('home'))
        this.notifyUser(error?.error?.message || error?.error?.error)
        break
      }
      case '405': {
        // method not allowed
        // this.notifyUser('Method not Allowed')
        break
      }
      case '401': {
        localStorage.clear()
        store.remove();
        let loc =window.location.href;
        if(error.url.includes('auth/login')){

          break;
        }
        this.notifyUser('Kindly login to proceed')
        break
      }
      case '400': {
        // data field error
        if(error.url.includes('users/me')){

          break;
        }

        this.notifyUser(error?.error?.message[0].messages[0].message || error?.error?.error)
        break
      }
      case '444': {
        // plan expired redirect to purchase plan
        // this.router.navigate(['/profile'])
        // this.notifyUser('You need to purchase a plan')
        break
      }
      case '445': {
        // plan expired redirect to purchase plan
        // this.router.navigate(['/profile'])
        this.notifyUser('You Are Not Apporved to Answer Questions')
        break
      }
      case '446': {
        // plan expired redirect to purchase plan
        // this.router.navigate(['/profile'])
        this.notifyUser('The form is invalid, Kindly refresh page.')
        break
      }
      case '500': {
        this.notifyUser('oh! our bad we have an error')
        break
      }
      default: {
        this.notifyUser(error?.error?.message || error?.error?.error)
        break
      }
    }
  }
}
