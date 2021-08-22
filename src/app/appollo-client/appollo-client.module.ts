import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { environment } from '../../environments/environment'
// Apollo
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { ApolloLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
// import { ApolloLink } from 'apollo-link';
// import { setContext } from 'apollo-link-context';
const uri = environment.url + '/graphql'

@NgModule({
  declarations: [],
  exports: [HttpClientModule],
  imports: [CommonModule],
})
export class AppolloClientModule {
  basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }))

  // Get the authentication token from local storage if it exists
  token = JSON.parse(localStorage.getItem('accessToken')) || ''
  auth = setContext((operation, context) => ({
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }))

  constructor(apollo: Apollo, httpLink: HttpLink) {
    let link = ApolloLink.from([this.basic, this.auth, httpLink.create({ uri })])
    let cache = new InMemoryCache()
    // create Apollo
    if (this.token != '') {
      apollo.create({
        link,
        cache,
      })
    } else {
      apollo.create({
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),
      })
    }
  }
}
