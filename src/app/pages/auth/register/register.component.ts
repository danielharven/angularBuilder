import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../services/utilities.service'
import Swal from 'sweetalert2'
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
    optin:false
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
      }
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
  constructor(private acR : ActivatedRoute,
              private route: Router,
              private utilities: UtilitiesService) {
  }
  ngOnInit(){
    this.acR.queryParams.subscribe(
      data=>{
       this.option = data.option || 0
      }
    )
  }
  submit(){
    this.utilities.loadScreen();
    if(!this.form.valid) {
      this.utilities.stopLoadScreen();
      return;
    }
    let username ='_' + Math.random().toString(36).substr(2, 9);
    this.model.username = username;
    let q = this.utilities.queries.createUser(this.model);
    // console.log(q)
    this.utilities.graphql.request(q).subscribe(
      data=>{
        this.utilities.stopLoadScreen();
        if(data.errors){
          Swal.fire({
            title: 'Error!',
            text: 'Registration failed, try again',
            icon: 'error',
            confirmButtonText: 'close'
          })
          return
        }
        Swal.fire({
          title: 'done!',
          text: 'Registration completed!',
          icon: 'success',
          confirmButtonText: 'Cool'
        }).then(data=>{
          if(data.isConfirmed){
            switch (this.option){
              case 0:{
                this.route.navigate(['/profile'])
                break;
              }
              case 1:{
                this.route.navigate(['/profile/1'])
                break;
              }
              case 2:{
                this.route.navigate(['/profile/2'])
                break;
              }
              case 3:{
                this.route.navigate(['/profile/3'])
                break;
              }
              case 4:{
                this.route.navigate(['/profile/4'])
                break;
              }
              default:{
                this.route.navigate(['/profile'])
                break;
              }
            }
          }
        })
      },error => {
        this.utilities.stopLoadScreen();
        Swal.fire({
          title: 'Error!',
          text: 'Registration failed, try again',
          icon: 'error',
          confirmButtonText: 'close'
        })
      }
    )
  }
}
