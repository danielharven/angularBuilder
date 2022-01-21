import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { UtilitiesService } from '../../../services/utilities.service'
import qs from 'qs'
@Component({
  selector: 'app-view-my-tutorial-details',
  templateUrl: './view-my-tutorial-details.component.html',
  styleUrls: ['./view-my-tutorial-details.component.scss']
})
export class ViewMyTutorialDetailsComponent implements OnInit {
  topics: any =[]
  selectTopic: any = ''
  isLoading = true;
  searchChange$ = new BehaviorSubject('');
  tutorials: any=[]
  total =0;
  api=''
  limit: any = 20
  page = 0
  listNumber = 0
  listLimit = 0
  constructor(private utility: UtilitiesService) { }

  ngOnInit(): void {
    this.getTutorials();
    this.countMyTutorials()
  }
  async getTutorials(){
        this.api = '/tutorials/mine'
        let method ='get'
        this.tutorials  = await this.utility.httpRequest({api:this.api,method})
  }
  async countMyTutorials(){
    const query= qs.stringify({
      _where:{
        owner:this.utility.user.id
      }
    })
        this.api = '/blogs/count?'+query
        let method ='get'
        this.total  = await this.utility.httpRequest({api:this.api,method})
  }
  async indexChange($event: number) {
    // get the data according to the page
    let limit = this.limit;
    let start = ($event-1)*limit;
    let method='get'
    this.tutorials  = await this.utility.httpPaginatedRequest({limit,start,api:this.api,method})
  }


}
