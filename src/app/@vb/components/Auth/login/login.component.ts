import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'

@Component({
  selector: 'vb-system-login',
  template:`
  <div class="pt-5">
    <div class="card boxContainer mt-2">
        <div class="text-dark font-size-32 mb-3">Sign In</div>
        <div class="mb-4">
            Login and password
            <br />
            <strong></strong>
        </div>
        <!-- <div class="mb-4">
      <nz-radio-group [ngModel]="authProvider" (ngModelChange)="setProvider($event)">
        <label nz-radio nzValue="jwt">JWT</label>
        <label nz-radio nzValue="firebase">Firebase</label>
      </nz-radio-group>
    </div> -->
        <form nz-form [nzLayout]="'vertical'" [formGroup]="form" (ngSubmit)="submitForm()" role="form">
            <nz-form-item>
                <nz-form-control nzErrorTip="Please input your email!">
                    <input type="text" nz-input formControlName="email" placeholder="Email Address" />
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-control nzErrorTip="Please input your Password!">
                    <input type="password" nz-input formControlName="password" placeholder="Password" />
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-control>
                    <button nz-button nzType="primary" [nzLoading]="loading" class="text-center w-100">
            <strong>Log In</strong>
          </button>
                </nz-form-control>
            </nz-form-item>
        </form>
        <a routerLink="/auth/forgot-password" class="vb__utils__link">
      Forgot password?
    </a>
    </div>
    <div class="text-center pt-2 mb-auto">
        <span class="mr-2">Don't have an account?</span>
        <a routerLink="/auth/register" class="vb__utils__link">
      Sign up
    </a>
    </div>
</div>

  `,
  styleUrls: ['../style.component.scss'],
})
export class LoginComponent {
  form: FormGroup
  logo: String
  authProvider: string = 'basic-auth'
  loading: boolean = false

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
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
    this.store.dispatch(new UserActions.Login(payload))
  }

}

