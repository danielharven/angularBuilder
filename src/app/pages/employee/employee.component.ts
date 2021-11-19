import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'
import { Employee } from '../../models/models.interface'

@Component({
  selector: 'app-employee',
  template: `
    <div [ngClass]="['card']">
      <div [ngClass]="['card-header']">
        <h3>Employee Table</h3>
      </div>
    </div>
    <br />
    <br />
    <div [ngClass]="['container']">
      <div [ngClass]="">
        <nz-input-group [nzSuffix]="suffixIconSearch">
          <input type="text" nz-input placeholder="input employee number" #empNo />
        </nz-input-group>
        <ng-template #suffixIconSearch>
          <i nz-icon nzType="search" (click)="handleClick(empNo.value)"></i>
        </ng-template>
      </div>
      <br />
      <br />
      <div *ngIf="data !== ''">
        <nz-card [nzActions]="[actionEdit]">
          <nz-skeleton [nzActive]="true" [nzLoading]="loading" [nzAvatar]="{ size: 'large' }">
            <nz-card-meta
              nzTitle="{{ employeeData?.empName }}"
              nzDescription="This is the description"
            ></nz-card-meta>
          </nz-skeleton>
        </nz-card>
        <ng-template #actionEdit>
          <nz-input-group [nzSuffix]="suffixIconEdit">
            <input
              type="text"
              nz-input
              [value]="employeeData?.email"
              [disabled]="!isEditing"
              #email
            />
          </nz-input-group>
          <ng-template #suffixIconEdit>
            <i nz-icon nzType="edit" (click)="handleChangeEmail(email.value, employeeData)"></i>
          </ng-template>
        </ng-template>
      </div>
    </div>
  `,
})
export class EmployeeComponent implements OnInit {
  loading: boolean
  employeeData: Employee
  employeeEmail: string = ''
  isEditing: boolean
  data: string
  constructor(private utility: UtilitiesService) {}
  ngOnInit() {
    this.data = ''
    this.isEditing = false
  }
  handleClick(empNo) {
    this.loading = true
    this.utility.getEmployee(empNo).subscribe((emp: any) => {
      if (emp !== {}) {
        this.employeeData = emp
        this.utility.notifyUser['success']('Successfully found user')
        this.data = 'emp'
      } else {
        this.utility.notifyUser['error']('No such user, check the employee number')
      }
      this.loading = false
    })
  }
  handleChangeEmail(email, employee) {
    const employeeData = {
      ...employee,
      email: email,
    }
    if (this.isEditing) {
      this.utility.updateEmployee(employeeData).subscribe(data => {
        this.utility.notifyUser['success']('Successfully editted user email')
      })
    }
    this.isEditing = !this.isEditing
  }
}
