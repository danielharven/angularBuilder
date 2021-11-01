import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./style.css'],
})
export class PayslipsComponent implements OnInit {
  tableData: any = []
  tempTableData: any = []
  expandSet = new Set<number>()
  flagVisible: boolean = false
  searchtext: string = ''
  currentEmp: any = {}

  epayslip: any
  visible: any = false
  searchArray: any = []
  comments: string = ''
  flagsVisible: boolean = false
  flaggedData: any = []

  onExpandChange(id: number, checked: boolean): void {
    // this.resetData();
    if (checked) {
      this.expandSet.add(id)

      this.currentEmp = this.tableData.find(item => item.id == id)
    } else {
      this.expandSet.delete(id)
    }
  }
  constructor(private utility: UtilitiesService, private ref: ChangeDetectorRef) {}
  ngOnInit() {}
  searchPayslip() {
    this.tableData = []
    if (this.searchArray.length == 1) {
      let api = `/employees?_where[_or][0][empNo]=${this.searchArray}&_where[_or][1][nrc]=${this.searchArray}`
      this.utility.sendAuthenticatedRequests({ api, method: 'GET' }).subscribe(
        (data: any) => {
          this.tableData = data
        },
        error => {
          console.log(error)
        },
      )
    } else {
      let con = 1
      for (let searchtext of this.searchArray) {
        let api = `/employees?_where[_or][0][empNo]=${searchtext}&_where[_or][1][nrc]=${searchtext}`
        this.utility.sendAuthenticatedRequests({ api, method: 'GET' }).subscribe(
          (data: any) => {
            // console.log(data[0])
            this.tempTableData.push(data[0])
            con++
            if (con == this.searchArray.length) {
              this.ref.markForCheck()
              this.tableData = this.tempTableData
            }
          },
          error => {
            con++
            console.log(error)
          },
        )
      }
    }
  }
  showPay(data) {
    this.epayslip = data
    this.visible = true
  }
  close() {
    this.visible = false
  }

  confirmFlag(emp) {
    this.currentEmp = emp
    this.flagVisible = true
  }

  cancelFlag(emp) {}

  handleCancelFlag() {
    this.flagVisible = false
  }

  handleOkFlag() {
    let institution = JSON.parse(localStorage.getItem('ucross')).institution
    let data = {
      comments: this.comments,
      processing: true,
      employee: this.currentEmp.id,
      institution,
    }
    this.utility
      .sendAuthenticatedRequests({ api: '/employeeflags', method: 'POST', body: data })
      .subscribe(
        (data: any) => {
          console.log(data)
          this.utility.notifyUser.success('Employee flagged successfully')
        },
        error => {
          console.log(error)
        },
      )
  }

  change($event: boolean) {}

  clickMe() {
    this.flagsVisible = false
  }

  getFlags() {
    let institution = JSON.parse(localStorage.getItem('ucross')).institution
    let api = `/employeeflags?institution=${institution}&processing=true`
    this.utility
      .sendAuthenticatedRequests({
        api,
        method: 'GET',
      })
      .subscribe(data => {
        this.flaggedData = data
        console.log(data)
        // this.loading=false;
      })
  }

  unflagEmp(data: any) {
    let api = '/employeeflags/' + data.id
    this.utility.sendAuthenticatedRequests({ api, method: 'DELETE' }).subscribe(
      data => {
        // console.log(data);
        this.getFlags()
        this.utility.notifyUser.success('Flag Deleted')
      },
      err => {
        this.utility.notifyUser.error('Failed to delete flag')
        // console.log(err);
      },
    )
  }
}
