import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload/upload.component'
import { NzUploadModule } from 'ng-zorro-antd/upload'

@NgModule({
  declarations: [UploadComponent],
  exports: [UploadComponent],
  imports: [CommonModule, NzUploadModule],
})
export class MycomponentsModule {}
