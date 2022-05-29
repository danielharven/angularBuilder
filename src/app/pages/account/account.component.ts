import { Component, OnInit } from '@angular/core'
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
      <div class="col-lg-8 col-md-12">
        <div class="card card-top ">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-9">
                {{account.name}}
              </div>
              <div class="col-sm-3">
                <div class="btn btn-outline-primary">Edit</div>
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
                    <div class="col-sm-9 h3">{{account.status}}</div>
                  </div>

                </dd>

                <dt class="col-sm-3">Name</dt>
                <dd class="col-sm-9">
                 <div class="row">
                   <div class="col-sm-9 h4"> {{account.name}}</div>
                 </div>
                </dd>

                <dt class="col-sm-3">Address</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h4">{{account.address}}</div>
                    <div class="col-sm-3"><a >edit</a></div>
                  </div>
                </dd>

                <dt class="col-sm-3">Email</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h4"> {{account.email}}</div>
                    <div class="col-sm-3"><a >edit</a></div>
                  </div>
                </dd>

                <dt class="col-sm-3">Phone</dt>
                <dd class="col-sm-9">
                  <div class="row">
                    <div class="col-sm-9 h4">{{account.phone}}</div>
                    <div class="col-sm-3"><a >edit</a></div>
                  </div>
                </dd>
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
  api = '/companies'
  constructor(private http:HttpService) {}
  ngOnInit() {
    this.getMyAccountDetails();
  }

  async getMyAccountDetails(){
    let method = 'get'
   let acc = await this.http.makeCall({method,api:this.api});
   this.account  =acc[0]
  }

}
