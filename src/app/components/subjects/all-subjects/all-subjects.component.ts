import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.scss']
})
export class AllSubjectsComponent implements OnInit {
total=0;
subjects:any=[]
  start  =1
  limit =20
  listNumbe
  constructor(private utility : UtilitiesService) { }

  ngOnInit(): void {
  this.getAllSubjects()
    this.countAllSubjects()
  }
  async getAllSubjects(){
  let api = '/subjects'
    let method = 'get'
    let {start,limit} = this
    this.subjects = await this.utility.httpPaginatedRequest({api,start,limit})
  }

  async countAllSubjects(){
  let api = '/subjects/count'
    let method = 'get'
    let {start,limit} = this
    this.total = await this.utility.httpPaginatedRequest({api,start,limit})
  }
  async indexChange($event: number) {
    // get the data according to the page
    let api = '/subjects'
    let limit = this.limit;
    let start = ($event-1)*limit;
    this.subjects  = await this.utility.httpPaginatedRequest({limit,start,api})
  }
}
