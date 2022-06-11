import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-account',
  template: `.
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-top card-top-success">
          <div class="card-header">
            <vb-headers-heading [data]="{'title':'Account Section'}"></vb-headers-heading>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <div class="card card-top ">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-9 h3">
                {{account.name}}
              </div>
              <div class="col-sm-3">
                <div (click)="edit(account)" class="btn btn-outline-primary">Edit</div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="row">
                <div class="col-sm-12">

                </div>
              </div>
              <dl class="row">
                <dt class="col-sm-3">Account Status</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h3">{{account.status}}
                      <span *ngIf="account?.pacra?.length>0 && account?.nrc?.length>0 ">(All documents uploaded)</span>
                      <span *ngIf="account?.pacra?.length<1 ">(Upload PACRA Certificate)</span>
                    </div>
                  </div>

                </dd>

                <dt class="col-sm-3">Address</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h4">{{account.address}}</div>

                  </div>
                </dd>

                <dt class="col-sm-3">Email</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h4"> {{account.email}}</div>

                  </div>
                </dd>

                <dt class="col-sm-3">Phone</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h4">{{account.phone}}</div>

                  </div>
                </dd>
              </dl>
            </div>


          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12">
        <div class="card card-top card-top-primary">
          <div class="card-body">
              Upload PACRA Certificate
              <app-uploader [fileTypes]="fileList" (onUploaded)="handlePacraUploads($event)"
              hint="Upload PACRA Certificate" multiple="true" limit="5"
              ></app-uploader>
            Upload Director's NRC
              <app-uploader [fileTypes]="fileList" (onUploaded)="handleNrcUploads($event)"
              hint="Upload business owner or director identification" multiple="true" limit="2"
              ></app-uploader>

          </div>
        </div>
      </div>
    </div>
  </div>
  <nz-modal [(nzVisible)]="isEditContact"
                    nzTitle="Edit Account "
                    (nzOnCancel)="handleCancelEditContactModal()" (nzOnOk)="handleOkContactModal()">
            <ng-container *nzModalContent>
              <form
                nz-form
                [formGroup]="editContactform" (ngSubmit)="editContactItem(editContactModal)">
                <formly-form [form]="editContactform" [fields]="editContactFields" [model]="editContactModal"></formly-form>
                <ng-container *nzModalFooter>
                  <button nz-button nzType="default" (click)="handleCancelEditContactModal()">Cancel</button>
                  <button nz-button nzType="primary" (click)="handleOkContactModal()" >Submit</button>
                </ng-container>
                <br>
              </form>
            </ng-container>
          </nz-modal>

          <ng-template #loadingTemplate>
      <div class="ant-notification-notice-content">
        <div class="ant-notification-notice-with-icon">
          <span class="ant-notification-notice-icon">
            <i nz-icon nzType="loading" style="color: rgb(16, 142, 233);"></i>
          </span>
          <div class="ant-notification-notice-message">loading...</div>
        </div>
      </div>
    </ng-template>

  `,
})
export class AccountComponent implements OnInit {
  @ViewChild("loadingTemplate") loadingTemplate: TemplateRef<any>
  processing = false;
  account={
    phone: undefined,
    address: undefined,
    name: undefined,
    status: undefined,
    email: undefined,
    pacra:[],
    nrc:[]
  }
  api = '/companies'
  fileList='image/png,image/jpeg,image/gif,image/bmp,image/jpg,application/pdf'
  constructor(private http:HttpService,private notification: NzNotificationService) {}
  ngOnInit() {
    this.getMyAccountDetails();
  }

  async getMyAccountDetails(){
    let method = 'get'
   let acc = await this.http.makeCall({method,api:this.api});
   this.account  =acc[0]
  }

  isEditContact: any;
  editContactform = new FormGroup({});
  editContactModal: any = {email:"",phone:"",id:""}
  editContactFields : FormlyFieldConfig[] = [
    {
      key: 'address',
      type: 'textarea',
      templateOptions: {
        label: 'Business / Compamy Address',
        placeholder: '',
        required: true,
      }
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Bysiness / Company Phone Number',
        placeholder: 'Phone Number',
        required: true,
      }
    } ,   {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Business / Company Email address ',
        placeholder: 'Enter email ',
        required: true,
      }
    }
  ];
  handleOkContactModal() {
    this.isEditContact = false;
    this.editContactItem(this.editContactModal)
  }
  edit(data: any) {
    let {address,email,phone,id} = data
    this.editContactModal = {
      address, email, phone,id
    }
    this.isEditContact = true;
  }

  async editContactItem(model: { phone: string; name: string; email: string }) {
    this.isEditContact = false
    this.showLoading()
    let method = "put";
    let api = "/companies"
    let data:any = {...model}
    let call = await this.http.makeCall({method,api,data})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("Update was a success");
      this.getMyAccountDetails();
    }else{
      this.http.showCustomerMsg.error("Update failed...")
    }
  }
  handleCancelEditContactModal() {
    this.isEditContact  =false
  }
  showLoading(){
    this.processing = true
    this.notification.template(this.loadingTemplate,{nzDuration:0});
  }
  hideLoading(){
    this.processing = true
    this.notification.remove()
  }
  handlePacraUploads(id){
    const{file:{response}}=id
   let method='put';
   //@ts-ignore
   let api='/companies'
   let data = this.account.pacra;
   if(response.length>0){
    for(let x of response){
      data.push(x.id)
    }
  }
     //@ts-ignore
  this.http.makeCall({api,data:{pacra:data,id:this.account.id},method})

  }
  handleNrcUploads(id){
    const{file:{response}}=id
   let method='put';
   //@ts-ignore
   let api='/companies'
   let data = this.account.nrc;
   if(response.length>0){
    for(let x of response){
      data.push(x.id)
    }
  }
     //@ts-ignore
  this.http.makeCall({api,data:{nrc:data,id:this.account.id},method})
  }
}
