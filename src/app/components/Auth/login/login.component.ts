import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import store from 'store'
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router'
import { UtilitiesService } from '../../../services/utilities.service'
import { environment } from 'src/environments/environment'
@Component({
  selector: 'mylogin',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class MyLoginComponent implements OnInit {
  form: FormGroup
  logo: String
  authProvider: string = 'firebase'
  loading: boolean = true
  noAccount: any = false
  tooLong: any = false
  account: any = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private utilitie: UtilitiesService,
    private stores: Store<any>,
  ) {
    this.utilitie.accountFound.subscribe(data => {
      if (data.status) {
        this.account = true
        this.noAccount = false
        this.loading = false
        this.tooLong = false
      } else {
        this.noAccount = true
        this.account = false
        this.loading = false
        this.tooLong = false
      }
    })

    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      empNo: ['', [Validators.required]],
    })

    this.stores.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    })

    this.stores.pipe(select(Reducers.getUser)).subscribe(state => {
      //check the url for token
      this.loading = state.loading
    })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.empNo
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    const payload = {
      email: this.email.value,
      password: this.password.value,
    }
    //make my own login logic

    try {
      this.stores.dispatch(new UserActions.Login(payload))
    } catch (e) {
      console.log(e)
      window.location.reload()
    }

    setTimeout(() => {
      if (this.noAccount) return
      if (this.account) return
      this.tooLong = true
    }, 6000)
  }

  setProvider(authProvider) {
    this.stores.dispatch(
      new SettingsActions.SetStateAction({
        authProvider,
      }),
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(d => {
      let { token } = d
      console.log(d)
      if (token) {
        this.loginStufff(token)
      }
    })
  }

  async loginStufff(token) {
    //get the actual token
    store.set('ktoken', token)
    let method = 'GET'
    let api = environment.url + '/tokens/' + token

    this.utilitie.sendUnAuthenticatedRequests({ method, api, body: {} }).subscribe(t => {
      // console.log(token)
      if (t) {
        //@ts-ignore
        store.set('accessToken', t?.jwt)
        // load account
        this.stores.dispatch(new UserActions.LoadCurrentAccount())
      } else {
        this.utilitie.notifyUser.error('token expired')
      }
    })
  }
}
