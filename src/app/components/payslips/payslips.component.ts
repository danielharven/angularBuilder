import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.scss'],
})
export class PayslipsComponent implements OnInit {
  constructor(private utility: UtilitiesService) {}

  ngOnInit(): void {}

  startGeneratingPayslips() {
    let api = '/pmec/clean'
    let method = 'GET'
    this.utility.sendAuthenticatedRequests({ api, method }).subscribe(
      data => {
        this.utility.notifyUser.success('Process has begun.')
      },
      error => {
        this.utility.notifyUser.error('An error occurred')
      },
    )
  }
}
