import { Component, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { EventsService } from '../../../services/events.service'
import { error } from '@ant-design/icons-angular'

@Component({
  selector: 'app-business-uploads',
  templateUrl: './uploads.component.html',
})
export class BusinessUploadsComponent implements OnInit {
  nrcForms: FormGroup
  provinces: any = [
    {
      id: 1,
      name: 'Lusaka',
    },
  ]
  allDistricts: any = [
    {
      id: 1,
      name: 'Kafue',
      province: {
        id: 1,
      },
    },
  ]
  districts: any = []
  constructor(private utitlity: UtilitiesService, private evt: EventsService) {}
  ngOnInit() {
    this.nrcForms = new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
    })
    this.setupEvents()
  }
  setupEvents() {
    this.evt.onUploadCompleted.subscribe(
      data => {},
      error => {},
    )
  }
  submitForm() {
    if (!this.nrcForms.valid) {
      for (const i in this.nrcForms.controls) {
        if (this.nrcForms.controls.hasOwnProperty(i)) {
          this.nrcForms.controls[i].markAsDirty()
          this.nrcForms.controls[i].updateValueAndValidity()
        }
      }
      return
    }
    this.evt.onPostProduct.emit({ status: true })
  }

  getDistricts() {
    console.log(this.nrcForms.controls.provinces)
  }
}
