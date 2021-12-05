import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import Swal from 'sweetalert2'
import { UtilitiesService } from '../../../services/utilities.service'
import * as UserActions from '../../../store/user/actions'
import { Store } from '@ngrx/store'

@Component({
  selector: 'vb-system-login-page',
  templateUrl: './login.component.html',
  styleUrls:['./s.scss']
})
export class LoginPage {
  form = new FormGroup({});
  model = {
    remember : false,
    identifier: '', password: '',

  };
  fields: FormlyFieldConfig[] = [

    {
      key: 'identifier',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'i.e daniel.chirwa@gmail.com',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type:'password',
        label: 'Password',
        required: true,
      }
    },
    {
      key: 'remember',
      type: 'checkbox',
      templateOptions: {
        label: 'Remember me on this device',
        required: false,
      }
    }
  ];
  constructor(private utilities: UtilitiesService,
              private store: Store<any>,) {

  }
  submit(){
    this.utilities.loadScreen();
    if(!this.form.valid) {
      this.utilities.stopLoadScreen();
      return;
    }
    const payload = {
      email: this.model.identifier,
      password: this.model.password
    }
    // console.log(payload)
    this.store.dispatch(new UserActions.Login(payload))
  }
}
