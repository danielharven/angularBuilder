import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-comments-widget-tutorials',
  templateUrl: './comments-widget-tutorials.component.html',
  styleUrls: ['./comments-widget-tutorials.component.scss']
})
export class CommentsWidgetTutorialsComponent implements OnInit {
  @Input('item') item   :any={}
  @Output('posted') posted : EventEmitter<{ status:boolean }> = new EventEmitter<{status: boolean}>()
  commentForm: FormGroup
  myUploadFilesComments: any=[]
  constructor(private route : ActivatedRoute, private utility: UtilitiesService) { }
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
  tk: any=''

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('',Validators.required)
    })
    this.getToken()
  }
  //TODO: Get comments refresh
  async getToken(){
    this.tk= await this.utility.getToken();
  }
  uploadModule={
    uploadFiles:(item)=>{
      this.commentImages.push(item)
    }
  }
  async createComment() {
    this.utility.loadScreen()
    let api = '/comments'
    let method = 'post'
    let {tk}=this.tk
    let {comment}  =this.commentForm.value;
    let commentor = this.utility.user.id
    let question = this.item?.id
    let body = {
      comment,commentor,question,tk
    }
    let y = await this.utility.httpRequest({method,api,body})
    this.getToken()
    // graphqlRequests(this.utility.queries.createTutorialComment({comment,commentor,question}))
    // let {data}= y

    this.utility.notifyUser.info(this.utility.constants.uploadin_imaged)
    this.utility.stopLoadScreen()
    for (let x of this.commentImages){
      let field = 'image'
      let ref = 'comments'
      let refId = y.id
      let {file} = x
      await this.utility.uploadFiles(file,ref,refId,field)
    }
    this.posted.emit({status:true})
    this.utility.notifyUser.success(this.utility.constants.comment_success)
    this.reset()

  }
  reset(){
    this.commentImages = []
    this.myUploadFilesComments = []
    this.commentForm.patchValue({
      comment:''
    })
  }

}
