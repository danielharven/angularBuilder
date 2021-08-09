import { Component, OnInit } from '@angular/core'
// load the cards.json file
const data: any = require('./data.json')
import { Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'


@Component({
  selector: 'app-dashboard',
  templateUrl: './portal.component.html',
})
export class PortalComponent implements OnInit {

  data = data
  role : string
  displayData = {}
  
  constructor(private store: Store) {
    this.store.select(Reducers.getUser)
      .subscribe(state => {
        this.role = state.role
        this.displayData = this.data[this.role]
      })

  }
  ngOnInit() {

  }
  
  ngOnChange(event) {
    console.log(event)
  }

}
