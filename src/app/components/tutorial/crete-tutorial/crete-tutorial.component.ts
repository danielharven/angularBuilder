import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilitiesService } from '../../../services/utilities.service'
import { HttpClient } from '@angular/common/http'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
const URL = environment.url
@Component({
  selector: 'app-crete-tutorial',
  templateUrl: './crete-tutorial.component.html',
  styleUrls: ['./crete-tutorial.component.scss']
})
export class CreteTutorialComponent implements OnInit {
  @Input('update') update : boolean = false;
  @Input('question') question:any ={}
  topics: any =[]
  selectTopic: any = ''
  isLoading = true;
  files = [];
  searchChange$ = new BehaviorSubject('');
  createForm : FormGroup
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

      ['link','image']                         // link and image, video
    ]
  };
  constructor(private utilities : UtilitiesService,  private http: HttpClient) { }

  ngOnInit(): void {
    this.getTopics()
    if(!this.update){
      this.createForm = new FormGroup(
        {
          title : new FormControl('',Validators.required),
          topic : new FormControl('',Validators.required),
          body : new FormControl('',Validators.required),
        }
      )
      return
    }
    this.createForm = new FormGroup(
      {
        title : new FormControl(this.question.title,Validators.required),
        topic : new FormControl(this.question.topic,Validators.required),
        body : new FormControl(this.question.body,Validators.required),
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
      ...this.createForm.value
    }

    if(this.update){
      let {id} =this.question
      let x =  await this.utilities.http.put(URL+'/blogs/'+id,mdata).toPromise()
      //@ts-ignore
      if(x?.id){
        this.utilities.notifyUser.success(this.utilities.constants.tutorial_update_success)
        this.utilities.stopLoadScreen()
      }else{
        this.utilities.stopLoadScreen()
      }
      return
    }

    let x =  await this.utilities.http.post(URL+'/blogs',mdata).toPromise()
    //@ts-ignore
    let {id} =x;
    if(id){
      this.utilities.notifyUser.success(this.utilities.constants.tutorial_created_success)
      this.utilities.stopLoadScreen()
    }else{
      this.utilities.stopLoadScreen()
    }
  }
  uploadModule={
    uploadFiles:(item)=>{
      this.files.push(item)
    }
  }

}
