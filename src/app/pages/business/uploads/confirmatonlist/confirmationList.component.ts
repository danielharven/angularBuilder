import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { EventsService } from '../../../../services/events.service'

@Component({
  selector: 'upload-confirmation-lists-25',
  templateUrl: './confirmationList.component.html',
})
export class ConfirmationList25Component {
  @Input('data') data = {
    province: '',
    startNrc: '',
    district: '',
    endNrc: '',
  }
  constructor(private evt: EventsService) {
    this.setupListerners()
  }


  setupListerners() {
    this.evt.onConfrimData.subscribe(({ status, data }) => {
      if (!status) this.data = data
    })
    this.evt.onResetForm.subscribe(_ => {
      // @ts-ignore
      this.data = {}
    })
  }

  process() {
    this.evt
      .onConfrimData
      .emit({ status: true, data: this.data })
  }
}
