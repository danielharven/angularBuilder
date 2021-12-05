import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../store/reducers'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user :any={}
  plans=[]
  profile={
    about: undefined
  }
  constructor(private store: Store<any>,private  utilities: UtilitiesService) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.user=state
      this.utilities.stopLoadScreen()

    })
  }

  ngOnInit(): void {
    this.getPlans()
    this.profile=this.utilities.profile;
  }
  getPlans(){
    // let x = ;
    this.utilities.graphql.request(this.utilities.queries.getPlans())
      .subscribe(({ data, errors }) => {
        if (errors) {
          this.utilities.notifyUser.error(errors[0].message)
          return
        }
        if (data) {
          // work on data
          this.plans=data.plans;
        }
      }, error => {
        this.utilities.notifyUser.error(this.utilities.evaluateError(error))
      })
    //   .subscribe(({data,errors})=>{
    //   if(errors){
    //     //needs retry
    //     // this.getPlans();
    //     console.log(errors)
    //     return;
    //   }
    //   this.plans=data.plans;
    // })
  }

  choosePlan(x: any) {
    this.utilities.purchasePlan(x)
  }
}
