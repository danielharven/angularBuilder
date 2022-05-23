import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-customers-table',
  template: `
    <div class="table-responsive text-nowrap">
      <nz-tabset class="tabs" [nzSelectedIndex]="0">
        <nz-tab nzTitle="Contact List" [nzForceRender]="true">
          <nz-table #basicTable [nzData]="tableData" [nzShowPagination]="false" class="table mb-4">
            <thead>
            <tr>
              <th class="bg-transparent">Names</th>
              <th class="bg-transparent">Phone</th>
              <th class="bg-transparent text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let data of basicTable.data">
              <td>
                <div>{{data.names}}</div>
                <div class="text-gray-4">{{data.phone}}</div>
              </td>
              <td>
                <a href="javascript: void(0);" class="text-blue">
                  {{data.email}}
                </a>
              </td>
              <td class="text-right">
                <button type="button" class="btn btn-primary mr-2">
                  <i class="fe fe-trash-circle"></i>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fe fe-edit text-blue"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </nz-table>
        </nz-tab>
        <nz-tab nzTitle="Create a Contact" [nzForceRender]="true">
        <ng-container nz-tab>
          <div class="row">
            <div class="col-sm-12">
                <form
                  nz-form
                  [formGroup]="form" (ngSubmit)="createItem(model)">
                  <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
                  <button type="submit" class="btn btn-default">Submit</button>
                  <br>
                </form>
              <p>Or upload a CSV document with Contacts download <a style="color:greenyellow" href="">format here</a></p>
              <nz-form-item>
                <nz-upload nzType="drag" [nzMultiple]="false" [nzLimit]="1"
                           nzAction="https://jsonplaceholder.typicode.com/posts/">
                  <p class="ant-upload-drag-icon">
                    <i nz-icon nzType="inbox"></i>
                  </p>
                  <p class="ant-upload-text">Upload CSV document of contacts</p>
                  <p class="ant-upload-hint">
                    Support for bulk upload
                  </p>
                </nz-upload>
              </nz-form-item>
            </div>
          </div>

      </ng-container>
        </nz-tab>
        <nz-tab nzTitle="Mailing List" [nzForceRender]="true">
        <ng-container nz-tab>
        <nz-table #basicTable [nzData]="mailListData" [nzShowPagination]="false" class="table mb-4">
            <thead>
            <tr>
              <th class="bg-transparent">Name</th>
              <th class="bg-transparent">Description</th>
              <th class="bg-transparent">contacts</th>
              <th class="bg-transparent text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let data of basicTable.data">
              <td>
                <div>{{data.name}}</div>
              </td>
              <td>
              <div class="text-gray-4">{{data.description}}</div>
              </td>
              <td>
              <nz-tag
                      *ngFor="let tag of data.contacts; let i = index"
                      [nzMode]="i === 0 ? 'default' : 'closeable'"
                      (nzOnClose)="handleClose(tag)"
                    >
                      {{ sliceTagName(tag.names) }}
              </nz-tag>
              <input
                  #inputElement
                  nz-input
                  nzSize="small"
                  *ngIf="inputVisible"
                  type="text"
                  [(ngModel)]="inputValue"
                  style="width: 78px;"
                  (blur)="handleInputConfirm()"
                  (keydown.enter)="handleInputConfirm()"
                />
              </td>
              <td class="text-right">
                <button type="button" class="btn btn-primary mr-2">
                  <i class="fe fe-trash-circle"></i>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fe fe-edit text-blue"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </nz-table>
      </ng-container>
        </nz-tab>
        <nz-tab nzTitle="Create a Mailing List" [nzForceRender]="true">
        <ng-container nz-tab>

            <form [formGroup]="mailListCreateForm" (ngSubmit)="createMailListItem(mailListCreatemodel)">
            <formly-form [form]="mailListCreateForm" [fields]="mailListCreatefields" [model]="mailListCreatemodel"></formly-form>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>

          <nz-form-item></nz-form-item>

      </ng-container>
        </nz-tab>
      </nz-tabset>
    </div>

    <nz-modal [(nzVisible)]="showCreateModal" nzTitle="Create" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <form [formGroup]="form" (ngSubmit)="createItem(model)">
          <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  tableData =[]
  mailListData =[]
  // create variables
  showCreateModal = false;
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
  page =1;
  limit=20;

  // End Pagination variables
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getPaginatedContacts(this.page,this.limit,"names","")
  }
  async getPaginatedContacts(page,limit,searchTerm,search,sort=""
  ){
    let api="/contacts";
     api =this.http.paginationService({
       api,page,search,searchTerm,limit
     });
     let method="get";
     let resp = await this.http.makeCall({api,method})
    console.log(resp)
  }

  // create Modal functions
  handleCancel(){}
  handleOk(){}

  createItem(data){}

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
}
