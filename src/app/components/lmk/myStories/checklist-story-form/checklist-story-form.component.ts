import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'app-checklist-story-form',
  templateUrl: './checklist-story-form.component.html',
  styleUrls: ['./checklist-story-form.component.scss'],
})
export class ChecklistStoryFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  form = new FormGroup({})

  model = {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'details',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'Interview details(i.e. Story category,Title,Interviewer names etc)',
        placeholder: 'Select Story Category',
        required: true,
      },
    },
    {
      key: 'introduction',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'The introduction',
        placeholder: 'Select Story Category',
        required: true,
      },
    },
    {
      key: 'challenge',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'The challenge (what problem was being addressed)',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'action',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'The action (what was done, how, by and with who etc) ',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'result',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'The result (what changed – what difference was made)',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'conclusion',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'The conclusions ',
        placeholder: '',
        required: true,
      },
    },
    {
      key: 'sequel',
      type: 'custom-text-area',
      templateOptions: {
        type: 'text',
        label: 'The sequel (what next) ',
        placeholder: '',
        required: true,
      },
    },
  ]

  submit(model: any): void {
    if (!this.form.valid) return
  }
}
