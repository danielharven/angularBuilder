import { Component, OnInit } from '@angular/core'
import store from 'store'
import { UtilitiesService } from '../../services/utilities.service'
import { payslips } from '../templates/payslip/payslip.component'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
@Component({
  selector: 'headedcard',
  templateUrl: './card-header-tabbed-6.component.html',
  styleUrls: ['./card-header-tabbed-6.component.scss'],
})
export class CardHeaderTabbedComponent implements OnInit {
  data=[];

  epayslip:payslips
  user = JSON.parse(localStorage.getItem('ucross'))||{}
  visible: boolean = false;
  payslipdownloaded: any =false;
  constructor(private utility:UtilitiesService) {

  }
  ngOnInit() {
    // this.aRoute.snapshot.params
    this.utility.getAvailbalePayslips(this.user.username).subscribe(
      (d:any)=>{
        this.data = d[0].months;
      }
    )
  }
  validateToken(token){

  }
  close(): void {
    this.visible = false;
    this.payslipdownloaded=false;
  }
  getPayslip(indexer){
    indexer = this.user.username+'-'+indexer
    this.utility.getPayslip(indexer).subscribe(
      data=>{
        //@ts-ignore
        if(data.id){
          //@ts-ignore
          this.epayslip = data
          this.payslipdownloaded = true;
          this.visible = true;
        }else{
          this.utility.notifyUser.error('Error : Try again later')
        }
        // console.log(this.epayslip)
      }
    )
  }

  //feedback module
  feedback = new FormGroup({});
  model = {  };
  fields: FormlyFieldConfig[] = [{
    key: 'info',
    type: 'textarea',
    templateOptions: {
      placeholder: 'Type feedback here....',
      required: true,
    }
  }];
  loading: any = false;
  showError: any = false
  showSuccess: any =false

  submit(model) {
    this.toggleLoading()
    model.user = JSON.parse(localStorage.getItem('ucross')).id||'0'
    if(model.user==0){
      //return
      this.toggleLoading();
      this.showError = true;
      this.showSuccess = false;
      return
    }
    if(!this.feedback.valid) {
      this.toggleLoading()
      return;
    }
    this.utility.sendFeedback(model).subscribe(
      data=>{
        // console.log(data);
        this.toggleLoading()
        this.showError=false;
        this.showSuccess = true;
      },error => {
        this.toggleLoading()
        this.showError=true;
        this.showSuccess = false;
      }
    )
  }
  toggleLoading(){
    if(this.loading) {
      this.loading = false;
      return
    }
    this.loading = true;
  }
}
