import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {HttpService} from "../../services/http.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-sms',
  template: `
    <div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-top card-top-success">
            <div class="card-header">
              <vb-headers-heading-2 [data]="{'title':'SMS ','description':'You can manage your SMSs on this page'}"></vb-headers-heading-2>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 d-flex ">
          <nz-tabset>
            <nz-tab (click)="paginateContacts(0)" nzTitle="Sent SMS">
          <div class="card card-top card-top-primary">
            <div class="card-body">

                  <div>
                  <div class="table-responsive text-nowrap">
                    <nz-table #basicTable [nzData]="sentMailData"
                              [nzFrontPagination]="false"
                              [nzTotal]="totalSent"
                              [nzPageSize]="limit"
                              [ngStyle]="{'overflow-x':'scroll'}"
                              (nzPageIndexChange)="paginateContacts($event)"
                              [nzShowPagination]="true" class="table mb-4">
                      <thead>
                      <tr>
                        <th class="bg-transparent width-50">Date</th>
                        <th class="bg-transparent width-50">Customer</th>
                        <th class="bg-transparent width-50">Message</th>
                        <th class="bg-transparent">Status</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr *ngFor="let data of basicTable.data">
                        <td>
                         {{data.createdAt |date}}
                        </td>
                        <td>
                          <div>
                            <ng-container *ngFor="let contact of data.customers let i=index" >
                              <nz-tag>{{contact.name}}</nz-tag>
                              <br *ngIf="i%5===0">
                            </ng-container>
                          </div>
                        </td>
                        <td nzBreakWord>
                            {{data.message}}
                        </td>
                        <td class="text-right">
                          <div class="text-nowrap">
                              <span>{{data.status}}</span>

                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </nz-table>
                  </div>
                </div>
            </div>
          </div>
            </nz-tab>
            <nz-tab nzTitle="Send new SMS">
              <ng-container nz-tab>
                  <form nz-form nzLayout="vertical" [formGroup]="smsCreateForm" (ngSubmit)="createSMS(smsCreatemodel)">
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
                    <button [disabled]="!this.smsCreateForm.valid" type="submit" class="btn btn-default">Submit</button>
                  </form>

                <nz-form-item></nz-form-item>
              </ng-container>
            </nz-tab>
            <nz-tab nzTitle="Send To Mailing List">
              <ng-container nz-tab>
                <app-send-to-mail-list></app-send-to-mail-list>

              </ng-container>
            </nz-tab>
            <nz-tab nzTitle="Received SMS">
              <ng-container nz-tab>
                <app-read-sms></app-read-sms>
              </ng-container>
            </nz-tab>
            <nz-tab nzDisabled nzTitle="Spam SMS (coming soon)">
              <ng-container nz-tab>
            </ng-container>
            </nz-tab>
          </nz-tabset>
        </div>
      </div>
    </div>

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
export class SmsComponent implements OnInit {
  @ViewChild("loadingTemplate") loadingTemplate: TemplateRef<any>
  listOfContacts=[]
  sentMailData =[]
  totalSent =0;
  page =0;
  limit=10;
  contactSearch = ''
  // End Pagination variables
  processing = false;
  searchText: any;
  contactsApi = '/outboxes'
  constructor(private http: HttpService,private notification: NzNotificationService) {}
  ngOnInit() {
    this.getPaginatedContacts(this.page,this.limit,["message"],"")
    this.getTotalSent();
    this.paginateContacts(0)
  }

  //Send SMS
  async getTotalSent(){
    this.totalSent= await this.http.makeCall({api:this.contactsApi+'/count',method:'get'})

  }
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
  searchMyContacts() {
    this.getPaginatedContacts(this.page,this.limit,["name","description"],this.searchText)
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
  //End Send SMS
  async createSMS(model: any) {
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

  // Received Sms
  receivedSms = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources' +
      '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    children: [
      {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        children: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          },
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          }
        ]
      }
    ]
  };
  replyInputValue: string;
  submitting: boolean = false;
  replyBox: any=null;

  deleteSms(comment: any) {

  }

  replySms(comment: any) {
    this.replyBox=comment
  }

  handleSubmit(comment: any) {

  }

  async paginateContacts(page: number) {
    let api = this.contactsApi
    let limit = 10
    let method='get';
    let term = this.contactSearch || ''
    api = this.http.paginationService({api,page,limit,
      searchTerm:["message"],search:term})
    this.sentMailData =  await this.http.makeCall({method,api}) || this.sentMailData

  }
  async searchContacts($event: string) {
    let api = this.contactsApi
    let page  =0
    let limit = 10
    let term= $event;
    this.contactSearch = term;
    let method='get';
    api = this.http.paginationService({api,page,limit,
      searchTerm:["message","status"],search:term})
    this.sentMailData =  await this.http.makeCall({method,api}) || this.sentMailData
  }
  refresh(){
    this.getPaginatedContacts(this.page,this.limit,["message"],"")
  }
  showLoading(){
    this.processing = true
    this.notification.template(this.loadingTemplate,{nzDuration:0});
  }
  hideLoading(){
    this.processing = true
    this.notification.remove()
  }
}
