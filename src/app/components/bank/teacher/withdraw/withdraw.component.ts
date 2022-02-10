import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  withdraws=[]
  loading = true;
  pageSize =10
  pageIndex=1
  totalWithdraws=0
  constructor(public  utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.getMyWithdraws(1,10,'createdAt','desc','')
  }
 async getMyWithdraws(pageIndex,pageSize,sortField,sortOrder,filter){
    // let x = ;
    let api = '/withdraws/'
    let method ='get'
    let start = pageIndex
    let limit= pageSize
    let x = await this.utilities.httpPaginatedRequest({api,method,start,limit})
    if(x){
      this.withdraws = x
      // console.log(x)
      this.loading=false
    }
    api = '/withdraws/count'
    let y = await this.utilities.httpRequest({api,method})
    if(y){
      this.totalWithdraws = y
      // console.log(y)
    }
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getMyWithdraws(pageIndex, pageSize, sortField, sortOrder, filter);
  }
}
