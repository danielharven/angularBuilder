import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-widgets-tables-2',
  templateUrl: './2.component.html',
  styleUrls: ['./2.component.scss'],
})
export class AppTable2Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
