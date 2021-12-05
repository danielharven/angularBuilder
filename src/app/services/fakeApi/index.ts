import { Injectable } from '@angular/core'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import store from 'store'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = store.get('accessToken')

    if(!authToken || req.url.includes('auth/local')){
      return next.handle(req)
    }
    if(!req.headers.get('Authorization')){
      let authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+authToken)
      });
      authReq = authReq.clone({
        headers: authReq.headers.delete('x-requested-with')
      });
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    if(req.headers.get('x-requested-with')){
      const authReq = req.clone({
        headers: req.headers.delete('x-requested-with')
      });
      authReq.headers.set('Authorization', 'Bearer '+authToken)
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

// send cloned request with header to the next handler.
    return next.handle(req);


  }
}
