import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class SelectdropdownService {
  randomUserUrl = URL;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;


  constructor(private http: HttpClient) { }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }
  init(api){
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getRandomNameList = (name: string): Observable<any> =>
      this.http
        .get(`${URL}${api}`)
        .pipe(
          catchError(() => of({ results: [] })),
          map((res: any) => res.results)
        )
        .pipe(map((list: any) => list.map((item: any) => `${item.name.first} ${name}`)));
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
