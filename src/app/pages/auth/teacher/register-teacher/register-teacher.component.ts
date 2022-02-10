import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import Swal from 'sweetalert2'
import { UtilitiesService } from 'src/app/services/utilities.service';
@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss']
})
export class RegisterTeacherComponent implements OnInit {

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
              private store: Store<any>,
              private utilities: UtilitiesService) {
  }
  ngOnInit(){
    this.acR.queryParams.subscribe(
      data=>{
        console.log(data)
       this.option = data.option || 0
      }
    )
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
    let api = '/users';
    let method='post'
    let body = {
      ...this.model
    }
    let q = await this.utilities.httpRequest({method,api,body}).catch(err=>{
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed, try again',
        icon: 'error',
        confirmButtonText: 'close'
      })
      return
    })
    if(q){
      this.utilities.stopLoadScreen()
      Swal.fire({
              title: 'done!',
              text: 'Registration completed!',
              icon: 'success',
              confirmButtonText: 'Cool'
            }).then(data=>{
              if(data.isConfirmed){
                // console.log('mooo')
               this.route.navigate(['/teacher/setup'])
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
}
