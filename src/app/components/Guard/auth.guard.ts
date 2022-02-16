import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import store from 'store'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean

  constructor(private store: Store<any>, public router: Router) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
      store.select('account',state.role.type);
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((res,rej)=>{
      setTimeout(() =>{
        if (this.authorized) {
          return res(true)
        }
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } })
      return res(false)
      },1000)
    })

  }
}
