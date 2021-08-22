import { Component, Input, OnInit } from '@angular/core'
import { NzUploadFile } from 'ng-zorro-antd/upload'
import { EventsService } from '../../services/events.service'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uploading = false
  fileList: NzUploadFile[] = []
  postUrl = []
  constructor(private evt: EventsService) {}

  ngOnInit() {
    this.setupEvents()
  }
  setupEvents() {
    this.evt.onPostProduct.subscribe(data => {
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
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    return false
  }

  handleUpload(): void {
    console.log(this.fileList)
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
}
