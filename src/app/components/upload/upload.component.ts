import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { NzMessageService } from 'ng-zorro-antd/message'
import store from 'store'
const url = environment.url + '/uploaded-documents'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnChanges {
  myUploadLink = environment.url + '/papers/docs/upload'
  deleteUploadedDocument = environment.url + '/papers/delete/misuploaded'
  params = {}
  uploading = false
  @Output() myUploads: EventEmitter<string> = new EventEmitter<string>()
  @Output() removeUpload: EventEmitter<string> = new EventEmitter<string>()
  fileList: NzUploadFile[] = []
  postUrl = []
  fileKeep = []
  private atleastUploadedAFiled: boolean = false
  private uploadIds: any = []
  constructor(
    private http: HttpClient,
    private ref: ChangeDetectorRef,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.setupEvents()
    const accessToken = store.get('accessToken')
    this.params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // AccessToken: accessToken,
      },
    }
  }
  setupEvents() {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    return false
  }

  handleUpload(): void {
    console.log(this.fileList)

    console.log('move forward')
    //sort
    for (let x of this.fileList) {
      let myForm = new FormData()
      // @ts-ignore
      myForm.append('file', x)
      this.http.post(url, myForm).subscribe(
        async (myd: any) => {
          if (myd.data) {
            let { data } = myd
            let dd = {
              name: data.filename,
              documentId: data._id,
            }
            await this.http.post(environment.url + '/pmecfiles', dd).toPromise()

            // this.postUrl.push(myd.data)
            // if (this.postUrl.length == this.fileList.length) {
            //   //end upload and move on
            //   this.fileList = []
            // }
          }
        },
        error => {
          //stop upload allow user to re-upload
          //TODO: reupoload the data
        },
      )
    }
    // {
    //   headers: {
    //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
    //   },
    // }

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
  handleChange({ file, fileList, event, type }: NzUploadChangeParam): void {
    // console.log(event)
    // console.log(type)
    const status = file.status
    if (status !== 'uploading') {
      // console.log(file, fileList);
    }
    if (status === 'done') {
      // console.log(file.response)
      let { data } = file.response
      let dd = {
        name: data.filename,
        documentId: data._id,
      }
      this.http.post(environment.url + '/pmecfiles', dd).toPromise()

      this.atleastUploadedAFiled = true
      this.msg.success(`${file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`)
    }
  }

  downloadModule = {
    removeFile: async file => {
      let x = await this.http
        .post(this.deleteUploadedDocument, { _id: file.response?.data?._id })
        .subscribe()
      console.log(x)
      this.removeUpload.emit(file.response?.data?._id)
      return true
    },
  }
  removeFile: (
    file,
  ) => {
    // this.removeFile(file.response?.data?._id);
    //delete ont the server
    // console.log(this.fileKeep)
    // return false;
  }

  downloadFile() {}
}
