import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  @Input('question') question:string =''
  isLoading:boolean = true;
  answers:any=[]
  constructor() { }

  ngOnInit(): void {

  }
  getAnswers(){

  }

}
