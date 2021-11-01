import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-viewpayslips',
  templateUrl: './viewpayslips.component.html',
  styleUrls: ['./viewpayslips.component.scss'],
})
export class ViewpayslipsComponent implements OnInit {
  @Input('emp') emp: any = {}
  @Output() payslip = new EventEmitter<any>()
  currentEmp: any = {}
  retrievingAvailablePayslips: boolean = true
  showPayslip: any
  availablePayslips: any = []
  epayslip: any
  currentPayments: any = []
  currentDeductions: any = []
  constructor(private utility: UtilitiesService) {}

  ngOnInit(): void {
    this.retrieveAvailablePayslips(this.emp)
  }
  getPayslip(indexer) {
    indexer = this.emp.empNo + '-' + indexer
    let data = {
      api: '/business/payslip/' + indexer,
      method: 'GET',
    }
    this.utility.sendAuthenticatedRequests(data).subscribe((data: any) => {
      this.epayslip = data
      this.currentPayments = data?.empTransactions.filter(item => parseInt(item.id) < 20)
      this.currentDeductions = data?.empTransactions.filter(item => parseInt(item.id) > 19)
      this.showPayslip = true
    })
  }
  retrieveAvailablePayslips(payslip) {
    this.retrievingAvailablePayslips = true
    this.utility.getAvailbalePayslips(payslip.empNo).subscribe((d: any) => {
      this.retrievingAvailablePayslips = false
      this.availablePayslips = d[0].months
    })
  }
  showPay() {
    this.payslip.emit(this.epayslip)
  }
}
