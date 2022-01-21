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
  topics: any =[]
  selectTopic: any = ''
  isLoading = true;
  searchChange$ = new BehaviorSubject('');
  questions: []=[]

  limit: any = 20
  page = 0
  listNumber = 0
  listLimit = 0

  paginations = 0
  state$: Observable<object>;
  constructor(private utilities:UtilitiesService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,) {

  }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.state$.subscribe(data=>{
      //@ts-ignore
      if(data?.value) this.view=data?.value
      switch (this.view) {
        case 'yes':{
          this.getPagnatedQuesitons(true);
          break;
        }
        case 'no':{
          this.getPagnatedQuesitons(false);
          break;
        }
        case 'res':{
          this.getPagnatedReservedQuesitons(true);
          break;
        }
        default:{
          this.getAllPagematedQuestions()
          break;
        }
      }
      this.getTopics()
      this.getQuestions()
    })

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
      let limit = this.limit;
      let start = 0;
      let x  = await this.utilities
        .graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
      this.questions = x.data?.questions || []
      if(limit=>x?.data?.questions?.length){
        this.listLimit=limit
      }else {
        this.listLimit=x?.data?.questions?.length
      }
    }
  }
  async getPagnatedReservedQuesitons(reserved){
    {
      let limit = this.limit;
      let start = 0;
      let x  = await this.utilities
        .graphqlRequests(this.utilities.queries.getPaginatedResQuestions({limit,start,reserved}));
      this.questions = x.data?.questions || []
      if(limit=>x?.data?.questions?.length){
        this.listLimit=x?.data?.questions?.length
      }else {

        this.listLimit=limit
      }
    }
  }
  async getTopics() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getRandomNameList = (name: string): Observable<any> =>
      this.http
        .get(`${URL}/topics?name_contains=${name}`)
        .pipe(
          catchError(() => of({ results: [] })),
          map((res: any) => res)
        )
        .pipe(map((list: any) => list?.map((item: any) => item)));
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      // console.log(data)
      this.topics = data;
      this.isLoading = false;
    });
  }
  onSearchTopic(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  async indexChange($event: number) {
    // get the data according to the page
    let limit = this.limit;
    let start = ($event-1)*limit;

    switch (this.view) {
      case 'yes':{
        let answered = true
        let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
        this.questions = x.data?.questions || []
        break;
      }
      case 'no':{
        let answered = false
        let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start,answered}));
        this.questions = x.data?.questions || []
        break;
      }
      case 'res':{
        let reserved = true
        let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedResQuestions({limit,start,reserved}));
        this.questions = x.data?.questions || []
        break;
      }
      default:{
        let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedAllQuestions({limit,start}));
        this.questions = x.data?.questions || []
        break;
      }
    }
  }

  private async getAllPagematedQuestions() {
    let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedAllQuestions({limit:this.limit,start:this.page}));
    this.questions = x.data?.questions || []
  }
}
