import { Component, OnInit, Input} from '@angular/core'
import { transition, trigger, style, animate } from '@angular/animations'

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './portal-card.component.html',
  styleUrls: ['./portal-card.component.scss'],
  animations: [
    trigger('slideFadeinUp', [
      transition(':enter', [
        style({ transform: 'translate3d(100, calc(-50% + 40px), 0)' }),
        animate('1000ms ease-in-out', style({ transform: 'translate3d(0, calc(-50% + 20px), 0)' })),
      ]),
    ]),
  ],
})
export class PortalCardComponent {
  @Input() data: {
    title: string;
    description: string;
    icon: string;
    url:string
  }
  constructor() {}
  ngOnInit() {
    console.log("Ng on init works without the init")
  }
}
