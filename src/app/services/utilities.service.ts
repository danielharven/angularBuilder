import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner'
import { HttpClient } from '@angular/common/http'
import ApolloClient from 'apollo-client'
import { GraphQL } from 'ngx-graphql'
import * as UserActions from '../store/user/actions'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../store/reducers'
import Swal from 'sweetalert2'
import * as Sto from 'store'
import { BehaviorSubject } from 'rxjs'
import { error } from '@ant-design/icons-angular'
import { environment } from '../../environments/environment'
// import {FlutterwaveCheckout} from "flutterwave-angular-v3/src/app/modules/models";
const URRL= environment.url;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  authorized: boolean =false
  user :any={}
  profile :any={}
  constructor(private loader : NgxSpinnerService,
              public graphql: GraphQL,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<any>,
              public http: HttpClient) {
    this.store.pipe(select(Reducers.getUser))
      .subscribe(state => {
      this.authorized = state.authorized
      this.user = state;
      console.log(state)
      const accessToken = Sto.get('accessToken')
      if(!accessToken){
        this.router.navigate(['auth/login'])
        return;
      }
      this.graphql.request(this.queries.getProfile()).subscribe(
        ({data,errors})=>{
          if(errors){
            return
          }
          this.profile=data.profiles[0];
        }
      )
    })
  }

  loadScreen(){
    this.loader.show();
  }
  stopLoadScreen(){
    this.loader.hide();
  }
  notifyUser={
    success:(msg)=>{
      Swal.fire({
        title: 'Success!',
        text: msg,
        icon: 'success',
        confirmButtonText: 'close'
      })
    },
    error:(msg)=>{
      console.log('inside i think',msg)
      Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'close'
      })
    }
  }
  usersModule={
    manualLoadCurrentUser:(response)=>{

      if (this.route.snapshot.queryParams.returnUrl) {
        this.router.navigate([this.route.snapshot.queryParams.returnUrl]) // // redirect to returnUrl
      } else if (this.router.url.includes('/auth')) {
        this.router.navigate(['/']) // redirect to root route on auth pages
      }
      this.store.dispatch( new UserActions.LoadCurrentAccountSuccessful(response))

    },
    navigate:(url)=>{
      this.router.navigate([url])
    }
  }
  queries={
    createUser:(data) : string=>{
      let x= `
      mutation{
  createUser(input:{
    data:{
      password:"${data.password}",
      username:"${data.username}",
      email:"${data.email}",
      displayName:"${data.displayName}",
      optin:${data.optin}
    }
  }){
    user{
      id
    }
  }
}
      `
      return x;

    },
    loginUser:(data): string=>{
      let x = `
      mutation{
  login(input:{
    password:"${data.password}",
    identifier:"${data.identifier}",
    provider:"local"
  }){
    jwt
    user{
      email
      username
    }
  }
}
      `
      return x;
    },
    //TODO: work on upload of images
    updateProfile:(data): string=>{
      let x = `
   mutation{
  updateProfile(input:{
    where:{id:""}
    data:{
      dislayName:"${data.displayName}"
      location:"${data.location}"
      about:"${data.about}"
    }
  }){
    profile{
      id
      dislayName
      location
      about
    }
  }
}
      `
      return x;
    },
    getProfile:(): string=>{
      let x = `
query{
  profiles(where:{user:"${this.user.id}"}){
    dislayName
    id
    location
    about
  }
}
      `
      return x;
    },
    getPlans:(): string=>{
      let x = `
query{
  plans(sort:"amount"){
    id
    name
    amount
    desc
    period
    label
  }
}
      `
      return x;
    },
    getTopics:(): string=>{
      let x = `
query{
    topics{
        name
        id
        subject{
            name
            id
        }
    }
}
      `
      return x;
    },
    getQuestionDetails:({ id }): string=>{
      let x = `
query {
    question(
        id:"${id}"
    ){
        id
        title
        slug
        body
        comments{
        id
        commentor{
                displayName
            }
        comment
        image{
        url
        }
        }
         images{
            id
            url
            previewUrl
        }
        askedby{
            displayName
        }
        createdAt
        topic{
            subject{
                name
                grade
                id
            }
            name
            id
        }
    }
}`
      return x;
    },
    getPaginatedQuestions:({limit,start}): string=>{
      let x = `
  query {
    questions(
        limit:${limit}
        start:${start}
        sort:"createdAt:desc"
    ){
        id
        title
        body
        slug
        askedby{
            displayName
        }
        createdAt
        topic{
            subject{
                name
                grade
                id
            }
            name
            id
        }
    }
}
      `
      return x;
    },
    createQuestion:({body,title,topic,askedby}): string=>{
      let x = `
      mutation {
    createQuestion(
        input:
        {data: {body: "'${body}'",
        askedby:"${askedby}",
        title: "${title}",topic: "${topic}",}}
    ){
      question{
          id
      }
    }
}
      `
      return x;
    },
    createComment:({comment,commentor,question}): string=>{
      let x = `
     mutation {
    createComment(
        input: {data: {
            question: "${question}"
            commentor: "${commentor}"
            comment: "${comment}"
        }}
    ){
        comment{
            id
        }
    }
}
      `
      return x;
    },
    createAnswer:({body,user,question}): string=>{
      let x = `
      mutation {
    createAnswer( input: {data: {
        question:"${question}"
        body: "${body}"
        user  :"${user}"
    }}
    ){
        answer{
            id
        }
    }
}
      `
      return x;
    },
    countQuestions:(): string=>{
      let x = `
query {
    questionsConnection{
        aggregate{
            count
        }
    }
}
      `
      return x;
    },
  }
  constants={
    register_user_success:'User successfully registered ',
    questioon_asked_success:'Question successfully asked, answer will soon be available',
    login_user_success:'Successfully logged in ',
    profile_Createduser_success:'Successfully Created profile',
    register_user_failed:'User registration failed ',
    login_user_failed:'Login failed.',
    profile_Createduser_failed:'profile Creation failed.',
    User_profile_retrieval_failed:'"User profile retrieval failed"',
    session_expired: "Session has expired, kindly login",
    comment_success: "Comment has been posted successfully",
    answer_success: "Answer has been submitted for Approval",

  }
  purchasePlan(x){
    this.loadScreen();
    let rd = Math.floor(Math.random()*100000);
    //@ts-ignore
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-e1318d5dca8ee3c2128a34be9a7e2dd4-X",
      tx_ref: "inv-"+rd,
      amount: x.amount,
      currency: "ZMW",
      country: "ZM",
      payment_options: " ",
      redirect_url: // specified redirect URL
        URRL+"/payment-made-well",
      customer: {
        id:this.user.id,
        email: this.user.email,
        phone_number: "",
        name: this.profile.displayName,
        plan:x.id
      },
      callback: function (data) {
        console.log(data);
      },
      onclose: function() {
        // close modal
      },
      customizations: {
        title: "Tadya",
        description: "kindly complete the payment process to continue",
        logo: "https://assets.piedpiper.com/logo.png",
      },
    });
    this.stopLoadScreen()
  }
  evaluateError(err){
    if(err[0].message){
      let msg =err[0].message
      switch (msg) {
        case "Invalid token.":{
          this.router.navigate(['/auth/login'])
          msg = this.constants.session_expired
        }
      }
      return msg
    }
    return err
  }
  async graphqlRequests(x) : Promise <{data}> {
    let results = await this.graphql.request(x).toPromise()
      .catch(err => {
        this.notifyUser.error( this.evaluateError(err));
        this.stopLoadScreen()
        return {}
      })
    //@ts-ignore
    let {errors} = results;
    if(errors){
      this.stopLoadScreen()
      this.notifyUser.error( this.evaluateError(errors))
      return {data:{}}
    }
    //@ts-ignore
    return results || {data:{}}
  }
  async uploadFiles(file,ref,refId,field){
    try {
      let form = new FormData();
      form.append('files',file )
      form.append('ref', ref)
      //@ts-ignore
      form.append('refId', refId)
      form.append('field', field)
      let method = "POST";
      let body = form;
      let api = `${URRL}/upload`;
      let res = await this.http.post(api, body).toPromise()
      return res
    }
    catch (e) {
      this.evaluateError(e);
      this.stopLoadScreen()
      return
    }
  }

}
