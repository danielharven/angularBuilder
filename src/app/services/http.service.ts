import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {environment} from "../../environments/environment";
import {stringify} from 'qs'

const API = environment.url;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private msg: NzNotificationService) { }

 async  makeCall({method,data={
   id: ""
 },api}){
    let myApi = API+api
   method = method.toString().toLocaleLowerCase();
    switch (method) {
      case "get":{
        let token = localStorage.getItem('token')
        let resp = null;
        if(token){
          let headers = {
            Authorization:'Bearer '+token
          }
          resp = await this.http.get(myApi,{headers}).toPromise()
        }else{
          resp = await this.http.get(myApi).toPromise()
        }
        if(!resp) {
          this.handleCallError(resp)
        }
        return resp
        break
      }
      case "put":{
        myApi = myApi+"/"+data.id;
        let token = localStorage.getItem('token')
        let resp = null;
        if(token){
          let headers = {
            Authorization:'Bearer '+token
          }
          resp = await this.http.put(myApi,data,{headers}).toPromise()
        }else{
          resp = await this.http.put(myApi,data).toPromise()
        }
        if(!resp) {
          this.handleCallError(resp)
          return false;
        }
        return resp
        break
      }
      case "delete":{
        myApi = myApi+"/"+data.id;
        let token = localStorage.getItem('token')
        let resp = null;
        if(token){
          let headers = {
            Authorization:'Bearer '+token
          }
          resp = await this.http.delete(myApi,{headers}).toPromise()
        }else{
          resp = await this.http.delete(myApi).toPromise()
        }
        if(!resp) {
          this.handleCallError(resp)
          return false;
        }
        return resp
        break
      }
      case "post":{
        let token = localStorage.getItem('token')
        let resp = null;
        if(token){
          let headers = {
            Authorization:'Bearer '+token
          }
          resp = await this.http.post(myApi,data,{headers}).toPromise()
        }else{
          resp = await this.http.post(myApi,data).toPromise()
        }
        if(!resp) {
          this.handleCallError(resp)
          return false;
        }
        return resp
        break
      }
    }
  }
  async handleCallError(resp: any){
    console.log(resp)
  }

  paginationService({api,page,limit,sortBy=undefined,sortOrder="DESC",searchTerm=[],search=''}){

    let seek ={}
    for(let ss of searchTerm){
      seek[`${ss}_contains`]=search
    }
    const seekArray = Object.entries(seek).map(item=>({[item[0]]:item[1]}))
    if(!sortBy) sortBy=searchTerm[0]
    let apiString = stringify({
      _start:page,
      _limit:limit,
      _where:{
        _or:seekArray
    }
    })
    if(api.includes('?')){
      api=api+"&"+apiString;
    }else {
      api=api+"?"+apiString;
    }
    return api;
  }
  showCustomerMsg={
    success:msg=>{
      this.msg.success("ZedSMS",msg,{nzDuration:0})
    },
    error:msg=>{
      this.msg.error("ZedSMS OOPS!",msg,{nzDuration:0})
    },
    info:msg=>{
      this.msg.info("ZedSMS",msg,{nzDuration:0})
    },
  }
  showLoading(){

  }
  stopLoadScreen(){}

  async getTk(){
    return await this.makeCall({method:'get',api:'/formtokens/mine'})
  }
}
