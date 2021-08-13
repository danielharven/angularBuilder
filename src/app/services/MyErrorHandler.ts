import { UtilitiesService } from './utilities.service'
import { ErrorHandler, Injectable } from '@angular/core'

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private util: UtilitiesService) {
  }
  handleError(res) {
    // do something with the exception
    console.log(res);
    console.log('heee')
    let {error} = res;
    if(error.message){
      let err= error.message.message;
      switch (err) {
        case "Identifier or password invalid.":{
          this.util.notifyUser.error('Password or Username is not correct')
          break;
        }
        default:{
          break;
        }
      }
    }
  }
}
