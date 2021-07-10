import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/@vb/widgets/widgets-components.module'
import { FooterComponent } from './Footer/footer.component'
import { AppTypography3Component } from './lmk/interviewguide/instructions-3/3.component'
import { AppControlsButton2Component } from './lmk/interviewguide/Button2-download/button-2.component'
import { AppTable2Component } from './lmk/interviewguide/tables-interview/2.component'
import { AppMyStoryTableComponent } from './lmk/myStories/stories-table/3.component'
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd'
import { FormlyModule } from '@ngx-formly/core'

const COMPONENTS = [
  FooterComponent,
  AppMyStoryTableComponent,
  AppTable2Component,
  AppTypography3Component,
  AppControlsButton2Component,
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    WidgetsComponentsModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class MyComponentsModule {}
