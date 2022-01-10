import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './user.component.html',
})
export class DashboardUserComponent implements OnInit {
  tabs = [
    {
      name: 'Payslips',
      component: `payslips`,
      icon: '',
    },
    {
      name: 'Queries',
      icon: '',
      component: `queries`,
    },
    {
      name: 'Users',
      icon: '',
      component: `user`,
    },
  ]
  constructor() {}
  ngOnInit() {}

  onBack() {}
}
