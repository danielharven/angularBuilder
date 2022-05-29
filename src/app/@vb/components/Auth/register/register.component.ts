import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import {HttpService} from "../../../../services/http.service";

@Component({
  selector: 'vb-system-register',
  template:`
  <div class="pt-5">
  <div class="card boxContainer mt-2">
    <div class="text-dark font-size-32 mb-3">
      Create your account
    </div>
    <div class="mb-4">
      <p>
        And start spending more time on your projects and less time managing your
        infrastructure.
      </p>
    </div>
    <form nz-form [nzLayout]="'vertical'" [formGroup]="form" (ngSubmit)="submitForm()" role="form">
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your Full Name!">
          <input type="text" nz-input formControlName="name" placeholder="Full Name" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your Email!">
          <input type="text" nz-input formControlName="email" placeholder="Email Address" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your Password!">
          <input type="password" nz-input formControlName="password" placeholder="Password" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your business or company name!">
          <input type="text" nz-input formControlName="company" placeholder="Company or business name" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" [nzLoading]="loading" class="text-center w-100">
            <strong>Sign Up</strong>
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
    <div>
      By signing up, you agree to the
      <a href="javascript: void(0);" class="vb__utils__link">
        Terms of Service
      </a>
      and
      <a href="javascript: void(0);" class="vb__utils__link">
        Privacy Policy
      </a>
    </div>
  </div>
  <div class="text-center pt-2 mb-auto">
    <span class="mr-2">Already have an account?</span>
    <a routerLink="/auth/login" class="vb__utils__link">
      Sign in
    </a>
  </div>
</div>
  `,
  styleUrls: ['../style.component.scss'],
})
export class RegisterComponent {
  form: FormGroup
  loading: boolean = false
  tk=""
  constructor(private fb: FormBuilder, private store: Store<any>,private httpService:HttpService) {
    this.form = fb.group({
      email: [, [Validators.required, Validators.minLength(4),Validators.email]],
      password: [, [Validators.required]],
      name: [, [Validators.required]],
      company: [, [Validators.required]],
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  this.mtk()
  }
async mtk(){
    //@ts-ignore
  let mytk = await this.httpService.getTk();
  this.tk = mytk.tk
}
  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }
  get name() {
    return this.form.controls.name
  }
  get company() {
    return this.form.controls.company
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    this.name.markAsDirty()
    this.name.updateValueAndValidity()
    this.company.markAsDirty()
    this.company.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid || this.name.invalid || this.company.invalid) {
      return
    }
    const payload = {
      email: this.email.value,
      password: this.password.value,
      username: this.name.value,
      company: this.company.value,
      tk:this.tk
    }
    this.store.dispatch(new UserActions.Register(payload))
  }
}
