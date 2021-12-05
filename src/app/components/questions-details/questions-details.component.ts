import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../services/utilities.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-questions-details',
  templateUrl: './questions-details.component.html',
  styleUrls: ['./questions-details.component.scss']
})
export class QuestionsDetailsComponent implements OnInit {
  quetion_id = ''
  loadingQuestion=true
  question:any={}
  answer:any={}
  commentForm: FormGroup
  answerForm: FormGroup
  shareUrl = ''
  myUploadFilesComments: any=[]
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
   commentImages: any =[]
   answerImages: any =[]
  constructor(private route : ActivatedRoute, private utility: UtilitiesService) {
    this.route.params.subscribe(par=>{
      this.quetion_id=par.id
    })
    this.shareUrl = window.location.href
  }

  ngOnInit(): void {
    this.getQuestionDetails()
    this.setupForms()
  }
 async getQuestionDetails(){
    let id =this.quetion_id
   let y = await this.utility.graphqlRequests(this.utility.queries.getQuestionDetails({id}))
   let {data}=y
   this.question=data?.question
   this.loadingQuestion=false
  }
  setupForms(){
    this.commentForm = new FormGroup({
      comment: new FormControl('',Validators.required)
    })
    this.answerForm = new FormGroup({
      body: new FormControl('',Validators.required)
    })
  }

  async createComment() {
    this.utility.loadScreen()
    let {comment}  =this.commentForm.value;
    let commentor = this.utility.user.id
    let question = this.quetion_id
    let y = await this.utility.graphqlRequests(this.utility.queries.createComment({comment,commentor,question}))
    let {data}= y
    for (let x of this.commentImages){
      let field = 'image'
      let ref = 'comments'
      let refId = data?.createComment?.comment?.id
      let {file} = x
      await this.utility.uploadFiles(file,ref,refId,field)
    }
    this.utility.notifyUser.success(this.utility.constants.comment_success)
    this.utility.stopLoadScreen()
    this.reset()

  }
  async createAnswer() {
    this.utility.loadScreen()
    let {body}  =this.answerForm.value;
    let user = this.utility.user.id
    let question = this.quetion_id
    let y = await this.utility.graphqlRequests(this.utility.queries.createAnswer({body,user,question}))
    let {data}= y
    for (let x of this.answerImages){
      let field = 'image'
      let ref = 'answers'
      let refId = data?.createAnswer?.answer?.id
      let {file} = x
      await this.utility.uploadFiles(file,ref,refId,field)
    }
    this.utility.notifyUser.success(this.utility.constants.answer_success)
    this.utility.stopLoadScreen()
    this.reset()

  }
  uploadModule={
    uploadFilesAnswer: (item)=>{
      this.answerImages.push(item)
    },
    uploadFiles:(item)=>{
      this.commentImages.push(item)
    }
  }


  reset(){
    this.commentImages = []
    this.answerImages = []
    this.myUploadFilesComments = []
    this.myUploadFilesAnswers = []
    this.getQuestionDetails()
    this.commentForm.patchValue({
      comment:''
    })
    this.answerForm.patchValue({
      body:''
    })
  }

}
