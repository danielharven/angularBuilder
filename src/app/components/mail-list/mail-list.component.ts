import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {HttpService} from "../../services/http.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-mail-list',
  template: `
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
    <div class="row ">
      <div class="col-md-10 d-flex justify-content-between">
        <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
          <input (keydown)="searchMyContacts()" [(ngModel)]="searchText" type="text" nz-input placeholder="type to search" />
        </nz-input-group>
        <div (click)="showCreateContactModal=true" class="btn btn-outline-primary">Create Mail List</div>
      </div>
    </div>

    <ng-template #suffixIconButton>
      <button (click)="searchMyContacts()" nz-button nzType="primary" nzSearch><i nz-icon nzType="search"></i></button>
    </ng-template>
    <nz-table #basicTable
              [nzData]="tableData"
              [nzTotal]="totalCount"
              [nzPageSize]="limit"
              (nzPageIndexChange)="paginateContacts($event)"
              [ngStyle]="{'overflow-x':'scroll'}"
              [nzFrontPagination]="false"
              [nzShowPagination]="true"
              class="table mb-4">
      <thead>
      <tr>
        <th class="bg-transparent">Names</th>
        <th class="bg-transparent text-right">Actions</th>
        <th class="bg-transparent">contacts</th>

      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of basicTable.data">
        <td>
          <div>{{data.name}}</div>
          <div class="text-gray-4">{{data.description}}</div>
        </td>
        <td>
          <button (nzOnConfirm)="delete(data)" nz-popconfirm nzPopconfirmTitle="Are you sure you want to delete?" [nzIcon]="iconTpl"  type="button" class="btn btn-danger mr-2">
            <i class="fe fe-trash"></i>
            <ng-template #iconTpl>
              <i nz-icon nzType="question-circle-o" style="color: red;"></i>
            </ng-template>
          </button>
          <button (click)="edit(data)" type="button" class="btn btn-light">
            <i class="fe fe-edit text-blue"></i>
          </button>
        </td>
        <td>
          <div>
            <ng-container *ngFor="let contact of data.customers let i=index" >
              <nz-tag nzMode="closeable"
                      (nzOnClose)="removeContactFromList(contact,data)">{{contact.name}}</nz-tag>
              <br *ngIf="i%5===0">
            </ng-container>
          </div>
        </td>
      </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isEditContact"
              nzTitle="Edit Contact "
              (nzOnCancel)="handleCancelEditContactModal()" (nzOnOk)="handleOkContactModal()">
      <ng-container *nzModalContent>
        <form
          nz-form
          [formGroup]="editContactform" (ngSubmit)="editContactItem(editContactModal)">
          <formly-form [form]="editContactform" [fields]="editContactFields" [model]="editContactModal"></formly-form>
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
          <nz-form-item>

          </nz-form-item>
          <button type="submit" class="btn btn-default">Submit</button>
          <br>
        </form>
      </ng-container>
    </nz-modal>

    <nz-modal [(nzVisible)]="showCreateContactModal" nzTitle="Create Mail List" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <form [formGroup]="form" (ngSubmit)="createItem()">
          <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
          <nz-form-item>
            <nz-form-label>Contacts</nz-form-label>
            <nz-select
              [nzMaxTagCount]="100"
              [nzMaxTagPlaceholder]="tagPlaceHolder"
              nzMode="multiple"
              nzPlaceHolder="Please select a contact"
              [nzServerSearch]="true"
              (nzOnSearch)="searchCompanyContacts($event)"
              [nzDropdownRender]="renderTemplate"
              (ngModelChange)="contactSearch=''"
              formControlName="customers"
              name="customers"
            >
              <nz-option *ngFor="let item of listOfContacts" [nzLabel]="item.name" [nzValue]="item.id"></nz-option>
            </nz-select>
            <ng-template #renderTemplate>
              <nz-pagination (nzPageIndexChange)="paginateCompanyContacts($event)" [nzPageIndex]="page" [nzTotal]="totalCountContacts"></nz-pagination>
            </ng-template>
            <ng-template #tagPlaceHolder let-selectedList>and {{ selectedList.length }} more selected</ng-template>
          </nz-form-item>
          <button [disabled]="!form.valid" type="submit" class="btn btn-default">Submit</button>
        </form>
      </ng-container>
    </nz-modal>

  `,
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit {
  @ViewChild("loadingTemplate") loadingTemplate: TemplateRef<any>
  listOfContacts=[]
  listOfSelectedValue
  tableData =[]
  mailListData =[]
  // create variables
  showCreateContactModal = false;
  form : FormGroup =new FormGroup({
    customers: new FormControl(null,Validators.required)
  });
  model:any = {  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Mailing List Name',
        placeholder: 'Paid Customers',
        required: true,
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        placeholder: 'Customers who have active accounts with us',
        required: true,
      }
    } ,
  ];
  // end create variables
  // Pagination variables
  page =0;
  limit=10;
  contactSearch = ''
  // End Pagination variables
  processing = false;
  searchText: any;
  contactsApi = '/maillists'
  totalCount = 100
  totalCountContacts = 100
  constructor(private http: HttpService,private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getPaginatedContacts(this.page,this.limit,["name"],"");
    this.countContacts();
  }
  searchMyContacts() {
    this.getPaginatedContacts(this.page,this.limit,["name","description"],this.searchText)
  }
  async countContacts(){
    let api = '/maillists/count';
let method = "GET";
let count:any = await this.http.makeCall({api,method});
this.totalCount = count;

api = '/customers/count';
count = await this.http.makeCall({api,method});
this.totalCountContacts = count;
  }
  async getPaginatedContacts(page,limit,searchTerm,search,sort="CreatedAt"
  ){

    let api =this.http.paginationService({
      api:this.contactsApi,page,search,searchTerm,limit
    });
    let method="get";
    let resp = await this.http.makeCall({api,method})
    if(resp){
      console.log(resp)
      this.tableData=resp;
    }
  }

  // create contatc functions
  handleCancel(){
    this.showCreateContactModal =false
  }
  handleOk(){
    this.createItem()

  }

  async createItem(){
    this.showCreateContactModal =false
    this.showLoading()
    let method = "post";
    let api = this.contactsApi
    let call = await this.http.makeCall({method,api,data:{...this.form.value}})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("creation was a success");
      this.refresh()
    }else{
      this.http.showCustomerMsg.error("creation failed...")
    }

  }
