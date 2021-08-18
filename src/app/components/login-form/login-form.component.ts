import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { dataService } from '../../services/dataservice'
@Component({
  selector: 'app-auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../pages/auth/style.component.scss'],
})
export class LoginFormComponent {

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
        options: this.ds.getUserRoles(),
      },
    },
  ]
  logo: String
  authProvider: string = 'basic-auth'
  loading: boolean = false

  constructor( private store: Store<any>, private ds: dataService) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

  submitForm(): void {
    this.store.dispatch(new UserActions.Login(this.model))
  }

}

