import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
} from '@angular/core'
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { NzMessageService } from 'ng-zorro-antd/message'
const  myUploadLink =environment.url+'/upload'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnChanges {

  deleteUploadedDocument =environment.url+'/papers/delete/misuploaded'
  uploading = false
  @Output()myUploads:EventEmitter<string> = new EventEmitter<string>();
  @Output()removeUpload:EventEmitter<string> = new EventEmitter<string>();
  fileList: NzUploadFile[] = []
  postUrl = []
  fileKeep=[];
  authenticationHeaders={
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
    }
  }
  private atleastUploadedAFiled: boolean= false
  private uploadIds: any=[]
  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.setupEvents()
  }
  setupEvents() {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    return false
  }

  handleUpload(x): void {
    console.log(myUploadLink)

        let myForm = new FormData()
        // @ts-ignore
        myForm.append('files', x)
        this.http
          .post(myUploadLink, myForm, {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
            },
          })
          .subscribe(
            (myd: any) => {
              if (myd.data) {
                this.postUrl.push(myd.data)
                if (this.postUrl.length == this.fileList.length) {
                  //end upload and move on
                  this.fileList = []
                }
              }
            },
            error => {
              console.log(error)
              //stop upload allow user to re-upload
              //TODO: reupoload the data
            },
          )
    // let editmode = JSON.parse(localStorage.getItem('editActive')||'false');
    // this.postUrl = []
    // // const formData = new FormData();
    // // tslint:disable-next-line:no-any
    // this.uploading = true
    // if (this.fileList.length == 0 && !editmode) {
    //   this.utility.notify.error('Kindly select files to upload.')
    //   return
    // }
    // this.fileList.forEach((file: any) => {
    //   // formData.append('files[]', file);
    //   this.storage.productsModules.uploadFiles({ name: file.name, file })
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {}
  handleChange({ file, fileList,event,type }: NzUploadChangeParam): void {
    // console.log(event)
    // console.log(type)
    const status = file.status;
    if (status !== 'uploading') {
      // console.log(file, fileList);
    }
    if (status === 'done') {
      console.log(file)
      this.myUploads.emit(file.response?.data?._id);
      // this.uploadIds.push(file.response?.data?._id)
      // this.fileKeep.push({
      //   id:file.reponse?.data?._id,
      //   file
      // })
      this.atleastUploadedAFiled = true;
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  downloadModule={
    removeFile :async (file)=>{
      let x = await this.http.post(this.deleteUploadedDocument,{_id:file.response?.data?._id}).subscribe();
      console.log(x);
      this.removeUpload.emit(file.response?.data?._id)
      return true;
    }
  }
  removeFile:(file)=> {
    // this.removeFile(file.response?.data?._id);
    //delete ont the server

    // console.log(this.fileKeep)
    // return false;
  };

  downloadFile() {

  }
}
