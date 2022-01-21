import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'
import qs from 'qs'
@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {
@Input('view') view : string = '1'
  constructor(private utility: UtilitiesService) { }
questions = []
  totalQuestions: number = 0
  api = ''
  limit: any = 20
  page = 0
  listNumber = 0
  listLimit = 0

  ngOnInit(): void {
    this.getQuestions();
    this.countQuestions()
  }
  async getQuestions(){
  switch (this.view) {
    case '1':{
      this.api = '/questions/mine'
      let method ='get'
      this.questions  = await this.utility.httpRequest({api:this.api,method})
      break
    }
    case '2':{
      this.api = '/questions/answered/mine'
      let method ='get'
      this.questions  = await this.utility.httpRequest({api:this.api,method})
      break
    }
  }
  }
  async countQuestions(){
  switch (this.view) {
    case '1':{
      const query = qs.stringify({
        _where:{
          askedby:this.utility.user.id
        }
      })
      this.api = '/questions/count?'+query
      let method ='get'
      this.totalQuestions  = await this.utility.httpRequest({api:this.api,method})
      break
    }
    case '2':{
      const query = qs.stringify({
        _where:{
          user:this.utility.user.id
        }
      })
      this.api = '/answers/count?'+query
      let method ='get'
      this.totalQuestions  = await this.utility.httpRequest({api:this.api,method})
      break
    }
  }
  }
  async indexChange($event: number) {
    // get the data according to the page
    let limit = this.limit;
    let start = ($event-1)*limit;
    let method='get'
    this.questions  = await this.utility.httpPaginatedRequest({limit,start,api:this.api,method})
  }


}
