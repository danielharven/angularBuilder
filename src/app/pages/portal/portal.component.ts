import { Component, OnInit } from '@angular/core'
// load the cards.json file
const data: any = require('./data.json')
import { Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import { dataService } from '../../services/dataservice'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-dashboard',
  templateUrl: './portal.component.html',
})
export class PortalComponent implements OnInit {

  data = data
  role : string
  displayData = {}

  constructor(private store: Store, private ds: dataService) {
  }
  ngOnInit() {
    this.store.select(Reducers.getUser)
      .pipe(
        switchMap(state => this.ds.getUserCardsFilter(state.role)
        )).subscribe(cards => this.displayData = cards)

  }

  ngOnChange(event) {
    console.log(event)
  }

}
