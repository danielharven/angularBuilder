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

 async  makeCall({method,data={},api}){
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

        break
      }
    }
  }
  async handleCallError(resp: any){
    console.log(resp)
  }

  paginationService({api,page,limit,sortBy=undefined,sortOrder="DESC",searchTerm,search=''}){
    let seeke =`{
    "${searchTerm}_contains":"${search}"
    }`
    if(!sortBy) sortBy=searchTerm
    let seek = JSON.parse(seeke);
    let apiString = stringify({
      _start:page,
      _limit:limit,
      _where:[{...seek}]
    })
    if(api.includes('?')){
      api=api+"&"+apiString;
    }else {
      api=api+"?"+apiString;
    }
    return api;
  }
}
