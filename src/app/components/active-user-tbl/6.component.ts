import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'

interface DataItem {
  name: string
  age: number
  address: string
}

@Component({
  selector: 'active-user-tables-antd-6',
  templateUrl: './activeUser.component.html',
  styleUrls: ['./6.component.scss'],
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
    `,
  ],
})
export class ActiveUserTablesAntd6Component implements OnInit {
  searchValue = ''
  visible = false
  listOfData: any[] = []
  listOfDisplayData = []
  constructor(private utility: UtilitiesService) {
  }
  ngOnInit() {
    this.utility.getCountUsersActivities().subscribe(
      ({data,errors})=>{
        if(errors){
          this.utility
            .auditQuery({item:`Users`,action:'Failed -Get User Stats'}).subscribe(
            data=>{}
          )
          return
        }
        if(data){
          this.utility
            .auditQuery({item:`Users`,action:'Get User Stats'}).subscribe(
            data=>{}
          )
          // @ts-ignore
          let myData = data.auditsConnection?.groupBy?.user;

          for(let x of myData){
            this.listOfData.push(
              {
                username:x.username,
                count:x.connection.aggregate.count
              }
            )
          }
          this.listOfDisplayData = this.listOfData.sort((a,b)=>b-a)

        }
      }
    )
  }

  reset(): void {
    this.searchValue = ''
    this.search()
  }

  search(): void {
    this.visible = false
    this.listOfDisplayData = this.listOfData.filter(
      (item) => item.username.indexOf(this.searchValue) !== -1,
    )
  }
  sort(a,b){
    return a.count-b.count
  }


}
