import { Injectable } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Apollo, gql } from 'apollo-angular'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../store/reducers'
import { statsErrorsToString } from '@angular-devkit/build-angular/src/webpack/utils/stats'

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  provinces: any = []
  districts: any = []
  email = ''
  user = {
    email: '',
    role: '',
    username: '',
  }
  constructor(
    private nzNotify: NzNotificationService,
    private http: HttpClient,
    private store: Store<any>,
    private apollo: Apollo,
  ) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.email = state.email
      this.user.email = state.email
      this.user.role = state.role.name
      this.user.username = state.username
    })
    this.getProvinces().valueChanges.subscribe((result: any) => {
      this.provinces = result?.data?.provinces
      // this.loading = result.loading;
      // this.error = result.error;
    })
    this.getDistricts().valueChanges.subscribe((result: any) => {
      this.districts = result?.data?.districts
      // this.loading = result.loading;
      // this.error = result.error;
    })
  }

  notify = {
    success: msg => {
      this.nzNotify.success(`DNRPC`, msg)
    },
    info: msg => {
      this.nzNotify.info(`DNRPC`, msg)
    },
    error: msg => {
      this.nzNotify.error(`DNRPC`, msg)
    },
  }

  getProvinces() {
    return this.apollo.watchQuery({
      query: gql`
        {
          provinces(sort: "name") {
            id
            name
          }
        }
      `,
    })
  }
  getDistricts() {
    return this.apollo.watchQuery({
      query: gql`
        {
          districts(sort: "label") {
            id
            label
            province {
              id
            }
          }
        }
      `,
    })
  }
  getRoles() {
    return this.apollo.query({
      query: gql`
        query {
          roles {
            id
            name
          }
        }
      `,
    })
  }
  getUsers() {
    return this.apollo.query({
      query: gql`
        query {
          users {
            block
            id
            username
            role {
              id
              name
            }
            email
          }
        }
      `,
    })
  }
  getUnconfirmedNrcs() {
    return this.apollo.query({
      query: gql`
        query {
          nrcs(limit: 100, where: { confirmed: false }) {
            createdAt
            pic_id1
            pic_id2
            names
            nrc
            id
            district {
              id
            }
            dor
            dob
            gender
            village
          }
        }
      `,
    })
  }
  checkIfNrcExists(nrc) {
    return this.apollo.query({
      query: gql`
        query {
          nrcs(where: {nrc:"${nrc}"}){
           id
          }
        }
      `,
    })
  }
  getUnapprovedNrcs() {
    return this.apollo.query({
      query: gql`
        query {
          nrcs(where: { approved_ne: true, confirmed: true }, limit: 100) {
            id
            nrc
            names
            gender
            village
            confirmed
            pic_id1
            pic_id2
            dob
            dor
            district {
              id
              label
            }
          }
        }
      `,
    })
  }
  getCountUnapprovedNrcs() {
    return this.apollo.query({
      query: gql`
        query {
          nrcsConnection(where: { approved_ne: true, confirmed: true }) {
            aggregate {
              count
            }
          }
        }
      `,
    })
  }
  createNrc(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          createNrc(
            input: {
              data: {
                district:"${data.district}",
                confirmed: ${data.confirmed},
                nrc:"${data.nrc}",
                pic_id1: "${data.pic1}",
                pic_id2: "${data.pic2}"
              }
            }
          ){
            nrc{
              id
              nrc
            }
          }
        }
      `,
    })
  }
  createUser(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          createUser(
            input: {
              data: {
                username:"${data.username}",
                role:"${data.role}",
                provider: "local",
                password: "123@123",
                email: "${data.email}"
              }
            }
          ){
            user{
              id
            }
          }
        }
      `,
    })
  }
  updateNrc(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          updateNrc (
            input: {
              where: {id: "${data.id}"}
              data: {
                district:"${data.district}",
                village:"${data.village}",
                names:"${data.names}",
                gender:"${data.gender}",
                dor:"${data.dor}",
                dob:"${data.dob}",
                confirmed: true,
                nrc:"${data.nrc}"
              }
            }
          ){
            nrc{
              id
              nrc
            }
          }
        }
      `,
    })
  }
  updatePassword({ password, newPassword }) {
    return this.http.post(environment.url + '/password', {
      password,
      newPassword,
    })
  }
  updateNrcAndApprove(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          updateNrc (
            input: {
              where: {id: "${data.id}"}
              data: {
                district:"${data.district}",
                village:"${data.village}",
                names:"${data.names}",
                gender:"${data.gender}",
                dor:"${data.dor}",
                dob:"${data.dob}",
                confirmed: true,
                nrc:"${data.nrc}",
                approved:true,
              }
            }
          ){
            nrc{
              id
              nrc
            }
          }
        }
      `,
    })
  }
  approveNrc(id) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          updateNrc(
            input: {
            where:{id:"${id}"}
            data:{
              approved:true
            }
          }){
            nrc{
              id
            }
          }
        }
      `,
    })
  }
  downloadFile(id) {
    return this.http.get(environment.url + '/downloads/' + id, { responseType: 'blob' })
  }
}
