import { Component, OnInit } from '@angular/core'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-dashboard',
  template:`
  <div>
  <div class="row">
    <div class="col-lg-4 col-md-12">
      <div class="card card-top card-top-success">
        <div class="card-header">
          <vb-headers-heading [data]="{'title':'Credit'}"></vb-headers-heading>
        </div>
        <div class="card-body position-relative overflow-hidden">
  <div class="font-size-36 font-weight-bold text-dark mb-n2">{{account.credit}}</div>
  <div class="text-uppercase">ZedSMS Credit</div>
</div>
      </div>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="card card-top card-top-secondary">
        <div class="card-header">
          <vb-headers-heading [data]="{'title':'Sent SMS'}"></vb-headers-heading>
        </div>
        <div class="card-body position-relative overflow-hidden">
  <div class="font-size-36 font-weight-bold text-dark mb-n2">{{account.sent}}</div>
  <div class="text-uppercase">SMS</div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="card card-top card-top-secondary">
        <div class="card-header">
          <vb-headers-heading [data]="{'title':'Received SMS'}"></vb-headers-heading>
        </div>
        <div class="card-body position-relative overflow-hidden">

        <div class="font-size-36 font-weight-bold text-dark mb-n2">{{account.received}}</div>

        <div class="text-uppercase">SmS</div>

      </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="card card-top card-top-danger">
        <div class="card-header">
          <vb-headers-heading [data]="{'title':'Credit Expires On'}"></vb-headers-heading>
        </div>
        <div class="card-body position-relative overflow-hidden">

        <div class="font-size-36 font-weight-bold text-dark mb-n2">{{account.endmonth | date}}</div>

        <div class="text-uppercase">SmS</div>

      </div>
      </div>
    </div>
  </div>
</div>

  `,
})
export class DashboardComponent implements OnInit {
  api='/credits';
  account:any={}
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.getCreditCounter()
  }
  async getCreditCounter(){
    let api =  this.api
    let method = 'get'
   let resp = await this.http.makeCall({api: api, method: method});
   this.account =resp[0]

  }
}
