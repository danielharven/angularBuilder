import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-admin-audit',
  templateUrl: './audit.component.html',
})
export class AdminAuditComponent implements OnInit {
  confirmedTrail=[]
  approvedTrail=[]
  uploadedTrail=[]
  constructor(private utility:UtilitiesService) {}
  ngOnInit() {
    this.getConfirmed();
    this.getApproved();
    this.getUploaded()
  }
  getConfirmed(){
    this.utility.getConfirmedAudit()
      .subscribe(({ data, errors }) => {
        if(errors){
          return
        }
        if(data){
          // @ts-ignore
          this.confirmedTrail=data?.auditsConnection?.groupBy?.user
        }
      })
  }
  getApproved(){
    this.utility.getApprovedAudit()
      .subscribe(({ data, errors }) => {
        if(errors){
          return
        }
        if(data){
          // @ts-ignore
          this.approvedTrail=data?.auditsConnection?.groupBy?.user
        }
      })
  }
  getUploaded(){
    this.utility.getUploadedAudit()
      .subscribe(({ data, errors }) => {
        if(errors){
          return
        }
        if(data){
          // @ts-ignore
          this.uploadedTrail=data?.auditsConnection?.groupBy?.user
        }
      })
  }
}
