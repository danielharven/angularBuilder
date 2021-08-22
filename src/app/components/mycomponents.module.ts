import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload/upload.component'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzWaveModule } from 'ng-zorro-antd/core/wave'
import { ConfirmationList25Component } from '../pages/business/uploads/confirmatonlist/confirmationList.component'

@NgModule({
  declarations: [UploadComponent, ConfirmationList25Component],
  exports: [UploadComponent, ConfirmationList25Component],
  imports: [CommonModule, NzUploadModule, NzIconModule, NzWaveModule],
})
export class MycomponentsModule {}
