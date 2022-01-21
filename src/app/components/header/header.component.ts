import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../store/reducers'
import * as UserActions from '../../store/user/actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authorized: boolean =false
  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
    })
  }

  ngOnInit(): void {
  }
  signOut(){
    console.log('hello')
    this.store.dispatch(new UserActions.Logout())
  }

}
