import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-stories-of-change-table-bootstrap-4',
  templateUrl: './4.component.html',
  styleUrls: ['./4.component.scss'],
})
export class AppStoriesOfChangeTablesBootstrap4Component implements OnInit {
  @Input('data') data: any = {}
  constructor() {}
  ngOnInit() {}
}
