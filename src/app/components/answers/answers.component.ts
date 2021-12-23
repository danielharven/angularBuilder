import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  @Input('question') question:string =''
  isLoading:boolean = true;
  answers:any=[]
  constructor(private route : ActivatedRoute, private utility: UtilitiesService) { }

  ngOnInit(): void {
    this.getAnswers()
  }
  async getAnswers(){
    let {data} = await this.utility.graphqlRequests(this.utility.queries.getAnswers(this.question))
    //@ts-ignore
    this.answers = data?.answers
    this.isLoading=false
  }

}
