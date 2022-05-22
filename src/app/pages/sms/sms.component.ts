import { Component, OnInit } from '@angular/core'
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

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
        <div class="col-lg-9 col-md-12 d-flex ">
          <nz-tabset>
            <nz-tab nzTitle="Delivered SMS">
          <div class="card card-top card-top-primary">
            <div class="card-header">
              <vb-headers-heading [data]="{'title':'Delivered SMS'}"></vb-headers-heading>
            </div>
            <div class="card-body">

                  <div>
                  <div class="text-nowrap text-dark font-size-50 font-weight-bold">
                    101 / 10000 <sup class="text-uppercase text-gray-6 font-size-30">SENT</sup>
                  </div>
                  <div class="table-responsive text-nowrap">
                    <nz-table #basicTable [nzData]="sentMailData" [nzShowPagination]="true" class="table mb-4">
                      <thead>
                      <tr>
                        <th class="bg-transparent width-50">Date</th>
                        <th class="bg-transparent">Customer</th>
                        <th class="bg-transparent">Number</th>
                        <th class="bg-transparent text-right"></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr *ngFor="let data of basicTable.data">
                        <td>
                          <div class="vb__utils__avatar">
                            <img [src]="data.avatar" alt="User" />
                          </div>
                        </td>
                        <td>
                          <div>{{data.userName.name}}</div>
                          <div class="text-gray-4">{{data.userName.position}}</div>
                        </td>
                        <td>
                          <a href="javascript: void(0);" class="text-blue">
                            {{data.location}}
                          </a>
                        </td>
                        <td class="text-right">
                          <div class="text-nowrap">
                            <button type="button" class="btn btn-light">
                              <span class="text-blue">Add</span>
                            </button>
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

                  <form [formGroup]="smsCreateForm" (ngSubmit)="createSMS(smsCreatemodel)">
                    <formly-form [form]="smsCreateForm" [fields]="smsCreatefields" [model]="smsCreatemodel"></formly-form>
                    <button type="submit" class="btn btn-default">Submit</button>
                  </form>

                <nz-form-item></nz-form-item>
              </ng-container>
            </nz-tab>
            <nz-tab nzTitle="Send To Mailing List">
              <ng-container nz-tab>
                  <form [formGroup]="smsMailingCreateForm" (ngSubmit)="createSMS(smsMailingCreatemodel)">
                    <formly-form [form]="smsMailingCreateForm" [fields]="smsMailingCreatefields" [model]="smsCreatemodel"></formly-form>
                    <button type="submit" class="btn btn-default">Submit</button>
                  </form>

                <nz-form-item></nz-form-item>
              </ng-container>
            </nz-tab>
            <nz-tab nzTitle="Received SMS">
              <ng-container nz-tab>
                <ng-template [ngTemplateOutlet]="commentTemplateRef" [ngTemplateOutletContext]="{ comment: receivedSms }"></ng-template>
              </ng-container>
            </nz-tab>
            <nz-tab nzTitle="Spam SMS">
              <ng-container nz-tab>
                <ng-template [ngTemplateOutlet]="commentTemplateRef" [ngTemplateOutletContext]="{ comment: receivedSms }"></ng-template>
              </ng-container>
            </nz-tab>
          </nz-tabset>
        </div>
      </div>
    </div>

    <ng-template #commentTemplateRef let-comment="comment">
      <nz-comment [nzAuthor]="comment.author">
        <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="comment.avatar"></nz-avatar>
        <nz-comment-content>
          <p>{{ comment.content }}</p>
        </nz-comment-content>
        <nz-comment-action>
        <i
          nz-tooltip
          nzTitle="delete"
          nz-icon
          nzType="trash"
          [nzTheme]="'outline'"
          (click)="deleteSms(comment)"
        ></i>
          <span class="count like">Delete</span>
        </nz-comment-action>
        <ng-container *ngIf="comment.children && comment.children.length">
          <ng-template ngFor let-child [ngForOf]="comment.children">
          </ng-template>
        </ng-container>

        <nz-comment-content>
          <nz-form-item>
            <textarea [(ngModel)]="replyInputValue" nz-input rows="4"></textarea>
          </nz-form-item>
          <nz-form-item>
            <button nz-button nzType="primary" [nzLoading]="submitting" [disabled]="!replyInputValue" (click)="handleSubmit(comment)">
              Send Response
            </button>
          </nz-form-item>
        </nz-comment-content>
      </nz-comment>
    </ng-template>
  `,
})
export class SmsComponent implements OnInit {
  sentMailData =[]
  constructor() {}
  ngOnInit() {}

  //Send SMS
  smsCreateForm : FormGroup =new FormGroup({});
  smsCreatemodel = { email: '',name:"",phone:"" };
  smsCreatefields: FormlyFieldConfig[] = [
    {
      key: 'contacts',
      type: 'select',
      templateOptions: {
        label: 'Contacts',
        placeholder: 'Select Customer(s)',
        required: true,
        multiple:true
      }
    },
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
  //End Send SMS
  createSMS(model: any) {

  }


  //Send SMS Mailing List
  smsMailingCreateForm : FormGroup =new FormGroup({});
  smsMailingCreatemodel = { email: '',name:"",phone:"" };
  smsMailingCreatefields: FormlyFieldConfig[] = [
    {
      key: 'mailList',
      type: 'select',
      templateOptions: {
        label: 'Mailing List',
        placeholder: 'Select Mailing List',
        required: true,
        multiple:false
      }
    },
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
  //End Send SMS
  createSMSMailing(model: any) {

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
}
