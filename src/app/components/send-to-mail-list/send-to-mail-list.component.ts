import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {HttpService} from "../../services/http.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-send-to-mail-list',
  template:`
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
    <form [formGroup]="smsCreateForm" (ngSubmit)="createSMS()">
      <nz-form-item>
        <nz-form-label>Contacts</nz-form-label>
        <nz-select
          [nzMaxTagCount]="100"
          [nzMaxTagPlaceholder]="tagPlaceHolder"
          nzMode="multiple"
          nzPlaceHolder="Please select a contact"
          [nzServerSearch]="true"
          (nzOnSearch)="searchContacts($event)"
          [nzDropdownRender]="renderTemplate"
          (ngModelChange)="contactSearch=''"
          formControlName="customers"
          name="customers"
        >
          <nz-option *ngFor="let item of listOfContacts" [nzLabel]="item.name" [nzValue]="item.id"></nz-option>
        </nz-select>
        <ng-template #renderTemplate>
          <nz-pagination (nzPageIndexChange)="paginateContacts($event)" [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
        </ng-template>
        <ng-template #tagPlaceHolder let-selectedList>and {{ selectedList.length }} more selected</ng-template>
      </nz-form-item>
      <formly-form [form]="smsCreateForm" [fields]="smsCreatefields" [model]="smsCreatemodel"></formly-form>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  `,
  styleUrls: ['./send-to-mail-list.component.scss']
})
export class SendToMailListComponent implements OnInit {
  @ViewChild("loadingTemplate") loadingTemplate: TemplateRef<any>
  smsCreateForm : FormGroup =new FormGroup({
    customers : new FormControl(null,Validators.required)
  });
  smsCreatemodel = { email: '',name:"",phone:"" };
  smsCreatefields: FormlyFieldConfig[] = [
    {
      key: 'message',
      type: 'textarea',
      templateOptions: {
        label: 'Message',
        placeholder: 'Type in your message',
        required: true,
      }
    }
  ];
  sentMailData =[]
  listOfContacts=[]
  totalSent =0;
  page =0;
  limit=20;
  contactSearch = ''
  // End Pagination variables
  processing = false;
  searchText: any;
  contactsApi = '/maillists'
  constructor(private http: HttpService,private notification: NzNotificationService) { }

  ngOnInit(): void {
  }
  async createSMS() {
    this.showLoading()
    let method = "post";
    let api = this.contactsApi
    let call = await this.http.makeCall({method,api,data:{...this.smsCreateForm.value}})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("sms are loaded for delivery");
      this.refresh()
    }else{
      this.http.showCustomerMsg.error("sms loading failed...")
    }
  }
  showLoading(){
    this.processing = true
    this.notification.template(this.loadingTemplate,{nzDuration:0});
  }
  hideLoading(){
    this.processing = true
    this.notification.remove()
  }
  refresh(){
    this.getPaginatedContacts(this.page,this.limit,["message"],"")
  }
  async paginateContacts(page: number) {
    let api = '/customers'
    let limit = 20
    let method='get';
    let term = this.contactSearch || ''
    api = this.http.paginationService({api,page,limit,
      searchTerm:["name","email","phone"],search:term})
    this.listOfContacts =  await this.http.makeCall({method,api}) || this.listOfContacts

  }
  async getPaginatedContacts(page,limit,searchTerm,search,sort="CreatedAt"
  ){

    let api =this.http.paginationService({
      api:this.contactsApi,page,search,searchTerm,limit
    });
    let method="get";
    let resp = await this.http.makeCall({api,method})
    if(resp){
      this.sentMailData=resp;
    }
  }
}
