import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilitiesService } from '../../services/utilities.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userForms: any
  submitting: any
  user: any = {}
  constructor(private utility: UtilitiesService, private router: Router) {}
  ngOnInit() {
    this.user = this.utility.user
    this.userForms = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })
  }

  submitForm() {
    if (!this.userForms.valid) {
      for (const i in this.userForms.controls) {
        if (this.userForms.controls.hasOwnProperty(i)) {
          this.userForms.controls[i].markAsDirty()
          this.userForms.controls[i].updateValueAndValidity()
        }
      }

      this.utility.notify.error('Kindly ensure all fields are completed')
      return
    }
    let { password, newPassword, confirmPassword } = this.userForms.value
    if (newPassword != confirmPassword) {
      this.utility.notify.error('Passwords do not match')
      return
    }
    this.utility.updatePassword({ password, newPassword }).subscribe(
      data => {
        // console.log(data);
        // @ts-ignore
        if (data?.user) {
          this.utility.notify.success('Changed Password Successfully')
          this.router.navigate(['/auth/login'])
          return
        }
      },
      error => {
        console.log(error)
        this.utility.notify.error('Password not changed')
      },
    )
  }
}
