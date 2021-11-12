import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { environment } from '../../environments/environment'
import { NzNotificationService } from 'ng-zorro-antd/notification'
@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private http: HttpClient, private notify: NzNotificationService) {}
  notifyUser = {
    error: msg => {
      this.notify.error('SelfService', msg)
    },
    success: msg => {
      this.notify.success('SelfService', msg)
    },
  }
  getAvailbalePayslips(empNo) {
    let data = {
      api: '/available-payslips?empNo=' + empNo,
      method: 'GET',
    }
    return this.sendAuthenticatedRequests(data)
  }
  getEmployee(empNo) {
    let data = {
      api: '/employees?empNo=' + empNo,
      method: 'GET',
    }
    return this.sendAuthenticatedRequests(data)
  }
  getEmployees() {
    let data = {
      api: '/employees',
      method: 'GET',
    }
    return this.sendAuthenticatedRequests(data)
  }
  updateEmployee(employee) {
    console.log('I am in the update employee')
    const data = {
      api: '/employees/' + employee.id,
      method: 'PUT',
      body: employee,
    }
    return this.sendAuthenticatedRequests(data)
  }

  getPayslip(indexer) {
    let data = {
      api: '/mypayslips/' + indexer,
      method: 'GET',
    }
    return this.sendAuthenticatedRequests(data)
  }
  sendFeedback(data) {
    let d = {
      api: '/feedbacks',
      method: 'POST',
      body: data,
    }
    return this.sendAuthenticatedRequests(d)
  }

  // events area
  accountFound = new EventEmitter<{ status: boolean }>()
  //end events area

  sendAuthenticatedRequests({ api, method, body = {} }) {
    const accessToken = store.get('accessToken')
    switch (method) {
      case 'POST': {
        return this.http.post(environment.url + api, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        break
      }
      case 'PUT': {
        console.log('Entering the PUT')
        const res = this.http.put(environment.url + api, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(res)
        return res
        break
      }
      case 'DELETE': {
        return this.http.delete(environment.url + api, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        break
      }
      case 'GET': {
        return this.http.get(environment.url + api, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      }
    }
  }
  sendUnAuthenticatedRequests({ api, method, body }) {
    const accessToken = store.get('accessToken')
    switch (method) {
      case 'POST': {
        return this.http.post(api, body)
        break
      }
      case 'GET': {
        return this.http.get(api)
      }
    }
  }
}