// Edit Contacts fields
  isEditContact: any;
  editContactform = new FormGroup({
    customers: new FormControl(null,Validators.required)
  })
  editContactModal: { description: any; name: any; id: any; contacta: any }
  editContactFields : FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Mailing List Name',
        placeholder: 'Paid Customers',
        required: true,
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        placeholder: 'Customers who have active accounts with us',
        required: true,
      }
    } ,
  ];
  async delete(data: any) {
    this.showLoading()
    let method = "delete";
    let api = this.contactsApi
    let call = await this.http.makeCall({method,api,data})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("delete was a success");
      this.refresh()
    }else{
      this.http.showCustomerMsg.error("delete failed...")
    }
  }

  edit(data: any) {
    this.editContactModal = data
    this.editContactform.patchValue({
      customers:data.customers
    })
    this.isEditContact = true;
  }
  handleOkContactModal() {
    this.isEditContact = false;
    this.editContactItem(this.editContactModal)
  }

  async editContactItem(model) {
    this.isEditContact = false
    this.showLoading()
    let method = "put";
    let api = this.contactsApi
    let data:any = {...this.editContactform.value,id:model.id}
    let call = await this.http.makeCall({method,api,data})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("Update was a success");
      this.refresh()
    }else{
      this.http.showCustomerMsg.error("Update failed...")
    }
  }
// End Edit Contact Field
  // view mail list table
  inputVisible = false;
  inputValue="";

  handleInputConfirm(): void {
    // if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
    //   this.tags = [...this.tags, this.inputValue];
    // }
    // this.inputValue = '';
    // this.inputVisible = false;
  }
  // end view mail list table


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

  refresh(){
    this.getPaginatedContacts(this.page,this.limit,["name"],"")
  }

  async searchContacts($event: string) {
    let api = this.contactsApi
    let page  =0
    let limit = 10
    let term= $event;
    this.contactSearch = term;
    let method='get';
    api = this.http.paginationService({api,page,limit,
      searchTerm:["name","description"],search:term})
   this.tableData =  await this.http.makeCall({method,api}) || this.tableData
  }

  async paginateContacts(page: number) {
    let api = this.contactsApi
    let limit = 10
    let method='get';
    let term = this.contactSearch || ''
    api = this.http.paginationService({api,page,limit,
      searchTerm:["name","description"],search:term})
    this.tableData =  await this.http.makeCall({method,api}) || this.tableData

  }

  async removeContactFromList(contact,data) {
    this.showLoading()
    data.customers = data.customers.filter(item => item.id !== contact.id);
    let method = "put";
    let api = this.contactsApi
    let call = await this.http.makeCall({method,api,data})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("Update was a success");
      this.refresh()
    }else{
      this.http.showCustomerMsg.error("Update failed...")
    }
  }

  async searchCompanyContacts($event: string) {
    let api = '/customers'
    let page  =0
    let limit = 10
    let term= $event;
    this.contactSearch = term;
    let method='get';
    api = this.http.paginationService({api,page,limit,
      searchTerm:["name","phone","email"],search:term})
    this.listOfContacts =  await this.http.makeCall({method,api}) || this.tableData
  }

  async paginateCompanyContacts(page: number) {
    let api = '/customers'
    let limit = 10
    let method='get';
    let term = this.contactSearch || ''
    api = this.http.paginationService({api,page,limit,
      searchTerm:["name","phone","email"],search:term})
    this.listOfContacts =  await this.http.makeCall({method,api}) || this.tableData

  }


}
