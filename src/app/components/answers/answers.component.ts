import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../services/utilities.service'
import store from 'store'
import { FormControl, FormGroup } from '@angular/forms'
@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  @Input('question') question:string =''
  isLoading:boolean = true;
  answers:any=[]
  myAnswer=false
  isVisible = false;
  rate=3
  positiveFeedbackForm : FormGroup
  tooltips = ['terrible', 'bad', 'normal', 'good', 'excellent'];

  constructor(private route : ActivatedRoute, private utility: UtilitiesService) { }

  ngOnInit(): void {
    this.getAnswers()
    this.positiveFeedbackForm = new FormGroup({
      comment : new FormControl('')
    })

  }
  async getAnswers(){
    this.answers=[]
    let api = '/questions/answers/'+this.question
    let method = 'get'
    let x = await this.utility.httpRequest({method,api});
    if(x){
      let questions =store.get('questions')
      if(questions?.includes(this.question)) this.myAnswer=true
      this.answers.push(x)
    }
    this.isLoading=false
  }
  showModal(): void {
    this.isVisible = true;
  }

  async handleOk() {
    // console.log('Button ok clicked!')
    let api = '/feedbacks'
    let method = 'post'
    let body ={
      ...this.positiveFeedbackForm.value,
      rating:this.rate,
      answer:this.answers[0].id,
      accept:true
    }
    // console.log(body)
    let x = await this.utility.httpRequest({method,api,body})
    if(x){
      this.utility.notifyUser.success('A Billion Thank you!')
      this.isLoading=true;
    }
    this.isVisible = false;
    this.getAnswers()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
