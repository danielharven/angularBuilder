import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import store from 'store'
import { Router, RouterStateSnapshot } from '@angular/router'
import { UtilitiesService } from '../../../services/utilities.service'
@Component({
  selector: 'mylogin',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class MyLoginComponent {
  form: FormGroup
  logo: String
  authProvider: string = 'firebase'
  loading: boolean = true
  noAccount: any = false;
  tooLong: any = false;
  account: any = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private utilitie:UtilitiesService,
              private stores: Store<any>,
              ) {
    this.utilitie.accountFound.subscribe(data=>{
      if(data.status){
        this.account=true;
        this.noAccount=false;
        this.loading = false
        this.tooLong=false
      }else{
        this.noAccount=true;
        this.account=false;
        this.loading = false
        this.tooLong=false
      }
    })
   let location = this.router.url;
    let arrStaet =location.split('user%2F')
    try{
      if(arrStaet[1].length>10){
        store.set('accessToken', arrStaet[1])
        this.stores.dispatch(new UserActions.LoadCurrentAccount());
      }
    }catch (e) {
      // console.log(e);
    }


    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      empNo: ['', [Validators.required]],
    });

    this.stores.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    });

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

    try{
      this.stores.dispatch(new UserActions.Login(payload))
    }catch (e){
      console.log(e);
      window.location.reload();
    }

    setTimeout(()=>{
      if(this.noAccount) return;
      if(this.account) return;
      this.tooLong = true;
    },6000)
  }

  setProvider(authProvider) {
    this.stores.dispatch(
      new SettingsActions.SetStateAction({
        authProvider,
      }),
    )
  }
}
