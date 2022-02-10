import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../../services/utilities.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-view-tutorial-details',
  templateUrl: './view-tutorial-details.component.html',
  styleUrls: ['./view-tutorial-details.component.scss']
})
export class ViewTutorialDetailsComponent implements OnInit {

  quetion_id = ''
  view: any =true
  loadingQuestion=true
  question:any={}
  answer:any={}
  commentForm: FormGroup
  answerForm: FormGroup
  shareUrl = ''
  iOwnTutorial = false
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

  constructor(private route : ActivatedRoute, private utility: UtilitiesService, private titleService: Title,) {
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
    let api = '/blogs/'+id
    let method='get'
    let y = await this.utility.httpRequest({method,api}) ||{}
    // let {data}=y
    this.question=y
    this.loadingQuestion=false
    this.doIownTutorial()
  }

  refresh($event: { status: boolean }) {
    this.question = {}
    this.getQuestionDetails()

  }
  setTitle = () => {
    // this.titleService.setTitle(`${this.logo} | ${this.pageTitle}`)
  }
  doIownTutorial(){
    if(this.utility.user.id==this.question.owner.id){
      this.iOwnTutorial=true;
    }
  }

}
