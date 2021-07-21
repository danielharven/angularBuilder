import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'vb-system-register-page',
  templateUrl: './register.component.html',
})
export class RegisterPage {

  constructor(private acR : ActivatedRoute) {
  }
  ngOnInit(){
    this.acR.queryParams.subscribe(
      data=>{
        console.log(data)
      }
    )
  }
}
