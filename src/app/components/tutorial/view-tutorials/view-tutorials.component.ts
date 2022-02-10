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
  topics: any =[]
  selectTopic: any = ''
  isLoading = true;
  searchChange$ = new BehaviorSubject('');
  tutorials: []=[]
  total

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
    let url  = URL+'/blogs'
    let x = await this.utilities.httpRequest({api:'/blogs/count',method:'get'}).catch((e)=>{
    })
    if(x) this.total = x;
    {
      let limit = this.limit;
      let start = 1;
      let api='/blogs'
      let x  = await this.utilities.httpPaginatedRequest({limit,start,api}).catch(e=>{
        this.tutorials = []
        return
      })
      if(x) this.tutorials=x;

      //   .graphqlRequests(this.utilities.queries.getPaginatedTutorials({limit,start}));
      // this.tutorials = x.data?.blogs || []
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
    let start = ($event-1)*limit;
    let x  = await this.utilities.graphqlRequests(this.utilities.queries.getPaginatedTutorials({limit,start}));
    this.tutorials = x.data?.blogs || []
  }
}
