import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'app-dashboard-card-search',
  templateUrl: './portal-card-search.component.html',
  styleUrls: ['./portal-card-search.component.scss'],
})
export class PortalCardSearchComponent implements OnInit {
  model = {}
  form = new FormGroup({})
  fields: FormlyFieldConfig[] = [
    {
      key: 'query',
      type: 'input',
      templateOptions: {
        label: 'Search'
      },
    hooks: {
        onChanges: ((field: FormlyFieldConfig)=> {
              console.log("Changed")
        })
    }
    }
  ]

  constructor(private fb: FormBuilder) {}
  validateForm2: FormGroup
  submitForm2(): void {
    for (const i in this.validateForm2.controls) {
      if (this.validateForm2.controls.hasOwnProperty(i)) {
        this.validateForm2.controls[i].markAsDirty()
        this.validateForm2.controls[i].updateValueAndValidity()
      }
    }
  }
  ngOnInit() {
    this.validateForm2 = this.fb.group({
      amount: [null, [Validators.required]],
      pin: [null, [Validators.required]],
    })
  }
}
