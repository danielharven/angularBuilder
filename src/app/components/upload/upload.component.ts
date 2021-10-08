import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { NzUploadFile } from 'ng-zorro-antd/upload'
import { EventsService } from '../../services/events.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
const url = environment.url + '/uploaded-documents'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnChanges {
  uploading = false

  fileList: NzUploadFile[] = []
  postUrl = []
  constructor(
    private evt: EventsService,
    private http: HttpClient,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.setupEvents()
  }
  setupEvents() {
    this.evt.onPostProduct
      .subscribe(data => {
      if (data.status) {
        this.handleUpload()
      }
    })
    this.evt.onUploaded.subscribe(data => {
      this.postUrl.push(data.downloadUrl)
      if (this.postUrl.length == this.fileList.length) {
        //upload complete pass data to main function
        this.evt.onUploadCompleted.emit({ status: true, downloadUrl: this.postUrl })
      }
    })
    this.evt.onResetForm.subscribe(data => {
      this.fileList = []
    })
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    // console.log(file)
    this.fileList = this.fileList.concat(file)
    return false
  }

  handleUpload(): void {
    if (this.fileList.length > 0 && this.fileList.length % 2 == 0)
    {
      let index=0;
      //sort
      for (let x of this.fileList) {
        this.fileList[index].index = index;
        let myForm = new FormData()
        // @ts-ignore
        myForm.append('file', x)
        this.http
          .post(url, myForm, {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
            },
          })
          .subscribe(
            (myd: any) => {
                index++;
                this.postUrl.push(myd?.data)
                this.evt
                  .onUploadProgress
                  .emit({total:this.fileList.length,
                    nrc:x,downloadUrl:myd.data,
                    current:index,status:true})

            },
            error => {
              index++;
              this.evt
                .onUploadProgress
                .emit({total:this.fileList.length,
                  nrc:x,downloadUrl:{},
                  current:index,status:false})
              if (index == this.fileList.length) {
                console.log(index)
                //end upload and move on
                this.evt.onUploadCompleted.emit({
                  status: true,
                  downloadUrl: this.postUrl,
                  files: this.fileList,
                })
                this.fileList = []
              }
            },
            ()=>{
              if (index == this.fileList.length) {
                this.evt.onUploadCompleted.emit({
                  status: true,
                  downloadUrl: this.postUrl,
                  files: this.fileList,
                })
                this.fileList = []
              }
            }
          )

      }
    }
    else {
      this.evt.onPostProduct.emit({ status: false })
    }
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
}
