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
    public http: HttpClient,
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
      this.auditQuery({ item: `Provinces`, action: 'Get All' }).subscribe(data => {})
      this.provinces = result?.data?.provinces
      // this.loading = result.loading;
      // this.error = result.error;
    })
    this.getDistricts().valueChanges.subscribe((result: any) => {
      this.auditQuery({ item: `Districts`, action: 'Get All' }).subscribe(data => {})
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
          districts(sort: "label", where: { country: { name_contains: "zambia" } }) {
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
  getDistrictsByCountry(id) {
    return this.apollo.query({
      query: gql`
        {
          districts(sort: "label" where:{country:"${id}"}) {
            id
            label
          }
        }
      `,
    })
  }
  getExtensionByDistrict(id) {
    return this.apollo.query({
      query: gql`
        {
          extensions(sort: "label" where:{district:"${id}"}) {
            id
            code
          }
        }
      `,
    })
  }
  getChiefByDistrict(id) {
    return this.apollo.query({
      query: gql`
        {
          chiefs(sort: "label" where:{district:"${id}"}) {
            id
            name
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
  getCountries() {
    return this.apollo.query({
      query: gql`
        query {
          countries {
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
            blocked
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
  getCountUsersActivities() {
    return this.apollo.query({
      query: gql`
        query {
          auditsConnection {
            groupBy {
              user {
                username: key
                connection {
                  aggregate {
                    count
                  }
                }
              }
            }
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
            chief
          }
        }
      `,
    })
  }
  getUnconfirmedNrcsByProvince(prov) {
    return this.apollo.query({
      query: gql`
        query {
          nrcs(limit: 100, where: { confirmed: false , district:{province:{id:"${prov}"}}}) {
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
            chief
          }
        }
      `,
    })
  }
  getUnconfirmedNrcsByDistrict(dist) {
    return this.apollo.query({
      query: gql`
        query {
          nrcs(limit: 100, where: { confirmed: false , district:{id:"${dist}"}}) {
            createdAt
            fatChief
            fatDistrict
            fatDistrict
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
            chief
            education
            race
            birthCountry
            birthDistrict
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
            chief
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
  getConfirmedAudit() {
    return this.apollo.query({
      query: gql`
        query {
          auditsConnection(where: { action: "Confirmed" }) {
            groupBy {
              user {
                key
                connection {
                  aggregate {
                    count
                  }
                }
              }
            }
          }
        }
      `,
    })
  }
  getApprovedAudit() {
    return this.apollo.query({
      query: gql`
        query {
          auditsConnection(where: { action: "Approve" }) {
            groupBy {
              user {
                key
                connection {
                  aggregate {
                    count
                  }
                }
              }
            }
          }
        }
      `,
    })
  }
  getUploadedAudit() {
    return this.apollo.query({
      query: gql`
        query {
          auditsConnection(where: { action: "Upload" }) {
            groupBy {
              user {
                key
                connection {
                  aggregate {
                    count
                  }
                }
              }
            }
          }
        }
      `,
    })
  }
  searchNrcs(data) {
    return this.apollo.query({
      query: gql`
        query{
          nrcs(
            where: { _or: [{ names_contains:"${data}" } ,  {nrc_contains: "${data}"}]
            }
          )
          {
            id
            nrc
            names
            gender
            village
            approved
            confirmed
            dob
            district{
              id
              label
            }
            dor
            chief
            pic_id1,
            pic_id2
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
                pic_id2: "${data.pic2}",
                chief: "${data.chief}"
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
  blockUser(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          updateUser(
            input: {
              where: {id:"${data}"}
              data: {
                blocked:true,
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
  resetUserPassword(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          updateUser(
            input: {
              where: {id:"${data}"}
              data: {
                password:"123@123",
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
                chief:"${data.chief}",
                names:"${data.names}",
                birthCountry:"${data.country}",
                birthDistrict:"${data.appDistrict}",
                fatChief:"${data.fatChief}",
                fatVillage:"${data.fatVillage}",
                fatDistrict:"${data.fatDistrict}",
                education:"${data.education}",
                race:"${data.race}",
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
                chief:"${data.chief}",
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
  deleteNrc(id) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          deleteNrc(input:{where:{id:"${id}"}}){
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
  auditQuery(data) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          createAudit(
            input: {
              data: {
                user:"${this.user.username}",
                item: "${data.item}",
                action:"${data.action}",
              }
            }
          ){
            audit{
              id
            }
          }
        }
      `,
    })
  }
}
