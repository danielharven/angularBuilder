import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-view-tutorial-details',
  templateUrl: './view-tutorial-details.component.html',
  styleUrls: ['./view-tutorial-details.component.scss']
})
export class ViewTutorialDetailsComponent implements OnInit {
  quetion_id = ''
  loadingQuestion=true
  question:any={}
  answer:any={}
  commentForm: FormGroup
  answerForm: FormGroup
  shareUrl = ''
  myUploadFilesComments: any=[]


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
  }

  async getQuestionDetails(){
    let id =this.quetion_id
    let y = await this.utility.graphqlRequests(this.utility.queries.getTutorialDetails({id}))
    let {data}=y
    this.question=data?.blog
    this.loadingQuestion=false
  }

  refresh($event: { status: boolean }) {
    this.question = {}
    this.getQuestionDetails()

  }
}
