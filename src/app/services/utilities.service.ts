import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner'
import { HttpClient, HttpParams } from '@angular/common/http'
import ApolloClient from 'apollo-client'
import { GraphQL } from 'ngx-graphql'
import * as UserActions from '../store/user/actions'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../store/reducers'
import Swal from 'sweetalert2'
import * as Sto from 'store'
import { environment } from '../../environments/environment'
const URRL= environment.url;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  authorized: boolean =false
  user :any={}
  studentAccount = false
  teacherAccount=false
  profile :any={}
  configuration:any = {}
  constructor(private loader : NgxSpinnerService,
              public graphql: GraphQL,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<any>,
              public http: HttpClient) {
                this.getConfigurations()
    this.store.pipe(select(Reducers.getUser))
      .subscribe(state => {
      this.authorized = state.authorized
      this.user = state;
      this.studentAccount = false
      this.teacherAccount  =false
      switch(state.role.type){
        case 'teacher':{
          this.teacherAccount = true;
          break
        }
        case 'student':{
          this.studentAccount  =true;
        }
      }
      // console.log(state)
      const accessToken = Sto.get('accessToken')
      let {href}=window.location;
      // if(!accessToken && href.includes('home')){
      //   this.router.navigate(['auth/login'])
      //   return;
      // }
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
      this.stopLoadScreen()
      Swal.fire({
        title: 'Success!',
        text: msg,
        icon: 'success',
        confirmButtonText: 'close'
      })
    },
    info:(msg)=>{
      this.stopLoadScreen()
      Swal.fire({
        title: 'Information!',
        text: msg,
        icon: 'info',
        confirmButtonText: 'OK'
      })
    },
    error:(msg)=>{
      this.stopLoadScreen()
      // console.log('inside i think',msg)
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
    getAnswers:(qid): string=>{
      let x = `query{
    answers(where: {
        question:{
            id:"${qid}"
        }
    }){
        body
        user{
            displayName
        }
        createdAt
        id
        image{
            url
        }
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
    getTutorialDetails:({ id }): string=>{
      let x = `
query {
    blog(
        id:"${id}"
    ){
    comments{
            id
            commentor{
                displayName
            }
            comment
            createdAt
              image{
                url
            }
        }
         id
        title
        body
        slug
        owner{
            displayName
            id
        }
        createdAt
        topic{
            image{
                url
            }
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
    getPaginatedQuestions:({limit,start,answered}): string=>{
      let x = `
  query {
    questions(
        limit:${limit}
        start:${start}
        sort:"createdAt:desc"
        where:{answered:${answered}}
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
    getPaginatedAllQuestions:({limit,start}): string=>{
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
    getPaginatedResQuestions:({limit,start,reserved}): string=>{
      let x = `
  query {
    questions(
        limit:${limit}
        start:${start}
        sort:"createdAt:desc"
        where:{reserved:"${reserved}"}
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
    getPaginatedTutorials:({limit,start}): string=>{
      let x = `
 query {
    blogs(
        limit:${limit}
        start:${start}
        sort:"createdAt:desc"
    ){
        id
        title
        body
        slug
        owner{
            displayName
            id
        }
        createdAt
        topic{
        image{
                url
            }
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
    getSearchTutorials:(search): string=>{
      let x = `
 query {
    blogs(
        sort:"createdAt:desc"
        where:{_or:[{ title_contains:"${search}"},{topic:{name_contains:"${search}"}}]
        }
    ){
        id
        title
        slug
        owner{
            displayName
            id
        }
        createdAt
        topic{
        image{
                url
            }
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
    getRelatedTutorials:(topic): string=>{
      let x = `
 query {
    blogs(
        sort:"createdAt:desc"
        limit:10
        where:{topic:"${topic}"}
    ){
        id
        title
        slug
        owner{
            displayName
            id
        }
        createdAt
        topic{
        image{
                url
            }
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
    createBlog:({body,title,topic,owner}): string=>{
      let x = `
      mutation {
    createBlog(
        input:
        {data: {
            body: "${body}",
            owner: "${owner}"
            title: "${title}",
            topic: "${topic}",}}
    ){
        blog{
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
    createTutorialComment:({comment,commentor,question}): string=>{
      let x = `
     mutation {
    createComment(
        input: {data: {
            blog: "${question}"
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
    countAnsweredQuestions:(): string=>{
      let x = `
query {
    questionsConnection(where:{answered:true}){
        aggregate{
            count
        }
    }
}
      `
      return x;
    },
    countUnAnsweredQuestions:(): string=>{
      let x = `
query {
    questionsConnection(where:{answered:false}){
        aggregate{
            count
        }
    }
}
      `
      return x;
    },
    countResAnsweredQuestions:(): string=>{
      let x = `
query {
    questionsConnection(where:{reserved:true}){
        aggregate{
            count
        }
    }
}
      `
      return x;
    },
    countTutorials:(): string=>{
      let x = `
query {
   blogsConnection{
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
    tutorial_created_success:'Tutorial has been created successfully',
    tutorial_update_success:'Tutorial has been updated successfully',
    login_user_success:'Successfully logged in ',
    profile_Createduser_success:'Successfully Created profile',
    register_user_failed:'User registration failed ',
    login_user_failed:'Login failed.',
    profile_Createduser_failed:'profile Creation failed.',
    profile_Update_user_failed:'profile update failed.',
    profile_Update_user_succeed:'profile update succeeded.',
    User_profile_retrieval_failed:'"User profile retrieval failed"',
    session_expired: "Session has expired, kindly login",
    comment_success: "Comment has been posted successfully",
    uploadin_imaged: "Uploading attached images",
    answer_success: "Answer has been submitted for Approval",

  }
  purchasePlan(x){
let user = this.user;
let profile= this.profile

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
        URRL+"/payment/paln",
      customer: {
        id:user.id,
        email: user.email,
        phone_number: "",
        name: profile.displayName,
        plan:x.id
      },
      callback: function (data) {
        console.log(data);
      },
      onclose: function() {
        // close modal
        console.log('closed');

      },
      customizations: {
        title: "Tadya",
        description: "kindly complete the payment process to continue",
        logo: "https://assets.piedpiper.com/logo.png",
      },
    });
    this.stopLoadScreen()
  }
  purchaseQuestion(x){
    // console.log(this.configuration.questionpayment)
    x.amount =this.configuration.questionpayment
   let user = this.user
   let profile = this.profile
    this.loadScreen();
    let rd = Date.now();
    //@ts-ignore
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-e1318d5dca8ee3c2128a34be9a7e2dd4-X",
      tx_ref: "inv-"+rd,
      amount:x.amount,
      currency: "ZMW",
      country: "ZM",
      payment_options: " ",
      redirect_url: // specified redirect URL
        URRL+"/payment/question",
      customer: {
        id:user.id,
        email: user.email,
        phone_number: "",
        name: profile.displayName,
        question:x.id
      },
      callback: function (data) {
        console.log(data);
      },
      onclose: function() {
        // close modal
        console.log('closed');
        console.log(this)
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
  async httpRequest({ api,method,body={} }) : Promise <any> {
    api = environment.url+api
    switch (method) {
      case 'get':{
        let results = await this.http.get(api).toPromise()
          .catch(err => {
            this.notifyUser.error( this.evaluateError(err));
            this.stopLoadScreen()
            return {}
          })
        //@ts-ignore
        let {error} = results;
        if(error){
          this.stopLoadScreen()
          this.notifyUser.error( this.evaluateError(error))
          return {}
        }
        //@ts-ignore
        return results || {}
        break
      }
      case 'post':{
        let results = await this.http.post(api,body).toPromise()
          .catch(err => {
            console.log(err)
            this.notifyUser.error( this.evaluateError(err));
            this.stopLoadScreen()
            return {}
          })
        //@ts-ignore
        let {error} = results;
        if(error){
          this.stopLoadScreen()
          this.notifyUser.error( this.evaluateError(error))
          return {}
        }
        //@ts-ignore
        return results || {}
        break
      }
       case 'put':{
        let results = await this.http.put(api,body).toPromise()
          .catch(err => {
            this.notifyUser.error( this.evaluateError(err));
            this.stopLoadScreen()
            return {}
          })
        //@ts-ignore
        let {error} = results;
        if(error){
          this.stopLoadScreen()
          this.notifyUser.error( this.evaluateError(error))
          return {}
        }
        //@ts-ignore
        return results || {}
        break
      }

    }

  }
  async httpPaginatedRequest({ limit,start,api,body={},method='' }) : Promise <any> {
    api = environment.url+api
    start = (start-1)*limit
    let params = new HttpParams()
      .append('_start', `${start}`)
      .append('_limit', `${limit}`)
      .append('_sort', `createdAt:desc`)
    let results = await this.http.get(api,{params}).toPromise()
      .catch(err => {
        this.notifyUser.error( this.evaluateError(err));
        this.stopLoadScreen()
        return {}
      })
    //@ts-ignore
    let {error} = results;
    if(error){
      this.stopLoadScreen()
      this.notifyUser.error( this.evaluateError(error))
      return {}
    }
    //@ts-ignore
    return results || {}
    // switch (method) {
    //   case 'get':{
    //
    //     break
    //   }
    //   case 'post':{
    //     let results = await this.http.post(api,body).toPromise()
    //       .catch(err => {
    //         this.notifyUser.error( this.evaluateError(err));
    //         this.stopLoadScreen()
    //         return {}
    //       })
    //     //@ts-ignore
    //     let {error} = results;
    //     if(error){
    //       this.stopLoadScreen()
    //       this.notifyUser.error( this.evaluateError(error))
    //       return {}
    //     }
    //     //@ts-ignore
    //     return results || {}
    //     break
    //   }
    //
    // }

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
  async getConfigurations(){
    let api  = '/configurations';
    let method = 'get'
    let x  =await this.httpRequest({api,method})
    if(x){
      console.log(x);

      this.configuration = x
    }
  }

}
