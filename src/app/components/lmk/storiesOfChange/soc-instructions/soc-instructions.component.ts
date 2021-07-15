import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'app-soc-instructions',
  templateUrl: './soc-instructions.component.html',
  styleUrls: ['./soc-instructions.component.scss'],
})
export class StoriesOfChangeInstructionsComponent implements OnInit {
  instructions: string[] = ["You can review stories marked with status  Pending IKMO review and accept the story if its OK or Send it back for changes.",
                      "Click the icon  to view/review the story details"]
  constructor() {}
  ngOnInit(): void {}
}
