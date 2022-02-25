import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../store/reducers'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
const URL = environment.url
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
autherised=false
  isLoading = true;
current = 0
  constructor(public utilities:UtilitiesService,
              private http: HttpClient,
              private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.autherised = state.authorized
    })
  }

  ngOnInit(): void {
  }

}
