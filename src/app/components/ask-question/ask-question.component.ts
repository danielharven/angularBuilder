import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { FormControl, FormGroup, Validators } from '@angular/forms'
const URL = environment.url
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  topics: any =[]
  selectTopic: any = ''
  isLoading = true;
  isVisible = false;
  files = [];
  searchChange$ = new BehaviorSubject('');
  createForm : FormGroup
  postedQuestion ={}
  tk:any ={}
  myModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link','image']      ,                   // link and image, video
      ['formula']
    ]
  };
  constructor(public utilities : UtilitiesService,  private http: HttpClient) { }

  ngOnInit(): void {
    // this.getTopics()
    this.createForm = new FormGroup(
      {
        title : new FormControl('',Validators.required),
        topic : new FormControl('',Validators.required),
        body : new FormControl('',Validators.required),
      }
    )
    this.getToken()
  }
  async getToken(){
    this.tk= await this.utilities.getToken();
  }
  updateTopic(topic){
    this.createForm.patchValue({
      topic
    })
  }
  async getTopics() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getRandomNameList = (name: string): Observable<any> =>
      this.http
        .get(`${URL}/topics?name_contains=${name}`)
        .pipe(
          catchError(() => of({ results: [] })),
          map((res: any) => res)
        )
        .pipe(map((list: any) => list?.map((item: any) => item)));
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      // console.log(data)
      this.topics = data;
      this.isLoading = false;
    });
  }
  onSearchTopic(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }
  refreshForm(){
    this.createForm.reset()
    this.getToken()
  }
  async createQuestion() {
    let {tk}=this.tk
    this.utilities.loadScreen()
    let body= {
      ...this.createForm.value,
        askedby:this.utilities.user.id,tk
    }
    let api = '/questions'
    let method ='post'
  let x =  await this.utilities.httpRequest({body,api,method})
    // .graphqlRequests(this.utilities.queries.createQuestion(mdata))
    //@ts-ignore
    // let {data} =x;
  if(x){
    this.postedQuestion = x;
    //upload images
    // TODO:RESTRICT IMAGES ON SERVER
    for(let y of this.files){
      let ref='questions'
      let refId = x.id
      let field = 'images'
      let {file} = y
      let up = await this.utilities.uploadFiles(file,ref,refId,field)
    }

    this.utilities.notifyUser.success(this.utilities.constants.questioon_asked_success)
    this.utilities.stopLoadScreen()
    // this.isVisible=true
  }else{
    this.utilities.stopLoadScreen()
  }
  }
  uploadModule={
    uploadFiles:(item)=>{
      this.files.push(item)
    }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.choosePlan()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  choosePlan() {

    this.utilities.purchaseQuestion(this.postedQuestion)
  }
}
