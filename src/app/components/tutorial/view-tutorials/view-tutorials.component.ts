import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { UtilitiesService } from '../../../services/utilities.service'
import { HttpClient } from '@angular/common/http'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
const URL = environment.url
@Component({
  selector: 'app-view-tutorials',
  templateUrl: './view-tutorials.component.html',
  styleUrls: ['./view-tutorials.component.scss']
})
export class ViewTutorialsComponent implements OnInit {

  isLoading = true;
  // searchChange$ = new BehaviorSubject('');
  tutorials: []=[]
  total

  limit: any = 20
  page = 1
  listNumber = 0
  listLimit = 0
  api='/blogs'
  paginations = 0

  constructor(private utilities:UtilitiesService,
              private http: HttpClient,) {  }

  ngOnInit(): void {
    this.getQuestions()
  }
  async updateTutotrials(info){
   if(info){
    let api='/blogs?topic='+info;
    this.api=api;
    let start=1;
    let limit= this.limit
    let x = await this.utilities.httpPaginatedRequest({api,start,limit})
    // console.log(x);
    if(x){
      this.tutorials=x
    }
    return
   }
   this.getQuestions();

  }

  async getQuestions(){

    let url  = URL+'/blogs'
    let x = await this.utilities.httpRequest({api:'/blogs/count',method:'get'}).catch((e)=>{
    })
    if(x) this.total = x;
    {
      let limit = this.limit;
      let start = 1;
      let api='/blogs'
      this.api=api;
      let x  = await this.utilities.httpPaginatedRequest({limit,start,api}).catch(e=>{
        this.tutorials = []
        return
      })
      if(x) this.tutorials=x;

      //   .graphqlRequests(this.utilities.queries.getPaginatedTutorials({limit,start}));
      // this.tutorials = x.data?.blogs || []
    }
  }

  async indexChange($event: number) {
    // get the data according to the page
    let limit = this.limit;
    let start = ($event-1)*limit;
    let api = this.api;
    let x  = await this.utilities.httpPaginatedRequest({limit,start,api}).catch(e=>{
      this.tutorials = []
      return
    })
    if(x) this.tutorials=x;
  }
}
