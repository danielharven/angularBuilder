import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../store/reducers'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
autherised=false
  constructor(private utilities:UtilitiesService, private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.autherised = state.authorized
    })
  }

  ngOnInit(): void {
  }

}
