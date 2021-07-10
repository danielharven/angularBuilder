import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-controls-button-2',
  templateUrl: './button-2.component.html',
  styleUrls: ['./button-2.component.scss'],
})
export class AppControlsButton2Component implements OnInit {
  @Input() data: any = {
    title: 'New Request',
    icon: 'fe fe-plus-circle',
    type: 'primary',
  }

  constructor() {}
  ngOnInit() {}
  click() {
    alert('downloading template')
  }
}
