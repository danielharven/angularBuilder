import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'
import { FooterComponent } from './Footer/footer.component'

import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd'
import { FormlyModule } from '@ngx-formly/core'
import { FieldNgSelect } from './formly/quill/ng-select'
import { FieldQuillType } from './formly/quill/quil-type'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { QuillModule } from 'ngx-quill'
import { FileValueAccessor } from './formly/file-accessor'
import { FormlyFieldFile } from './formly/file-component'
import { NgSelectModule } from '@ng-select/ng-select'
import { HttpClientModule } from '@angular/common/http'
import { DashboardDownloadListComponent } from './dashboard/dashboard-download-list/dashboard-download-list.component'
import { DashboardTasksTableComponent } from './dashboard/dashboard-tasks-table/dashboard-tasks-table.component'
import { DashboardHeadComponent } from './dashboard/dashboard-head/dashboard-head.component'
import { DashboardHeadItemComponent } from './dashboard/dashboard-head-item/dashboard-head-item.component'

const COMPONENTS = [
  FooterComponent,
  FieldNgSelect,
  FieldQuillType,
  FormlyFieldFile,
  FileValueAccessor,
  DashboardDownloadListComponent,
  DashboardTasksTableComponent,
  DashboardHeadComponent,
  DashboardHeadItemComponent,
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    QuillModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    WidgetsComponentsModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
    FormlySelectModule,
    NgSelectModule,
  ],
  declarations: [...COMPONENTS, DashboardHeadComponent],
  exports: [...COMPONENTS, DashboardHeadComponent],
})
export class MyComponentsModule {}
