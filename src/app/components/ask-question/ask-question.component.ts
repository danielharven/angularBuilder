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
  constructor(public utilities : UtilitiesService,  private http: HttpClient) { }

  ngOnInit(): void {
    this.getTopics()
    this.createForm = new FormGroup(
      {
        title : new FormControl('',Validators.required),
        topic : new FormControl('',Validators.required),
        body : new FormControl('',Validators.required),
      }
    )
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

  async createQuestion() {
    this.utilities.loadScreen()
    let mdata= {
      ...this.createForm.value,
        askedby:this.utilities.user.id
    }
  let x =  await this.utilities
    .graphqlRequests(this.utilities.queries.createQuestion(mdata))
    //@ts-ignore
    let {data} =x;
  if(data?.createQuestion.question){
    this.postedQuestion = data?.createQuestion.question;
    //upload images
    // console.log(this.files)
    for(let x of this.files){
      let ref='questions'
      let refId = data?.createQuestion.question.id
      let field = 'images'
      let {file} = x
      let up = await this.utilities.uploadFiles(file,ref,refId,field)
    }

    // this.utilities.notifyUser.success(this.utilities.constants.questioon_asked_success)
    this.utilities.stopLoadScreen()
    this.isVisible=true
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
