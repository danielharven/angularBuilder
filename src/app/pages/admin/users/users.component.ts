import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
})
export class AdminUsersComponent implements OnInit {
  nrcForms: FormGroup
  roles: any = []
  submitting: boolean = false

  expandSet = new Set<number>()
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id)
    } else {
      this.expandSet.delete(id)
    }
  }
  listOfData = [ ]
  constructor(private utility: UtilitiesService) {}
  ngOnInit() {
    this.nrcForms = new FormGroup({
      role: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    this.utility.getRoles().subscribe(({ errors, data }) => {
      if (errors) {
        this.utility.auditQuery({item:"Roles",action:'Failed - Get All'}).subscribe(
          data=>{}
        )
        return
      }
      if (data) {
        this.utility.auditQuery({item:"Roles",action:'Get All'}).subscribe(
          data=>{}
        )
        // @ts-ignore
        let { roles } = data
        this.roles = roles
      }
    })

    this.utility.getUsers()
      .subscribe(({ errors, data }) => {
      if (errors) {
        this.utility.auditQuery({item:"users",action:'Failed - Get All'}).subscribe(
          data=>{}
        )
        return
      }
      if (data) {
        this.utility.auditQuery({item:"users",action:'Get All'}).subscribe(
          data=>{}
        )
        // @ts-ignore
        let { users } = data
        this.listOfData = users

      }
    })
  }

  submitForm() {
    if (!this.nrcForms.valid) {
      for (const i in this.nrcForms.controls) {
        if (this.nrcForms.controls.hasOwnProperty(i)) {
          this.nrcForms.controls[i].markAsDirty()
          this.nrcForms.controls[i].updateValueAndValidity()
        }
      }
      this.utility.notify.error('Kindly ensure all fields are completed')
      return
    }
    let { role, username, email } = this.nrcForms.value
    this.utility.createUser({ role, username, email }).subscribe(({ errors, data }) => {
      if (errors) {
        this.utility.notify.error('user creation failed')
        return
      }
      if (data) {
        this.utility.notify.success('user creation success')
        this.nrcForms.reset()
      }
    })
  }
  blockUser(id){
    this.utility.blockUser(id).subscribe(
      ({data,errors})=>{
        if(errors){
          this.utility.auditQuery({item:`User - ${id}`,action:'Failed Blocked User'}).subscribe(
            (data:any)=>{}
          )
          this.utility.notify.error('Failed User Blocked')
          return
        }
        if(data){
          this.utility.auditQuery({item:`User - ${id}`,action:'Blocked User'}).subscribe(
            (data:any)=>{}
          )
          this.utility.notify.success('User Blocked')
        }
      }
    )
  }
  resetPassword(id){
    this.utility.resetUserPassword(id).subscribe(
      ({data,errors})=>{
        if(errors){
          this.utility.auditQuery({item:`User - ${id}`,action:'Failed Password Reset For User'}).subscribe(
            (data:any)=>{}
          )
          this.utility.notify.error('Failed Password Reset For User')
          return
        }
        if(data){
          this.utility.auditQuery({item:`User - ${id}`,action:'Password Reset For User'}).subscribe(
            (data:any)=>{}
          )
          this.utility.notify.success('Password Reset For User')
        }
      }
    )
  }
}
