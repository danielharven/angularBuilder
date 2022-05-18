import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-customers-table',
  template: `
    <div class="table-responsive text-nowrap">
      <nz-tabset class="tabs" [nzSelectedIndex]="0">
        <nz-tab nzTitle="list" [nzForceRender]="true">
          <nz-table #basicTable [nzData]="tableData" [nzShowPagination]="false" class="table mb-4">
            <thead>
            <tr>
              <th class="bg-transparent">Names</th>
              <th class="bg-transparent">Phone</th>
              <th class="bg-transparent text-right"></th>
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
                  <i class="fe fe-plus-circle"></i>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fe fe-settings text-blue"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </nz-table>
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
  constructor() { }

  ngOnInit(): void {
  }

  // create Modal functions
  handleCancel(){}
  handleOk(){}

  createItem(data){}

}
