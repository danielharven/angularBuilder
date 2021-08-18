import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'vb-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({})
  model: any = {}
  fields: FormlyFieldConfig[] =[
    {
      key: 'role',
      type: 'select',
      templateOptions: {
        type: 'text',
        placeholder: 'Select Role',
        required: true,
        options: [
          {value:"guest", label:"Guest"},
          {value:"mgf_applicant", label:"MGF Applicant"},
          {value:"camp_officer", label:"Camp Officer"},
          {value:"category_b", label:"Category B Farmer"},
          {value:"audit", label:"Auditor"},
          {value:"external_reviewer", label:"External Reviewer"},
          {value:"do", label:"District Officer"},
          {value:"po", label:"Provincial Officer"},
          {value:"pco", label:"ESAPP"},
        ],
      },
    },
  ]



  logo: String
  authProvider: string = 'basic-auth'
  loading: boolean = false

  constructor( private store: Store<any>) {

    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

  submitForm(): void {
    // const payload = {
    //   role: this.model.role,
    // }
    this.store.dispatch(new UserActions.Login(this.model))
  }

}

