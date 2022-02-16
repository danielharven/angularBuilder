import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../services/utilities.service'
import Swal from 'sweetalert2'
import * as UserActions from '../../../store/user/actions'
import { Store } from '@ngrx/store'

@Component({
  selector: 'vb-system-register-page',
  templateUrl: './register.component.html',
  styleUrls:['./s.scss']
})
export class RegisterPage {
  option =0;
  form = new FormGroup({});
  model = {
    username: "",
    optin:false,
    role:''
  };
  fields: FormlyFieldConfig[] = [

    {
      key: 'displayName',
      type: 'input',
      templateOptions: {
        label: 'Full Name',
        placeholder: 'i.e Daniel Chirwa',
        required: true,
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'i.e daniel.chirwa@gmail.com',
        required: true,
        blur:(data)=>{
          // console.log(this.model.email)
        }
      },
      asyncValidators: {
        ip: {
          expression: (c) => {
            return new Promise((resolve, reject) => {
              let api='/profiles/email-available/'+c.value;
              let method="get"
              this.utilities.httpRequest({api,method}).then(d=>{
                console.log(d);

                if(d?.message){
                 return resolve(true)
                }else{
                  return resolve(false)
                }
              })
          })
        },
          message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not available`,
        },
      },
    },
    {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Must be at least 3 characters',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        },
      ],
    },
    {
      key: 'optin',
      type: 'checkbox',
      templateOptions: {
        label: 'Send me updates, promotions and other exciting stuff.',

      }
    },
  ];
  tk: any=''
  constructor(private acR : ActivatedRoute,
              private route: Router,
              private store: Store<any>,
              private utilities: UtilitiesService) {
  }
  ngOnInit(){
    // this.getRoles()
    this.acR.queryParams.subscribe(
      data=>{
       this.option = data.option || 0
      }
    )
    this.getToken()
  }
  async getToken(){
    this.tk= await this.utilities.getToken();
  }
  async submit(){
    this.utilities.loadScreen();
    if(!this.form.valid) {
      this.utilities.stopLoadScreen();
      return;
    }
    localStorage.clear();
    let username ='_' + Math.random().toString(36).substr(2, 9);
    this.model.username = username;
    let api = '/users-permissions/users/students';
    let method='post'
    let {tk}=this.tk
    let body = {
      ...this.model,tk
    }
    let q = await this.utilities.httpRequest({method,api,body}).catch(err=>{
      this.utilities.stopLoadScreen();
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed, try again',
        icon: 'error',
        confirmButtonText: 'close'
      })
      return
    })
    if(q){
      this.utilities.stopLoadScreen();
      Swal.fire({
              title: 'done!',
              text: 'Registration completed!',
              icon: 'success',
              confirmButtonText: 'Cool'
            }).then(data=>{
              if(data.isConfirmed){
               this.route.navigate(['/auth/login'])
              }
            })
    }

    // let q = this.utilities.queries.createUser(this.model);
    // // console.log(q)
    // this.utilities.graphql.request(q).subscribe(
    //   data=>{
    //     this.utilities.stopLoadScreen();
    //     if(data.errors){
    //       Swal.fire({
    //         title: 'Error!',
    //         text: 'Registration failed, try again',
    //         icon: 'error',
    //         confirmButtonText: 'close'
    //       })
    //       return
    //     }
    //     Swal.fire({
    //       title: 'done!',
    //       text: 'Registration completed!',
    //       icon: 'success',
    //       confirmButtonText: 'Cool'
    //     }).then(data=>{
    //       if(data.isConfirmed){
    //        this.route.navigate(['/login'])
    //       }
    //     })
    //   },error => {
    //     this.utilities.stopLoadScreen();
    //     Swal.fire({
    //       title: 'Error!',
    //       text: 'Registration failed, try again',
    //       icon: 'error',
    //       confirmButtonText: 'close'
    //     })
    //   }
    // )
  }
  checkEmailExists(){

  }
}
