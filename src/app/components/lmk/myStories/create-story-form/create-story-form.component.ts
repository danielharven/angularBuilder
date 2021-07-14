import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'app-create-story-form',
  templateUrl: './create-story-form.component.html',
  styleUrls: ['./create-story-form.component.scss'],
})
export class CreateStoryFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  form = new FormGroup({})

  model = {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'categories',
      type: 'select',
      templateOptions: {
        type: 'text',
        label: 'Story Categories',
        placeholder: 'Select Story Category',
        required: true,
      },
    },
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Story Title',
        required: true,
      },
    },
    {
      key: 'interviewee',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Interviewee Names',
        placeholder: 'Enter Interviewee Names',
        required: true,
      },
    },
    {
      key: 'interviewer',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Interviewer Names',
        placeholder: 'Enter Interviewer Names',
        required: true,
      },
    },
    {
      key: 'dateofinterview',
      type: 'input',
      templateOptions: {
        type: 'date',
        label: 'Date OF Interview',
        required: true,
      },
    },
  ]

  submit(model: any): void {
    if (!this.form.valid) return
  }
}
