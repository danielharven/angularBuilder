import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { UtilitiesService } from '../../services/utilities.service'
import { HttpClient } from '@angular/common/http'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
const URL = environment.url
@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
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

  constructor(private utilities:UtilitiesService,
              private http: HttpClient,) {  }

  ngOnInit(): void {
    this.getTopics()
    this.getQuestions()
  }
  async getQuestions(){
    let x = await this.utilities.graphqlRequests(this.utilities.queries.countQuestions())
    let {data}=x;
    this.totalQuestions= data?.questionsConnection.aggregate.count || 0

    {
      let limit = this.limit;
      let start = 0;
      let x  = await this.utilities
        .graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start}));
      this.questions = x.data?.questions || []
    }
  }
  getPagnatedQuesitons(){

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
    let start = $event;
    let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedQuestions({limit,start}));
    this.questions = x.data?.questions || []
  }
}
