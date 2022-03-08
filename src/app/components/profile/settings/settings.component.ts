import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { UtilitiesService } from '../../../services/utilities.service'
import {NzNotificationService} from "ng-zorro-antd/notification";
import {environment} from "../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { profileTour_teacher } from 'src/app/tours/all';
import store from 'store'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  form = new FormGroup({});
  paasswordForm = new FormGroup({});
  updateMode = true
  gotProfile = true;
  teacher = false;
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
        placeholder: 'I am a student at.....',
        required: false,
      }
    },
     {
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
  teacherProfileForm: FormGroup;
  profileForm: FormGroup;
  teacherProfile = false
  doneUpdating = false
  subjects =[];
  tourMessages = [];
  currentMessage:any = {};
  startTour = false;
  tourCurrent =0;
  tourLength =0;

  constructor(private utility: UtilitiesService,
    private acR: ActivatedRoute,
    private notification: NzNotificationService,
    ) {
    this.model = this.utility.user
  }

  ngOnInit(): void {
    this.getProfile();
    setTimeout(()=>{
      this.tourStart();
    },2000 )

    if(this.acR.snapshot.data?.teacher){
      this.teacherProfile =true;
      this.getSubejcts();
      this.teacherProfileForm = new FormGroup({
        displayName : new FormControl('',Validators.required),
        location : new FormControl('',Validators.required),
        about : new FormControl('',Validators.required),
        subject : new FormControl('',Validators.required),
        phone : new FormControl('',Validators.required),
      })
      return;
    }
    this.profileForm = new FormGroup({
      id : new FormControl(''),
      displayName : new FormControl('',Validators.required),
      location : new FormControl('',Validators.required),
      about : new FormControl('',Validators.required)
    })

  }

    ngAfterViewInit() {
  }
next(){
  //move to next
  if(this.tourCurrent==this.tourLength) return
  this.tourCurrent++;
  this.currentMessage=this.tourMessages[this.tourCurrent]
 let element:HTMLElement = document.getElementById(this.tourCurrent+'');
//  console.log(element);
  element.focus()
}
cancel(){
  if(this.tourCurrent==0){
    this.tourCurrent=-1
    return
  }
  this.tourCurrent--;
  this.currentMessage=this.tourMessages[this.tourCurrent]
 let element:HTMLElement = document.getElementById(this.tourCurrent+'');
//  console.log(element);
  element.focus()
}

  tourStart(){

    if (this.utility.teacherAccount){
      this.tourMessages = profileTour_teacher;
      this.tourLength = this.tourMessages.length;
      this.currentMessage = this.tourMessages[0];
      this.tourCurrent = 0
      this.startTour = true;
    }else if(this.teacherProfile){
      store.set('profileTour',false)
      this.tourMessages = profileTour_teacher;
      this.tourLength = this.tourMessages.length;
      this.currentMessage = this.tourMessages[0];
      this.tourCurrent = 0
      this.startTour = true;
    }
  }

  async updateProfile() {
      //create pose

     let {id} = this.profileForm.value;
      let api = '/profiles/'+id
      let method  ='post'
      let body = {
        ...this.profileForm.value
      }
      this.utility.loadScreen();


      let q = await this.utility.httpRequest({api,method,body}).catch(err=>{
        this.utility.notifyUser.error(this.utility.constants.profile_Update_user_failed);
        return
      })
      if(q){
        this.utility.notifyUser.success(this.utility.constants.profile_Update_user_succeed);
      }

  }
  async onSubmitTeacher() {
      //create pose

      // this.model.id=this.utility.user.id;
      let api = '/profiles/teacher/complete'
      let method  ='post'
      let body = {
        ...this.teacherProfileForm.value
      }
      this.utility.loadScreen();


      let q = await this.utility.httpRequest({api,method,body})
      if(q?.message){
        store.set('profileTour',true)
        // this.utility.notifyUser.success(this.utility.constants.profile_Createduser_success);
        //update to teacher
        this.utility.stopLoadScreen();
        this.doneUpdating = true;
      }else{
        this.utility.notifyUser.error(this.utility.constants.profile_Update_user_failed);
        return
      }

  }
 async getSubejcts(){
    let api = '/subjects'
    let method = 'get'
    let d = await this.utility.httpRequest({api,method}).catch(err=>{
      // this.utility.notifyUser.error(this.utility.constants.User_profile_retrieval_failed);
      return
    })
    if(d){
      this.subjects =d
    }
  }
 async getProfile(){

    let api = '/profiles/me'
    let method = 'get'
    let d = await this.utility.httpRequest({api,method}).catch(err=>{
      this.utility.notifyUser.error(this.utility.constants.User_profile_retrieval_failed);
      return
    })
    if(d){
      // console.log(d)
      if(this.teacherProfile){
          this.teacherProfileForm.patchValue({
        ...d
      });
      }else{
        this.profileForm.patchValue({
          ...d
        });
      }

      this.gotProfile=true;
    }
    // this.utility.graphql.request(q).subscribe(
    //   ({data,errors})=>{
    //     if(errors){
    //       this.utility.notifyUser.error(this.utility.constants.User_profile_retrieval_failed);
    //       return
    //     }
    //     this.gotProfile=true;
    //     if(!data.profiles || data.profiles.length==0){
    //       this.updateMode = false
    //       return
    //     }
    //     this.model= data.profiles[0];
    //   }
    // )
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
