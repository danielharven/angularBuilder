import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'

export interface payslips {
  empDetails: {
    empNo: string
    empName: string
    manNo: string
    empGroup: string
    scale: string
    bankName: string
    bankBranch: string
    bankKey: string
    district: string
    position: string
    ministry: string
    orgUnit: string
    costCenter: string
    costCenterName: string
    leaveAccrued: [string]
    leaveTaken: [string]
    pensionToDate: [string]
    paymentMonth: string
    taxableIncome: string
    presentAppointmentDate: string
    appraisalDate: string
    nxtAppraisalDate: string
    extra1: string
    extra2: string
    extra3: string
    extra4: string
    extra5: string
  }
  indexer: string
  empTransactions: [
    {
      empNo: string
      id: string
      wageCode: string
      wageDescr: string
      period: string
      paymentAmount: string
      deductionAmount: string
      accumulation: string
      extra2: string
      extra3: string
    },
  ]
}

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss'],
})
export class PayslipComponent implements OnInit {
  @Input('payslip') payslip: payslips
  transactionsSettings = {
    top_dif: 18,
    top_start: 341.46,
    wage_code_left: 77.33,
    wage_desc_left: 135.36,
    period_left: 266.11,
    left_char_dif: 5.97,
    payment_left_limit: 391.8,
    deduc_left_limit: 469.07,
    accum_left_limit: 565,
    space: 5.97,
  }
  transactions = []
  details = {
    paymentMonth: '',
    taxableIncome: undefined,
    pensionToDate: undefined,
    leaveTaken: undefined,
    orgUnit: undefined,
    leaveAccrued: undefined,
    costCenterName: undefined,
    costCenter: undefined,
    bankKey: undefined,
    bankBranch: undefined,
    ministry: undefined,
    district: undefined,
    position: undefined,
    bankName: undefined,
    empName: undefined,
    scale: undefined,
    nrc: undefined,
    empNo: undefined,
    empGroup: undefined,
    presentAppointmentDate: undefined,
    nxtAppraisalDate: undefined,
    manNo: undefined,
  }
  netPay = 0
  netDeduc = 0
  net = 0
  pageNum: number = 0
  totalPageHeight: number = 792
  loadPayslip: any = false
  footer: any
  constructor(private utility: UtilitiesService) {}

  ngOnInit(): void {
    this.transactions = this.payslip.empTransactions
    //@ts-ignore
    this.details = this.payslip.empDetails
    // console.log(parseFloat(this.transactions[7].deductionAmount))
    this.pageNum = parseInt(this.transactions.length / 18 + '')
    // console.log(this.pageNum)
    let totalPageHeight = this.totalPageHeight * this.pageNum
    if (totalPageHeight > this.totalPageHeight) this.totalPageHeight = totalPageHeight
    //
    this.transactions.forEach(ele => {
      let dedu = parseFloat(ele.deductionAmount) || 0
      let paym = parseFloat(ele.paymentAmount) || 0
      this.netDeduc += dedu
      this.netPay += paym
      this.net = this.netPay + this.netDeduc
    })
    this.loadPayslip = true
  }

  calculateSpaceDeduction(t: any) {
    //find out if there is a dot
    let tt = t.deductionAmount?.toString()
    if (!tt.includes('.')) {
      return (tt.length + 3) * this.transactionsSettings.space
    }

    return tt.length * this.transactionsSettings.space
  }
}
