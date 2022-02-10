import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../store/reducers'
import { UtilitiesService } from '../../services/utilities.service'
import store from 'store'
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user :any={}
  plans=[]
  todos=[]

  teacher={bank:0, phone:0,limit:0}
  profile={
    about: undefined
  }
  account='';
  isVisible = false;
  withdrawForm : FormGroup
  constructor(private store: Store<any>,public  utilities: UtilitiesService) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.user=state
      this.utilities.stopLoadScreen()
      this.account = state.role.type;
      // console.log(state);

    })
  }

  ngOnInit(): void {

    if(this.utilities.studentAccount){
      this.getPlans()
    }
    if(this.utilities.teacherAccount){
      this.getTodos();
      this.getTeacher();
    }

    this.profile=this.utilities.profile;

    this.withdrawForm = new FormGroup({
      amount : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),
    })
  }
  showWithdrawslip(){
    this.isVisible =true;
  }
  async processWithdraw(){
    this.utilities.loadScreen()
    let api ='/withdraws/process'
    let method = 'post'
    let body = {
      ...this.withdrawForm.value
    }
    let y = await this.utilities.httpRequest({method,api,body})
    if(y){
      this.utilities.notifyUser.success('Withdraw Processing Has Begun')
      this.utilities.stopLoadScreen()
    }
  }
  async getTeacher(){
    // let x = ;
    let api = '/teachers/me'
    let method ='get'
    let start = 1
    let limit=10
    let x = await this.utilities.httpRequest({api,method})
    if(x){
      this.teacher = x
      console.log(x)
    }
  }

  async getTodos(){
    // let x = ;
    let api = '/todos'
    let method ='get'
    let start = 1
    let limit=10
    let x = await this.utilities.httpPaginatedRequest({api,method,start,limit})
    if(x){
      this.todos = x
      console.log(x)
    }
  }
  getPlans(){
    // let x = ;
    this.utilities.graphql.request(this.utilities.queries.getPlans())
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utilities.notifyUser.error(errors[0].message)
          return
        }
        if (data) {
          // work on data
          this.plans=data.plans;
        }
      }, error => {
        this.utilities.notifyUser.error(this.utilities.evaluateError(error))
      })
    //   .subscribe(({data,errors})=>{
    //   if(errors){
    //     //needs retry
    //     // this.getPlans();
    //     console.log(errors)
    //     return;
    //   }
    //   this.plans=data.plans;
    // })
  }

  choosePlan(x: any) {
    this.utilities.purchasePlan(x)
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
   this.processWithdraw()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
