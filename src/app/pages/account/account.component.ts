import { Component, OnInit } from '@angular/core'

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
      <div class="col-lg-8 col-md-12">
        <div class="card card-top ">
          <div class="card-body">
            <div>
              <dl class="row">
                <dt class="col-sm-3">Account Status</dt>
                <dd class="col-sm-9">
                  {{account.status}}
                </dd>

                <dt class="col-sm-3">Name</dt>
                <dd class="col-sm-9">
                  {{account.name}}
                </dd>

                <dt class="col-sm-3">Address</dt>
                <dd class="col-sm-9">{{account.address}}</dd>

                <dt class="col-sm-3 text-truncate">Email</dt>
                <dd class="col-sm-9">
                  {{account.email}}
                </dd>

                <dt class="col-sm-3">Phone</dt>
                <dd class="col-sm-9">{{account.phone}}</dd>
              </dl>
            </div>


          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12">
        <div class="card card-top card-top-primary">
          <div class="card-body">
              Upload PACRA Certificate
              <app-uploader
              hint="Upload PACRA Certificate" multiple="true" limit="5"
              ></app-uploader>
            Upload Director(s) NRC
              <app-uploader
              hint="Upload business owner or director identification" multiple="true" limit="5"
              ></app-uploader>

          </div>
        </div>
      </div>
    </div>
  </div>


  `,
})
export class AccountComponent implements OnInit {
  account={
    phone: undefined,
    address: undefined,
    name: undefined,
    status: undefined,
    email: undefined
  }
  constructor() {}
  ngOnInit() {}
}
