import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-employee',
  template: `
    <div>
      <h1>Employee</h1>
      <br />
      <h3 class="title">Employee Search</h3>
      <hr />
      <div>
        <button (click)="handleClick(empNo.value)">Search</button>
      </div>
      <input type="text" value="349433" #empNo />
      <div>
        <br />
        <h3 class="title">Employee Details</h3>
        <hr />
        <div>
          <ul *ngFor="let employee of data | async">
            <li>Name: {{ employee.empName }}</li>
            <li>Employee No: {{ employee.empNo }}</li>
            <li>
              <div>
                <button (click)="handleChangePhone(phone.value, employee)">
                  Change Email Addr.
                </button>
                <input type="text" value="{{ employee.email }}" #phone />
                <!--            <input type='text' value='{{ employee.empName }}' >-->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class EmployeeComponent implements OnInit {
  loading: boolean
  data: any
  employeeEmail: string = ''
  constructor(private utility: UtilitiesService) {}
  ngOnInit() {}
  handleClick(empNo) {
    this.data = this.utility.getEmployee(empNo)
    // this.data  = this.utility.getEmployees()
  }
  handleChangePhone(email, employee) {
    console.log('Printing employee')
    const employeeData = {
      ...employee,
      email: email,
    }
    console.log(employeeData)
    this.utility.updateEmployee(employeeData).subscribe(data => alert)
  }
}
