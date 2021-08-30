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
  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ]
  constructor(private utility: UtilitiesService) {}
  ngOnInit() {
    this.nrcForms = new FormGroup({
      role: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    this.utility.getRoles().subscribe(({ errors, data }) => {
      if (errors) {
        return
      }
      if (data) {
        // @ts-ignore
        let { roles } = data
        this.roles = roles
      }
    })

    this.utility.getUsers().subscribe(({ errors, data }) => {
      if (errors) {
        return
      }
      if (data) {
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
}
