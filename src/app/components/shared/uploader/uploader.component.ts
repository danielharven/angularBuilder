import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
const api = environment.url
@Component({
  selector: 'app-uploader',
  template: `
    <nz-upload nzType="drag" [nzMultiple]="multiple" [nzLimit]="limit" [nzSize]="fileSize"
               [nzFileType]="fileTypes"
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
  @Output('onUploaded') onUploaded: EventEmitter<{ id:string,status:boolean }>
  headers={
  Authorization:"Bearer "+localStorage.getItem('token')
  }
  uploadApi = api+'/upload'
  constructor() { }

  ngOnInit(): void {
  }

}
