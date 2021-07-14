import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-my-stories-table-bootstrap-4',
  templateUrl: './4.component.html',
  styleUrls: ['./4.component.scss'],
})
export class AppMyStoriesTablesBootstrap4Component implements OnInit {
  @Input('data') data: any = {}
  constructor() {}
  ngOnInit() {}
}
