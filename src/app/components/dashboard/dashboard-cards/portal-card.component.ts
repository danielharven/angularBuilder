import { Component, OnInit, Input} from '@angular/core'

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './portal-card.component.html',
})
export class PortalCardComponent implements OnInit {
  @Input() data: {
    title: string;
    description: string;
    icon: string;
    url:string
  }
  constructor() {}
  ngOnInit() {}
}
