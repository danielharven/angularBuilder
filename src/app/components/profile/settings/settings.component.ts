import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { UtilitiesService } from '../../../services/utilities.service'
import {NzNotificationService} from "ng-zorro-antd/notification";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form = new FormGroup({});
  paasswordForm = new FormGroup({});
  updateMode = true
  gotProfile = true;
  constructor(private utility: UtilitiesService, private notification: NzNotificationService) {
    this.model = this.utility.user
  }
  ngOnInit(): void {
    this.model.id = this.utility.user.id;
    this.getProfile()
  }
  model = {id:''};
  fields: FormlyFieldConfig[] = [
    {
      key: 'displayName',
      type: 'input',
      templateOptions: {
        label: 'Display Name',
        placeholder: 'Daniel Chirwa',
        required: true,
      }
    },
    {
      key: 'about',
      type: 'textarea',
      templateOptions: {
        label: 'About Me',
        placeholder: 'I am a .....',
        required: false,
      }
    },
    {
      key: 'avator',
      type: 'file',
      templateOptions: {
        label: 'Profile Picture',
        required: false,
      }
    },    {
      key: 'location',
      type: 'input',
      templateOptions: {
        label: 'Town',
        required: false,
      }
    },
  ];
  passwordModel = {id:'', newPassword: "",
    confirmPassword: ""
  };
  passwordFields: FormlyFieldConfig[] = [
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Current Password',
        required: true,
      }
    },
    {
      key: 'newPassword',
      type: 'input',
      templateOptions: {
        label: 'New Password',
        required: true,
      }
    },
    {
      key: 'confirmPassword',
      type: 'input',
      templateOptions: {
        label: 'New Password (again)',
        required: true,
      }
    },
  ];

  onSubmit() {
    if (this.form.valid) {
      //create pose
     console.log(this.model)
      this.model.id=this.utility.user.id;
      let q = this.utility.queries.updateProfile(this.model)
    this.utility.graphql.request(q).subscribe(
      ({data,errors})=>{
        console.log(errors)
        console.log(data)
      }
    )

    }
  }
  getProfile(){
    let q = this.utility.queries.getProfile();
    this.utility.graphql.request(q).subscribe(
      ({data,errors})=>{
        if(errors){
          this.utility.notifyUser.error(this.utility.constants.User_profile_retrieval_failed);
          return
        }
        this.gotProfile=true;
        if(!data.profiles || data.profiles.length==0){
          this.updateMode = false
          return
        }
        this.model= data.profiles[0];
      }
    )
  }

  changePassword() {
    if(!this.paasswordForm ){
      return;
    }
    if(this.passwordModel.newPassword!=this.passwordModel.confirmPassword){
      return
    }
    this.utility.http.post(environment.url+'/profiles/change-password',this.passwordModel)
      .subscribe(data=>{
        //@ts-ignore
        let {jwt,user} = data
        if(jwt){
          this.utility.notifyUser.success('Password changed successfully')
          this.utility.usersModule.navigate('/auth/login')
        }
      })
  }
  deleteAccount() {
    this.utility.http.post(environment.url+'/profiles/block-account', {})
      .subscribe(data=>{
        //@ts-ignore
        let {message,user} = data
        if(message){
          this.utility.notifyUser.success('Account has been blocked')
          this.utility.usersModule.navigate('/auth/login')
        }
      })
  }

}
