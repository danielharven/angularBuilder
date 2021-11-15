import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'
import store from 'store'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  institution: any = {}
  user: any = {}
  form = new FormGroup({})
  model = { email: '', institution: '' }
  fields: FormlyFieldConfig[] = [
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
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter username',
        required: true,
      },
    },
  ]
  tableUser: any = []

  constructor(private utility: UtilitiesService) {}
  ngOnInit() {
    this.user = store.get('ucross')
    this.getInstitution()
    this.getInstitutionUsers()
  }
  getInstitution() {
    let api = '/institutions/' + this.user.institution
    this.utility.sendAuthenticatedRequests({ api, method: 'GET' }).subscribe(data => {
      this.institution = data
    })
  }
  getInstitutionUsers() {
    let api = '/users/getAll'
    this.utility.sendAuthenticatedRequests({ api, method: 'GET' }).subscribe(
      data => {
        this.tableUser = data
      },
      error => {
        this.utility.notifyUser.error('failed retrieve user list')
      },
    )
  }

  submit(model: { institution: string; email: string }) {
    if (this.form.invalid) return
    model.institution = this.user?.institution
    let api = '/users/create'
    this.utility.sendAuthenticatedRequests({ api, method: 'POST', body: model }).subscribe(
      data => {
        this.utility.notifyUser.success('User created successfully.')
      },
      error => {
        console.log(error)
        this.utility.notifyUser.error('User not created.')
      },
    )
  }

  confirmBlock(data: any) {
    let api = '/users/block'
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
    let api = '/users/block'
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
