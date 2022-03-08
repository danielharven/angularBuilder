import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'events';
import qs from 'qs'
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('api') api :string =''
  @Input('items') items :string =''
  @Output ('url') url = new EventEmitter<string>()
    total=100;
    start  =1
    limit =15

  constructor(private utilities:UtilitiesService) { }

  ngOnInit(): void {
    this.indexChange(1)
    this.getTotals();
  }
  async indexChange($event: number) {
    // get the data according to the page
    let api = this.api
    let limit = this.limit;
    let start = ($event-1)*limit;
    const query = qs.stringify({
      _limit:limit,
      _start : start
    })
    let url = api+'?'+query
    this.url.emit(url)
  }
  async getTotals(){
    let api = this.api+'/count';
    let method = 'get';
    this.total = await this.utilities.httpRequest({method,api})
  }

}
