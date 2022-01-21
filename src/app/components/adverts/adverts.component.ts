import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  feedbackForm: FormGroup

  constructor(private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl(''),
      company: new FormControl(''),
      phone: new FormControl('',Validators.required),
      message: new FormControl('',Validators.required),
    })
  }

  async createFeedback(){
    this.utilities.loadScreen()
    let api = '/adverts'
    let method = 'post'
    let body ={...this.feedbackForm.value}
    let v = await this.utilities.httpRequest({api,method,body})
    .catch(e=>{
      this.utilities.notifyUser.error('Message was not sent.')
      this.utilities.stopLoadScreen()
      return
    })
    if(v){
      this.utilities.stopLoadScreen()
      this.utilities.notifyUser.success('Message has been received, thank you!')
    }

  }
}
