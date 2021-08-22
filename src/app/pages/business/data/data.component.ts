import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-business-data',
  templateUrl: './data.component.html',
})
export class BusinessDataComponent implements OnInit {
  submitting: boolean = false
  nrcForms: FormGroup
  districts: any = []
  constructor(private utility: UtilitiesService) {}
  ngOnInit() {
    this.districts = this.utility.districts
  }

  submitForm() {}
}
