import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent implements OnInit {
  tableData: any
  @Input('emp') emp: any = {}
  loading: boolean = false

  constructor(private utility: UtilitiesService) {}

  ngOnInit(): void {
    // console.log(this.emp)
    this.getFlags()
  }
  getFlags() {
    let api = `/employeeflags?employee=${this.emp?.id}`
    this.utility
      .sendAuthenticatedRequests({
        api,
        method: 'GET',
      })
      .subscribe(data => {
        this.tableData = data
        this.loading = false
      })
  }
}
