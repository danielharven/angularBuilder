import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
const URL = environment.url
@Component({
  selector: 'app-content-filters',
  templateUrl: './content-filters.component.html',
  styleUrls: ['./content-filters.component.scss']
})
export class ContentFiltersComponent implements OnInit {
  @Output('topik') topik: EventEmitter<string> = new EventEmitter<string>();
  topics: any =[]
  subjects: any =[]
  selectTopic: any = ''
  selectSubject: any = ''
  isLoading = true;
  isSubjectingLoading = true;
  searchChange$ = new BehaviorSubject('');
  searchSubject$ = new BehaviorSubject('');
  constructor(private utilities:UtilitiesService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,) { }

  ngOnInit(): void {
    this.getSubjects();
  }
  onSearchTopic(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }
  onSearchSubject(value: string): void {
    this.isLoading = true;
    this.searchSubject$.next(value);
  }
  async getSubjects() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getRandomNameList = (name: string): Observable<any> =>
      this.http
        .get(`${URL}/subjects?name_contains=${name}`)
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
      this.subjects = data;
      this.isSubjectingLoading = false;
    });
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
  async updateTopics(info){
    console.log(info)
    if(info){
      let api='/topics/?subject='+info;
      let method='get';
      let x = await this.utilities.httpRequest({api,method})
      // console.log(x);
      if(x){
        this.topics=x
        this.isLoading = false
      }
      return
    }
    this.getTopics()



  }
  async updateTutotrials(info){
    this.topik.emit(info)
  }
}
