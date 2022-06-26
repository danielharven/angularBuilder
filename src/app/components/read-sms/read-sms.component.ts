import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-read-sms',
  template:`

  <nz-table #basicTable
  [nzTotal]="totalSent"
  [nzFrontPagination]="false"
  [nzShowPagination]="true"
  (nzPageIndexChange)="paginateContacts($event)"
  [nzData]="message">

  <tbody>
    <tr *ngFor="let comment of basicTable.data">
    <ng-container>
    <ng-template #authorTemplate>
    {{comment?.customer?.name}} - {{comment.phone}}
  </ng-template>
    <nz-comment [nzAuthor]="authorTemplate">
        <nz-comment-content>
          <div class="row">
            <div class="col-sm-12">
            <p>{{ comment.message }}</p>
            </div>
          </div>

        </nz-comment-content>
        <nz-comment-action >
          <div (click)="deleteSms(comment)">
          <i
          nz-tooltip
          nzTitle="delete"
          nz-icon
          nzType="delete"
          [nzTheme]="'outline'"

        ></i>
          <span class="count like">Delete</span>
          </div>

        </nz-comment-action>
        <nz-comment-action   >
          <div class="ml-3" (click)="replySms(comment)">
          <i
          nz-tooltip
          nzTitle="reply"
          nz-icon
          nzType="mail"
          [nzTheme]="'outline'"

        ></i>
          <span class="count like">Reply</span>
          </div>

        </nz-comment-action>
      </nz-comment>
    </ng-container>
    </tr>
  </tbody>
</nz-table>

<nz-modal [(nzVisible)]="isVisible" nzTitle="Reply" (nzOnCancel)="isVisible=false" (nzOnOk)="reply()">
      <ng-container *nzModalContent>
        <p>{{selected.message}}</p>
        <textarea [(ngModel)]="replyValue" name="" id="" cols="50" rows="5"></textarea>
      </ng-container>
</nz-modal>
<nz-pagination [nzPageSize]="limit" [nzTotal]="totalSent" (nzPageIndexChange)="paginateContacts($event)"></nz-pagination>
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
  styleUrls: ['./read-sms.component.scss']
})
export class ReadSmsComponent implements OnInit {

  message =[]
  totalSent = 0
  contactsApi = '/inboxes';
  page =0;
  limit=20;
  contactSearch = ''
  processing = false;
  searchText: any;
  isVisible=false
  selected:any = {}
  replyValue: any ="";
  constructor(private http: HttpService,private notification: NzNotificationService) { }
  @ViewChild("loadingTemplate") loadingTemplate: TemplateRef<any>
  ngOnInit(): void {
    this.getTotalSent();
    this.paginateContacts(0);
  }
  async getTotalSent(){
    this.totalSent= await this.http.makeCall({api:this.contactsApi+'/count',method:'get'})

  }
  searchMyContacts() {
    this.getPaginatedContacts(this.page,this.limit,["message","phone","customer.name"],this.searchText)
  }
  async getPaginatedContacts(page,limit,searchTerm,search,sort="CreatedAt"
  ){

    let api =this.http.paginationService({
      api:this.contactsApi,page,search,searchTerm,limit
    });
    let method="get";
    let resp = await this.http.makeCall({api,method})
    if(resp){
      this.message=resp;
    }
  }
  async paginateContacts(page: number) {
    let api = this.contactsApi
    let limit = 20
    let method='get';
    let term = this.contactSearch || ''
    api = this.http.paginationService({api,page,limit,
      searchTerm:["phone","message","customer.name"],search:term})
    this.message =  await this.http.makeCall({method,api}) || this.message

  }
  async deleteSms(){
    this.http.showCustomerMsg.info("This feature is not available yet")
  }
  replySms(comment){
    this.selected = comment;
    this.isVisible = true;
  }
  async reply(){
    this.isVisible =false;
    this.showLoading()
    let method = "post";
    let api = "/outboxes"
    let data= {
      customers:[this.selected.phone],message:this.replyValue
    }
    //@ts-ignore
    let resp = await this.http.makeCall({method,api,data})
    this.hideLoading()
    if(resp){
      this.http.showCustomerMsg.success('Message sent');
    }else{
      this.http.showCustomerMsg.error('Message was not sent');
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
}
