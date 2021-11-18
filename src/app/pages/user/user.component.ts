import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'
import store from 'store'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

interface Institution {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  published_at: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  isVisible = false
  institution: any[]
  user: any = {}
  form = new FormGroup({})
  model = {
    email: '',
    institution: '',
    role: '',
    username: '',
    provider: 'local',
    password: 'Lusaka@123',
    confirmed: true,
  }
  fields: FormlyFieldConfig[]
  fieldsArr: any[]
  tableUser: any = []

  constructor(private utility: UtilitiesService) {
    this.fieldsArr = [
      {
        key: 'username',
        type: 'input',
        templateOptions: {
          label: 'User Name',
          placeholder: 'Enter user name',
          required: true,
        },
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
        },
      },
      {
        key: 'institution',
        type: 'select',
        templateOptions: {
          label: 'Institution',
          placeholder: 'Select Institution',
          options: [],
          required: true,
        },
      },
      {
        key: 'role',
        type: 'select',
        templateOptions: {
          label: 'Role',
          placeholder: 'Select Role',
          options: [
            { label: 'Administrator', value: 'administrator' },
            { label: 'IT officer', value: 'IT officer' },
            { label: 'HRA', value: 'HRA' },
            { label: 'Authenticated', value: 'Authenticated' },
          ],
          required: true,
        },
      },
    ]
  }
  ngOnInit() {
    this.user = store.get('ucross')
    this.getRoles()
    this.getInstitution()
    this.getInstitutionUsers()
  }

  showModal(): void {
    this.isVisible = true
  }

  handleOk(): void {
    console.log('Button ok clicked!')
    this.isVisible = false
  }

  handleCancel(): void {
    console.log('Button cancel clicked!')
    this.isVisible = false
  }

  async getRoles() {
    let api = '/institutions'

    await this.utility
      .sendAuthenticatedRequests({ api, method: 'GET' })
      .subscribe((data: any[]) => {
        this.institution = data.map(item => {
          console.log({ label: item.name, value: item._id })
          return <any>{ label: item.name, value: item._id }
        })
      })

    console.log('list institutions from roles function')
    console.log(this.institution)
  }
  getInstitution() {
    let api = '/institutions'
    let institutions: any[]
    this.utility.sendAuthenticatedRequests({ api, method: 'GET' }).subscribe((data: any[]) => {
      institutions = data.map(item => {
        return <any>{ label: item.name, value: item._id }
      })
      this.fieldsArr[2].templateOptions.options = institutions
      this.fields = this.fieldsArr
    })

    // return of(institutions)
  }
  getInstitutionUsers() {
    let api = '/business/users/getAll'
    this.utility.sendAuthenticatedRequests({ api, method: 'GET' }).subscribe(
      data => {
        this.tableUser = data
      },
      error => {
        this.utility.notifyUser.error('failed retrieve user list')
      },
    )
  }

  submit(model: { username: string; email: string; institution: string; role: string }) {
    if (this.form.invalid) return

    let api = '/auth/local/register'

    this.utility
      .sendUnAuthenticatedRequests({ api, method: 'POST', body: model })
      .subscribe(data => alert)
  }

  confirmBlock(data: any) {
    let api = '/business/users/block'
    let body = {
      id: data.id,
      blocked: true,
    }
    this.utility.sendAuthenticatedRequests({ api, method: 'POST', body }).subscribe(
      data => {
        this.getInstitutionUsers()
        this.utility.notifyUser.success('Success : Block User')
      },
      error => {
        this.utility.notifyUser.error('Failed : Block User')
      },
    )
  }

  confirmUnBlock(data: any) {
    let api = '/business/users/block'
    let body = {
      id: data.id,
      blocked: false,
    }
    this.utility.sendAuthenticatedRequests({ api, method: 'POST', body }).subscribe(
      data => {
        this.getInstitutionUsers()
        this.utility.notifyUser.success('Success : unblock User')
      },
      error => {
        this.utility.notifyUser.error('Failed : unblock User')
      },
    )
  }

  cancelBlock(data: any) {}
}
