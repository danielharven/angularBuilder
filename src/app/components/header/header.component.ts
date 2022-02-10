import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../store/reducers'
import * as UserActions from '../../store/user/actions'
import store from 'store'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authorized: boolean =false
  constructor(private mstore: Store<any>, private router : Router) {
    this.mstore.pipe(select(Reducers.getUser))
    .subscribe(state => {
      this.authorized = state.authorized
    })
  }

  ngOnInit(): void {
  }
  signOut(){
    store.remove('acessToken')
    localStorage.clear()
    this.mstore.dispatch(new UserActions.Logout())
  }

}
