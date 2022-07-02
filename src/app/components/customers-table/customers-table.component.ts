import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {HttpService} from "../../services/http.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-customers-table',
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

    <div class="table-responsive text-nowrap">
      <nz-tabset class="tabs" [nzSelectedIndex]="0">
        <nz-tab nzTitle="Contact List" [nzForceRender]="true">
          <div class="row ">
            <div class="col-md-12 d-flex justify-content-between">
              <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
                <input (keydown)="searchMyContacts()" [(ngModel)]="searchText" type="text" nz-input placeholder="type to search" />
              </nz-input-group>
              <div (click)="showCreateContactModal=true" class="btn btn-outline-primary">Create Contact</div>
            </div>
         </div>

          <ng-template #suffixIconButton>
            <button (click)="searchMyContacts()" nz-button nzType="primary" nzSearch><i nz-icon nzType="search"></i></button>
          </ng-template>
          <nz-table #basicTable
                    [nzFrontPagination]="false"
                    [nzTotal]="totalContacts"
                    [nzPageSize]="limit"
                    [ngStyle]="{'overflow-x':'scroll'}"
                    (nzPageIndexChange)="paginateContacts($event)"
                    [nzData]="tableData"
          [nzLoading]="loadingData"
                    class="table mb-4">
            <thead>
            <tr>
              <th class="bg-transparent">Names</th>
              <th class="bg-transparent">Phone</th>
              <th class="bg-transparent">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let data of basicTable.data">
              <td>
                <div>{{data.name}}</div>
                <div class="text-gray-4">{{data.email}}</div>
              </td>
              <td>
                <a href="javascript: void(0);" class="text-blue">
                  {{data.phone}}
                </a>
              </td>
              <td class="text-right">
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
                <ng-container *nzModalFooter>
                  <button nz-button nzType="default" (click)="handleCancelEditContactModal()">Cancel</button>
                  <button nz-button nzType="primary" (click)="handleOkContactModal()" >Submit</button>
                </ng-container>
                <br>
              </form>
            </ng-container>
          </nz-modal>

          <nz-modal [(nzVisible)]="showCreateContactModal" nzTitle="Create Contact or upload" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
            <ng-container *nzModalContent>
              <form [formGroup]="form" (ngSubmit)="createItem(model)">
                <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
             </form>
              <p>Or upload a CSV document with Contacts download <a download style="color:greenyellow" href="https://res.cloudinary.com/davidharven/raw/upload/v1654049295/zedsms/xfp1tfxavx5dwszzwz03.csv">format here</a></p>
              <nz-form-item>
                <app-uploader (onUploaded)="processFile($event)"  fileTypes="text/csv"  fileSize="100000"  hint="Upload CSV of contacts"></app-uploader>
              </nz-form-item>
            </ng-container>
            <ng-container *nzModalFooter>
              <button nz-button nzType="default" (click)="handleCancel()">Cancel</button>
              <button nz-button nzType="primary" (click)="handleOk()" >Submit</button>
            </ng-container>
          </nz-modal>

        </nz-tab>
        <nz-tab nzTitle="Mailing List" [nzForceRender]="true">
        <ng-container nz-tab>
          <app-mail-list></app-mail-list>
        </ng-container>
        </nz-tab>
      </nz-tabset>
    </div>


  `,
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  @ViewChild("loadingTemplate") loadingTemplate: TemplateRef<any>
  tableData =[]
  mailListData =[]
  totalContacts=100
  loadingData=true
  // create variables
  showCreateContactModal = false;
  form : FormGroup =new FormGroup({});
  model = { email: '',name:"",phone:"" };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Customer Full Names',
        placeholder: 'Dalisto Benard',
        required: true,
      }
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Phone Number',
        placeholder: 'Phone Number',
        required: true,
      }
    } ,   {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address (optional)',
        placeholder: 'Enter email ',
        required: false,
      }
    }
  ];
  // end create variables
  // Pagination variables
  page =0;
  limit=10;

  // End Pagination variables
  processing = false;
  searchText: any;
  contactsApi = '/customers'
  constructor(private http: HttpService,private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getPaginatedContacts(this.page,this.limit,["name"],"")
    this.countTotal();
  }
  async paginateContacts(page: number) {
    this.page =page;
    this.searchMyContacts();
  }

  searchMyContacts() {
    this.getPaginatedContacts(this.page,this.limit,["name","phone","email"],this.searchText)
  }
  async getPaginatedContacts(page,limit,searchTerm,search,sort="CreatedAt"
  ){

     let api =this.http.paginationService({
       api:this.contactsApi,page,search,searchTerm,limit
     });
     let method="get";
     let resp = await this.http.makeCall({api,method})
    if(resp){

      this.tableData=resp;
      this.loadingData=false
    }
  }
  async countTotal(){
    let api = this.contactsApi+'/count'
    let method="get";
    let resp:any =await this.http.makeCall({method,api});
    this.totalContacts = resp;
  }

  // create contatc functions
  handleCancel(){
    this.showCreateContactModal =false
  }
  handleOk(){
    if(!this.form.valid) return
    this.createItem(this.model)

  }

  async createItem(data){
    this.showCreateContactModal =false;
    this.showLoading();
    let method = "post";
    let api = "/customers";
    let call = await this.http.makeCall({method,api,data})
    this.hideLoading();
    if(call){
      this.http.showCustomerMsg.success("creation was a success");
      this.refresh();
    }else{
      this.http.showCustomerMsg.error("creation failed...");
    }

  }
// Edit Contacts fields
  isEditContact: any;
  editContactform = new FormGroup({})
  editContactModal: { phone: any; name: any; id: any; email: any } = {email:"",name:"",phone:"",id:""}
  editContactFields : FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Customer Full Names',
        placeholder: 'Dalitso Bernard',
        required: true,
      }
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Phone Number',
        placeholder: 'Phone Number',
        required: true,
      }
    } ,   {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address (optional)',
        placeholder: 'Enter email ',
        required: false,
      }
    }
  ];
  async delete(data: any) {
    this.showLoading();
    let method = "delete";
    let api = "/customers"
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
    let {name,email,phone,id} = data
    this.editContactModal = {
      name, email, phone,id
    }
    this.isEditContact = true;
  }
  handleOkContactModal() {
    this.isEditContact = false;
    this.editContactItem(this.editContactModal)
  }

  async editContactItem(model: { phone: string; name: string; email: string }) {
    this.isEditContact = false
    this.showLoading()
    let method = "put";
    let api = "/customers"
    let data:any ={}
    if(model.email.includes("@"))
    {
      data =  {...model}
    }
    else{
      //@ts-ignore
      let{phone,name,id}=model;
      data ={phone,name,id}
    }

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
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  handleClose(removedTag: {}): void {
    // this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }
  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    // if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
    //   this.tags = [...this.tags, this.inputValue];
    // }
    // this.inputValue = '';
    // this.inputVisible = false;
  }
  // end view mail list table

  //create a mailling list
  mailListCreateForm : FormGroup =new FormGroup({});
  mailListCreatemodel = { email: '',name:"",phone:"" };
  mailListCreatefields: FormlyFieldConfig[] = [
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
    {
      key: 'Contacts',
      type: 'select',
      templateOptions: {
        label: 'Select Contacts',
        placeholder: '',
        required: true,
        multiple: true
      }
    }
  ];
  createMailListItem(data){}
  //end create a mailling list


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
  async processFile(id) {
    const{file:{response}}=id
    if(response.length>0){
      for(let x of response){
        let api="/bulkcustomeruploads";
        let method="POST";
        let data ={
          file:x.id,
          id:''
        };
        this.http.makeCall({api,data,method})
      }
    }

  }
}
