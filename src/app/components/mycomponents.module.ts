import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload/upload.component'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzWaveModule } from 'ng-zorro-antd/core/wave'
import { ConfirmationList25Component } from '../pages/business/uploads/confirmatonlist/confirmationList.component'
import { ActiveUserTablesAntd6Component } from './active-user-tbl/6.component'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { FormsModule } from '@angular/forms'
import { NzProgressModule } from 'ng-zorro-antd/progress'

@NgModule({
  declarations: [UploadComponent, ConfirmationList25Component,ActiveUserTablesAntd6Component],
  exports: [UploadComponent, ConfirmationList25Component, ActiveUserTablesAntd6Component],
  imports: [CommonModule, NzUploadModule, NzIconModule, NzWaveModule, NzTableModule, NzDropDownModule, FormsModule, NzProgressModule],
})
export class MycomponentsModule {}
