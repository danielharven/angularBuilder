import { Component, Input, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { UtilitiesService } from '../../services/utilities.service'
import { HttpClient } from '@angular/common/http'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
const URL = environment.url
@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  @Input('view') view : string ='all'
    totalQuestions: number =0
  selectTopic: any = ''
  isLoading = true;

  questions: []=[]

  limit: any = 20
  page = 1
  listNumber = 0
  listLimit = 0
  api='/questions'

  paginations = 0
  state$: Observable<object>;
  setView: boolean = false
  constructor(private utilities:UtilitiesService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,) {


  }

  ngOnInit(): void {
    this.setView=false;
    let status = this.activatedRoute.snapshot.data?.status;
    // console.log(status)
    if(status?.includes('unaswered')){
    this.view='no'
    this.setView=true;
    }
    if(!this.setView){
      this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.state$.subscribe(data=>{
      //@ts-ignore
      if(data?.value) this.view=data?.value
    })
    }
    // this.getSubjects()
    // this.getNewPaginatedQuestions()
  }

  async getQuestions(){
    switch (this.view) {
      case 'yes':{
        let x = await this.utilities.graphqlRequests(this.utilities.queries.countAnsweredQuestions())
        let {data}=x;
        this.totalQuestions= data?.questionsConnection.aggregate.count || 0
        break;
      }
      case 'no':{
        let x = await this.utilities.graphqlRequests(this.utilities.queries.countUnAnsweredQuestions())
        let {data}=x;
        this.totalQuestions= data?.questionsConnection.aggregate.count || 0
        break;
      }
      case 'res':{
        let x = await this.utilities.graphqlRequests(this.utilities.queries.countResAnsweredQuestions())
        let {data}=x;
        this.totalQuestions= data?.questionsConnection.aggregate.count || 0
        break;
      }
      default:{
        let x = await this.utilities.graphqlRequests(this.utilities.queries.countQuestions())
        let {data}=x;
        this.totalQuestions= data?.questionsConnection.aggregate.count || 0
        break;
      }
    }
  }
  async getPagnatedQuesitons(answered){
    {
      // let limit = this.limit;
      // let start = 0;
      // let x  = await this.utilities
      //   .graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
      // this.questions = x.data?.questions || []
      // this.isLoading=false
      // if(limit=>x?.data?.questions?.length){
      //   this.listLimit=limit
      // }else {
      //   this.listLimit=x?.data?.questions?.length
      // }
    }
  }
  async getPagnatedReservedQuesitons(reserved){
    {
      let limit = this.limit;
      let start = 0;
      let x  = await this.utilities
        .graphqlRequests(this.utilities.queries.getPaginatedResQuestions({limit,start,reserved}));
      this.questions = x.data?.questions || []
      this.isLoading=false
      if(limit=>x?.data?.questions?.length){
        this.listLimit=x?.data?.questions?.length
      }else {

        this.listLimit=limit
      }
    }
  }


  async indexChange($event: number) {
    // get the data according to the page
    let limit = this.limit;
    this.page = ($event-1)*limit;
    this.getNewPaginatedQuestions()
    // switch (this.view) {
    //   case 'yes':{
    //     let api=this.api+"&answered=true"
    //     let answered = true
    //     let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
    //     this.questions = x.data?.questions || []
    //     break;
    //   }
    //   case 'no':{
    //     let answered = false
    //     let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
    //     this.questions = x.data?.questions || []
    //     break;
    //   }
    //   case 'res':{
    //     let reserved = true
    //     let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedResQuestions({limit,start,reserved}));
    //     this.questions = x.data?.questions || []
    //     break;
    //   }
    //   default:{
    //     let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedAllQuestions({limit,start}));
    //     this.questions = x.data?.questions || []
    //     break;
    //   }
    // }
  }

  private async getAllPagematedQuestions() {
    let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedAllQuestions({limit:this.limit,start:this.page}));
    this.questions = x.data?.questions || []
  }
  async updateQuestions(topik){
    console.log(topik)
    this.api = '/questions?topic='+topik
    this.page=1;
    this.limit =20;
    this.getNewPaginatedQuestions()
    this.totalQuestions= await this.utilities.httpRequest({api:'/questions/count?topic='+topik,method:'get'})
  }
  async getNewPaginatedQuestions(url=''){
    // console.log(url);

    let api = this.api;
    if(url.length>3){
      api=url;
    }
    // let limit = this.limit;
    // let start = this.page
    switch (this.view) {
      case 'yes':{
        // let api=this.api+"&answered=true"
        // let answered = true
        api=api+"&answered=true"
        // let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
        // this.questions = x.data?.questions || []
        break;
      }
      case 'no':{
        // let answered = false
        api=api+"&answered=false"
        // let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
        // this.questions = x.data?.questions || []
        break;
      }
      case 'res':{
        api=api+"&reserved=true"
        // let reserved = true
        // let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedResQuestions({limit,start,reserved}));
        // this.questions = x.data?.questions || []
        break;
      }
      default:{
        // let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedAllQuestions({limit,start}));
        // this.questions = x.data?.questions || []
        break;
      }
    }
    let method ='get'
   let x = await this.utilities.httpRequest({method,api})
   this.isLoading=false
   if(x){
this.questions=x;
   }
  }
}
