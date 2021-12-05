import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, empty, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
import store from 'store'
import { NzNotificationService } from 'ng-zorro-antd/notification'

import * as Reducers from 'src/app/store/reducers'
import * as UserActions from './actions'
import { jwtAuthService } from 'src/app/services/jwt'
import { firebaseAuthService } from 'src/app/services/firebase'
import { UtilitiesService } from '../../services/utilities.service'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private jwtAuthService: jwtAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private rxStore: Store<any>,
    private notification: NzNotificationService,
    private utilities : UtilitiesService
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: UserActions.LOAD_CURRENT_ACCOUNT }
  }

  @Effect()
  login: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGIN),
    map((action: UserActions.Login) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      // jwt login
        return this.jwtAuthService.login(payload.email, payload.password).pipe(
          map(response => {
            if (response && response.jwt) {
              store.set('accessToken', response.jwt)
              this.notification.success('Logged In', 'You have successfully logged in!');
              return new UserActions.LoadCurrentAccount()
            }
            this.notification.warning('Auth Failed', response)
            return new UserActions.LoginUnsuccessful()
          }),
          catchError(error => {
            console.log('LOGIN ERROR: ', error)
            this.utilities.stopLoadScreen();
            this.utilities.notifyUser.error('Login failed')
            return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
          }),
        )

    }),
  )

  @Effect()
  register: Observable<any> = this.actions.pipe(
    ofType(UserActions.REGISTER),
    map((action: UserActions.Register) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      // jwt register
      if (settings.authProvider === 'jwt') {
        return this.jwtAuthService.register(payload.email, payload.password, payload.name).pipe(
          map(response => {
            if (response && response.id) {
              if (response.accessToken) {
                store.set('accessToken', response.accessToken)
              }
              this.router.navigate(['/'])
              return new UserActions.RegisterSuccessful(response)
            }
            this.notification.warning('Registration Failed', response)
            return new UserActions.RegisterUnsuccessful()
          }),
          catchError(error => {
            console.log('REGISTER ERROR: ', error)
            return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
          }),
        )
      }
    }),
  )

  @Effect()
  loadCurrentAccount: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOAD_CURRENT_ACCOUNT),
    map((action: UserActions.LoadCurrentAccount) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([action, settings]) => {
      console.log(settings)
      // jwt load current account
      if (settings.authProvider === 'jwt') {
        return this.jwtAuthService.currentAccount().pipe(
          map(response => {
            if (response && (response.email || response.user)) {
              if (this.route.snapshot.queryParams.returnUrl) {
                this.router.navigate([this.route.snapshot.queryParams.returnUrl]) // // redirect to returnUrl
              } else if (this.router.url.includes('/auth')) {
                this.router.navigate(['/']) // redirect to root route on auth pages

              }
              this.utilities.stopLoadScreen();
              return new UserActions.LoadCurrentAccountSuccessful(response)
            }
            this.utilities.stopLoadScreen();
            return new UserActions.LoadCurrentAccountUnsuccessful()
          }),
          catchError(error => {
            console.log('ACCOUNT LOAD ERROR: ', error)
            this.utilities.stopLoadScreen();
            return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
          }),
        )
      }
    }),
  )

  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGOUT),
    map((action: UserActions.Logout) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([, settings]) => {
      // jwt logout
      if (settings.authProvider === 'jwt') {
        return this.jwtAuthService.logout().pipe(
          map(() => {
            store.remove('accessToken')
            this.router.navigate(['/auth/login'])
            return new UserActions.FlushUser()
          }),
        )
      }

    }),
  )

}
