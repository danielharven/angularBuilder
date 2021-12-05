import { UtilitiesService } from './utilities.service'
import { ErrorHandler, Injectable } from '@angular/core'

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private util: UtilitiesService) {
  }
  handleError(res) {
    // do something with the exception
    console.log(res);
    // handle graphQL errors
    try {
      let {errors} = res;
        let { message }= errors[0];
        switch (message) {
          case "Identifier or password invalid.":{
            this.util.notifyUser.error('Password or Username is not correct')
            break;
          }
          case "Forbidden":{
            this.util.notifyUser.error('You have no access to this service')
            break;
          }
          default:{
            break;
          }
        }

    }catch (e) {

    }

  }
}
