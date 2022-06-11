import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import {environment} from "../../../../environments/environment";
const api = environment.url
@Component({
  selector: 'app-uploader',
  template: `
    <nz-upload nzType="drag"
    name='files'
    [nzMultiple]="multiple"
     [nzLimit]="limit"
      [nzSize]="fileSize"
      [nzName]="'files'"
               [nzFileType]="fileTypes"
               (nzChange)="handleChange($event)"
               [nzHeaders]="headers"
               [nzAction]="uploadApi">
      <p class="ant-upload-drag-icon">
        <i nz-icon nzType="inbox"></i>
      </p>
      <p class="ant-upload-text">Click or Drag to Upload</p>
      <p class="ant-upload-hint">
      {{hint}}
      </p>
    </nz-upload>
  `,
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Input('hint') hint='';
  @Input('multiple') multiple=false;
  @Input('limit') limit=1;
  @Input('fileTypes') fileTypes="";
  @Input('fileSize') fileSize=10000;
  @Output('onUploaded') onUploaded: EventEmitter<any> = new EventEmitter();
  headers={
  Authorization:"Bearer "+localStorage.getItem('accessToken').replace(/"/g, "")
  }
  uploadApi = api+'/upload'
  constructor(private http: HttpService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log(this.uploadApi)
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.http.showCustomerMsg.success(`${info.file.name} file uploaded successfully`);
      this.onUploaded.emit(info)
    } else if (info.file.status === 'error') {
      this.http.showCustomerMsg.error(`${info.file.name} file upload failed.`);
    }
  }
uploadHandler=async (data)=>{
    data.name="files"
    let form = new FormData();
    form.append("files",data.file);
    return this.httpClient.post(this.uploadApi,form,{headers:data.headers,reportProgress:true})
    .subscribe()
  }
}
