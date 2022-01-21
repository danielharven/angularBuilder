import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  @Input('qid')qid :string = ''
  answerForm: FormGroup
  myUploadFilesAnswers: any=[]
  myModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      // [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link']                         // link and image, video
    ]
  };
  answerImages: any =[]
  constructor(private route : ActivatedRoute, private utility: UtilitiesService) { }

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      body: new FormControl('',Validators.required)
    })
  }
  uploadModule={
    uploadFilesAnswer: (item)=>{
      this.answerImages.push(item)
    },
  }
  reset(){
    this.answerImages = []
    this.myUploadFilesAnswers = []
    this.answerForm.patchValue({
      body:''
    })
  }
  async createAnswer() {
    this.utility.loadScreen()
    let {body}  =this.answerForm.value;
    let user = this.utility.user.id
    let question = this.qid
    let api ='/answers'
    let method='post'
    let y = await this.utility.httpRequest({api,method,body:{body,user,question}}).catch(err=>{
      this.utility.stopLoadScreen()
      this.utility.notifyUser.error( this.utility.evaluateError(err));
      return
    })
      // this.utility.graphqlRequests(this.utility.queries.createAnswer({body,user,question}))
    let {id}= y
    for (let x of this.answerImages){
      let field = 'image'
      let ref = 'answers'
      let refId = id
      let {file} = x
      await this.utility.uploadFiles(file,ref,refId,field)
    }
    this.utility.notifyUser.success(this.utility.constants.answer_success)
    this.utility.stopLoadScreen()
    this.reset()

  }

}
